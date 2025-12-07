<template>
  <APlayer
    v-if="playList[0]"
    ref="player"
    :key="playerKey"
    :audio="playList"
    :autoplay="store.playerAutoplay"
    :theme="theme"
    :autoSwitch="false"
    :loop="store.playerLoop"
    :order="store.playerOrder"
    :volume="volume"
    :showLrc="true"
    :listFolded="listFolded"
    :listMaxHeight="listMaxHeight"
    :noticeSwitch="false"
    @play="onPlay"
    @pause="onPause"
    @timeupdate="onTimeUp"
    @error="loadMusicError"
  />
</template>

<script setup>
import { MusicOne, PlayWrong } from "@icon-park/vue-next";
import { getPlayerList } from "@/api";
import { mainStore } from "@/store";
import APlayer from "@worstone/vue-aplayer";
import { ElMessageBox } from "element-plus";

const store = mainStore();

// 获取播放器 DOM
const player = ref(null);

// 歌曲播放列表
const playList = ref([]);

// 歌曲播放项
const playIndex = ref(0);

// 播放进度
const audioDuration = ref(0);
const audioCurrent = ref(0);

// 用于强制重建播放器以应用播放顺序/循环变更
const playerKey = computed(() => `${store.playerLoop}-${store.playerOrder}`);

// 配置项
const props = defineProps({
  // 主题色
  theme: {
    type: String,
    default: "#efefef",
  },
  // 默认音量
  volume: {
    type: Number,
    default: 0.7,
    validator: (value) => {
      return value >= 0 && value <= 1;
    },
  },
  // 歌曲服务器 ( netease-网易云, tencent-qq音乐 )
  songServer: {
    type: String,
    default: "netease", //'netease' | 'tencent'
  },
  // 播放类型 ( song-歌曲, playlist-播放列表, album-专辑, search-搜索, artist-艺术家 )
  songType: {
    type: String,
    default: "playlist",
  },
  // id
  songId: {
    type: String,
    default: "7452421335",
  },
  // 列表是否默认折叠
  listFolded: {
    type: Boolean,
    default: false,
  },
  // 列表最大高度
  listMaxHeight: {
    type: Number,
    default: 420,
  },
});

const listHeight = computed(() => {
  return props.listMaxHeight + "px";
});

// 初始化播放器
onMounted(() => {
  nextTick(() => {
    try {
      getPlayerList(props.songServer, props.songType, props.songId).then((res) => {
        console.log('[Player] 播放列表加载完成', res);
        // 更改播放器加载状态
        store.musicIsOk = true;
        // 生成歌单
        playList.value = res;
        console.log('[Player] 初始化', {
          listLength: playList.value.length,
          volume: props.volume,
          loop: store.playerLoop,
          order: store.playerOrder,
        });

        // 首次选择是否自动播放（持久化）
        if (!store.playerAutoplayConfirmed) {
          ElMessageBox.confirm(
            '是否开启自动播放音乐？',
            '提示',
            {
              confirmButtonText: '是',
              cancelButtonText: '否',
              type: 'info',
            },
          )
            .then(() => {
              store.playerAutoplay = true;
              store.playerAutoplayConfirmed = true;
              player.value.play();
              console.log('[Player] 用户选择自动播放: 开启');
            })
            .catch(() => {
              store.playerAutoplay = false;
              store.playerAutoplayConfirmed = true;
              console.log('[Player] 用户选择自动播放: 关闭');
            });
        }
      });
    } catch (err) {
      console.error(err);
      store.musicIsOk = false;
      ElMessage({
        message: "播放器加载失败",
        grouping: true,
        icon: h(PlayWrong, {
          theme: "filled",
          fill: "#efefef",
        }),
      });
    }
  });
});

// 播放
const onPlay = () => {
  console.log('[Player] 播放');
  playIndex.value = player.value.aplayer.index;
  // 播放状态
  store.setPlayerState(player.value.audioRef.paused);
  // 储存播放器信息
  store.setPlayerData(
    playList.value[playIndex.value].name,
    playList.value[playIndex.value].artist,
    playList.value[playIndex.value].cover
  );
  console.log('[Player] 当前曲目', {
    index: playIndex.value,
    name: playList.value[playIndex.value].name,
    artist: playList.value[playIndex.value].artist,
    loop: store.playerLoop,
    order: store.playerOrder,
  });
  ElMessage({
    message: store.getPlayerData.name + " - " + store.getPlayerData.artist,
    grouping: true,
    icon: h(MusicOne, {
      theme: "filled",
      fill: "#efefef",
    }),
  });
};

// 暂停
const onPause = () => {
  store.setPlayerState(player.value.audioRef.paused);
  console.log('[Player] 暂停');
};

// 音频时间更新事件
const onTimeUp = () => {
  // 更新时间
  audioDuration.value = player.value.audioRef.duration;
  audioCurrent.value = player.value.audioRef.currentTime;
  if (Math.floor(audioCurrent.value) % 10 === 0) {
    console.log('[Player] 进度', {
      current: audioCurrent.value,
      duration: audioDuration.value,
    });
  }
  
  let lyrics = player.value.aplayer.lyrics[playIndex.value];
  let lyricIndex = player.value.aplayer.lyricIndex;
  if (!lyrics || !lyrics[lyricIndex]) {
    return;
  }
  let lrc = lyrics[lyricIndex][1];
  if (lrc === "Loading") {
    lrc = "歌词加载中";
  } else if (lrc === "Not available") {
    lrc = "歌词加载失败";
  }
  store.setPlayerLrc(lrc);
};

// 切换播放暂停事件
const playToggle = () => {
  player.value.toggle();
  console.log('[Player] 切换播放/暂停');
};

// 切换音量事件
const changeVolume = (value) => {
  player.value.setVolume(value, false);
  console.log('[Player] 音量', value);
};

// 切换上下曲
const changeSong = (type) => {
  type === 0 ? player.value.skipBack() : player.value.skipForward();
  nextTick(() => {
    player.value.play();
    console.log('[Player] 切歌', type === 0 ? '上一首' : '下一首', '-> index', player.value.aplayer.index);
  });
};

// 切换歌曲列表状态
const toggleList = () => {
  player.value.toggleList();
  console.log('[Player] 列表显示切换');
};

// 加载音频错误
const loadMusicError = () => {
  let notice = "";
  if (playList.value.length > 1) {
    notice = "播放歌曲出现错误，播放器将在 2s 后进行下一首";
  } else {
    notice = "播放歌曲出现错误";
  }
  ElMessage({
    message: notice,
    grouping: true,
    icon: h(PlayWrong, {
      theme: "filled",
      fill: "#EFEFEF",
      duration: 2000,
    }),
  });
  console.error(
    "播放歌曲: " + player.value.aplayer.audio[player.value.aplayer.index].name + " 出现错误",
  );
};

// 监听播放模式变更日志
watch(
  () => store.playerLoop,
  (val) => {
    console.log('[Player] 循环模式变更', val);
  },
);
watch(
  () => store.playerOrder,
  (val) => {
    console.log('[Player] 播放顺序变更', val);
  },
);

// 暴露子组件方法
defineExpose({
  playToggle,
  changeVolume,
  changeSong,
  toggleList,
  audioDuration,
  audioCurrent,
  player,
});
</script>

<style lang="scss" scoped>
.aplayer {
  width: 100%;
  min-height: 270px;
  border-radius: 6px;
  font-family: "HarmonyOS_Regular", sans-serif !important;
  :deep(.aplayer-body) {
    background-color: transparent;
    .aplayer-pic {
      display: none;
    }
    .aplayer-info {
      margin-left: 0;
      background-color: #ffffff20;
      border-color: transparent !important;
      .aplayer-music {
        flex-grow: initial;
        margin-bottom: 2px;
        overflow: initial;
        .aplayer-title {
          font-size: 16px;
          margin-right: 6px;
        }
        .aplayer-author {
          color: #efefef;
        }
      }
      .aplayer-lrc {
        text-align: left;
        margin: 7px 0 6px 6px;
        height: 44px;
        mask: linear-gradient(
          #fff 15%,
          #fff 85%,
          hsla(0deg, 0%, 100%, 0.6) 90%,
          hsla(0deg, 0%, 100%, 0)
        );
        -webkit-mask: linear-gradient(
          #fff 15%,
          #fff 85%,
          hsla(0deg, 0%, 100%, 0.6) 90%,
          hsla(0deg, 0%, 100%, 0)
        );
        &::before,
        &::after {
          display: none;
        }
        p {
          color: #efefef;
        }
        .aplayer-lrc-current {
          font-size: 0.95rem;
          margin-bottom: 4px !important;
        }
      }
      .aplayer-controller {
        display: none;
      }
    }
  }
  :deep(.aplayer-list) {
    margin-top: 8px;
    min-height: 150px;
    height: v-bind(listHeight);
    overflow-y: auto;
    padding: 8px;
    background-color: transparent;
    ol {
      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
      li {
        border-color: transparent;
        border-radius: 12px;
        padding: 6px 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &.aplayer-list-light {
          background: #ffffff26;
          border-radius: 12px;
        }
        &:hover {
          background: #ffffff33 !important;
          border-radius: 12px !important;
        }
        .aplayer-list-index,
        .aplayer-list-author {
          color: #efefef;
        }
      }
    }
  }
}
</style>
