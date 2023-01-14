<template>
  <div ref="playerRef"></div>
</template>
 
<script setup>
import { MusicOne, PlayWrong } from "@icon-park/vue-next";
import APlayer from "APlayer";
import "aplayer/dist/APlayer.min.css";
import {
  h,
  ref,
  reactive,
  nextTick,
  onMounted,
  onBeforeUnmount,
  watch,
} from "vue";
import { getPlayerList } from "@/api";
import { mainStore } from "@/store";
const store = mainStore();

const playerRef = ref();
const state = reactive({
  instance: null,
});
const playerData = reactive({
  name: null,
  artist: null,
  lrc: null,
});

// APlayer歌曲信息
class Audio {
  // 音频艺术家
  // artist: String;
  // 音频名称
  // name: String;
  // 音频链接
  // url: String;
  // 音频封面
  // cover: String;
  // 歌词
  // lrc: String;

  constructor(artist, name, url, cover, lrc) {
    this.artist = artist;
    this.name = name;
    this.url = url;
    this.cover = cover;
    this.lrc = lrc;
  }
}

const props = defineProps({
  // 开启吸底模式
  fixed: {
    type: Boolean,
    default: false,
  },
  // 开启迷你模式
  mini: {
    type: Boolean,
    default: false,
  },
  // 音频自动播放
  autoplay: {
    type: Boolean,
    default: false,
  },
  // 主题色
  theme: {
    type: String,
    default: "#efefef",
  },
  // 音频循环播放
  loop: {
    type: String,
    default: "all", //'all' | 'one' | 'none'
  },
  // 音频循环顺序
  order: {
    type: String,
    default: "random", //'list' | 'random'
  },
  // 预加载
  preload: {
    type: String,
    default: "auto", //'auto' | 'metadata' | 'none'
  },
  // 默认音量
  volume: {
    type: Number,
    default: 0.7,
    validator: (value) => {
      return value >= 0 && value <= 1;
    },
  },
  // 歌曲服务器 ( netease-网易云, tencent-qq音乐, kugou-酷狗, xiami-小米音乐, baidu-百度音乐 )
  songServer: {
    type: String,
    default: "netease", //'netease' | 'tencent' | 'kugou' | 'xiami' | 'baidu'
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
  // 互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
  mutex: {
    type: Boolean,
    default: true,
  },
  // 传递歌词方式
  lrcType: {
    type: Number,
    default: 3,
  },
  // 列表是否默认折叠
  listFolded: {
    type: Boolean,
    default: false,
  },
  // 列表最大高度
  listMaxHeight: {
    type: String,
    default: "420px",
  },
  // 存储播放器设置的 localStorage key
  storageName: {
    type: String,
    default: "aplayer-setting",
  },
});

// 初始化播放器
onMounted(() => {
  nextTick(() => {
    getPlayerList(props.songServer, props.songType, props.songId)
      .then((res) => {
        // console.log(res);
        // 更改播放器加载状态
        store.musicIsOk = true;
        console.log("音乐加载完成");
        let audioList = res.map(
          (value) =>
            new Audio(value.artist, value.name, value.url, value.pic, value.lrc)
        );
        state.instance = new APlayer({
          container: playerRef.value,
          fixed: props.fixed,
          mini: props.mini,
          autoplay: props.autoplay,
          theme: props.theme,
          loop: props.loop,
          order: props.order,
          preload: props.preload,
          volume: props.volume,
          mutex: props.mutex,
          lrcType: props.lrcType,
          listFolded: props.listFolded,
          listMaxHeight: props.listMaxHeight,
          storageName: props.storageName,
          audio: audioList,
        });

        state.instance.on("play", () => {
          // 播放状态
          store.setPlayerState(state.instance.audio.paused);
          // 储存播放器信息
          store.setPlayerData(
            playerRef.value.getElementsByClassName("aplayer-title")[0]
              .innerHTML,
            playerRef.value
              .getElementsByClassName("aplayer-author")[0]
              .innerHTML.split("-")[1]
              .trim()
          );
          ElMessage({
            message:
              store.getPlayerData.name + " - " + store.getPlayerData.artist,
            grouping: true,
            icon: h(MusicOne, {
              theme: "filled",
              fill: "#efefef",
            }),
          });
        });

        state.instance.on("pause", () => {
          // 播放状态
          store.setPlayerState(state.instance.audio.paused);
        });

        state.instance.on("timeupdate", () => {
          if (playerRef.value) {
            playerData.lrc = playerRef.value.getElementsByClassName(
              "aplayer-lrc-current"
            )[0].innerHTML;
          }
        });
      })
      .catch(() => {
        store.musicIsOk = false;
        ElMessage({
          message: "播放器加载失败",
          grouping: true,
          icon: h(PlayWrong, {
            theme: "filled",
            fill: "#efefef",
          }),
        });
      });
  });
});

// 销毁播放器
onBeforeUnmount(() => {
  state.instance.destroy();
});

// 切换播放暂停事件
const playToggle = () => {
  state.instance.toggle();
};

// 切换音量事件
const changeVolume = (value) => {
  state.instance.volume(value);
};

// 切换上下曲
const changeSongPrev = () => {
  state.instance.skipBack();
};
const changeSongNext = () => {
  state.instance.skipForward();
};

// 暴露子组件方法
defineExpose({ playToggle, changeVolume, changeSongPrev, changeSongNext });

// 监听歌词变化
watch(
  () => playerData.lrc,
  (value) => {
    console.log(value);
    // 储存至 pinia
    store.setPlayerLrc(value);
  }
);
</script>
 
<style lang='scss' scoped>
.aplayer {
  width: 80%;
  background: transparent;
  border-radius: 6px;
  :deep(.aplayer-body) {
    .aplayer-pic {
      display: none;
    }
    .aplayer-info {
      margin-left: 0;
      background-color: #ffffff40;
      border-color: transparent;
      .aplayer-title {
        font-size: 16px;
      }
      .aplayer-author {
        color: #efefef;
      }
      .aplayer-lrc {
        text-align: left;
        margin: 4px 0 0 6px;
        height: 38px;
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
    margin-top: 6px;
    ol {
      li {
        border-color: transparent;
        &.aplayer-list-light {
          background: #ffffff40;
          border-radius: 6px;
        }
        &:hover {
          background: #ffffff26 !important;
          border-radius: 6px !important;
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