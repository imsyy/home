<template>
  <APlayer v-if="playList[0]" ref="player" :audio="playList" :autoplay="store.playerAutoplay" :theme="theme"
    :autoSwitch="false" :loop="store.playerLoop" :order="store.playerOrder" :volume="volume" :showLrc="true"
    :listFolded="listFolded" :listMaxHeight="listMaxHeight" :noticeSwitch="false" @play="onPlay" @pause="onPause"
    @Loadstart="onLoadStart" @timeupdate="onTimeUp" @error="loadMusicError" @canplay="onCanplay" @waiting="onWaiting" />
</template>

<script setup>
import { Float, MusicOne, PlayWrong } from "@icon-park/vue-next";
import { getPlayerList } from "@/api";
import { mainStore } from "@/store";
import APlayer from "@worstone/vue-aplayer";
import { Speech, stopSpeech, SpeechLocal } from "@/utils/speech";
import { decodeYrc } from "@/utils/decodeYrc";

const store = mainStore();
let showYrcRunning = 0;
let lastTimestamp = Date.now();
let nowLineStart = -1;

// 获取播放器 DOM
const player = ref(null);

// 歌曲播放列表
const playList = ref([]);

// 歌曲播放项
const playIndex = ref(0);

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
        // 更改播放器加载状态
        store.musicIsOk = true;
        // 生成歌单
        playList.value = res;
        if ("mediaSession" in navigator) {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: "Loading...",
          });
          // 设置 Media Session 操作
          navigator.mediaSession.setActionHandler("play", () => {player.value.play()});
          navigator.mediaSession.setActionHandler("pause", () => {player.value.pause()});
          navigator.mediaSession.setActionHandler("nexttrack", () => {changeSong(1)});
          navigator.mediaSession.setActionHandler("previoustrack", () => {changeSong(0)});
          navigator.mediaSession.setActionHandler("seekbackward", () => {seekbackward(5)});
          navigator.mediaSession.setActionHandler("seekforward", () => {seekforward(5)});
        };
        console.log("音乐加载完成");
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
      if (store.webSpeech) {
        stopSpeech();
        const voice = import.meta.env.VITE_TTS_Voice;
        const vstyle = import.meta.env.VITE_TTS_Style;
        SpeechLocal("播放器加载失败.mp3");
      }
    };
  });
});

// 播放
const onPlay = () => {
  console.log("播放");
  playIndex.value = player.value.aplayer.index;
  const currentTrack = playList.value[playIndex.value];
  if (!currentTrack) {
    return;
  };
  // 播放状态
  store.setPlayerState(player.value.audioRef.paused);
  // 储存播放器信息
  store.setPlayerData(playList.value[playIndex.value].name, playList.value[playIndex.value].artist);
  ElMessage({
    message: store.getPlayerData.name + " - " + store.getPlayerData.artist,
    grouping: true,
    icon: h(MusicOne, {
      theme: "filled",
      fill: "#efefef",
    }),
  });

  if ("mediaSession" in navigator) {
    // 更新 Media Session 元数据
    navigator.mediaSession.metadata = new MediaMetadata({
      title: store.getPlayerData.name,
      artist: store.getPlayerData.artist,
      album: store.getPlayerData.album,
      artwork: [
        {
          src: playList.value[playIndex.value].cover, // 使用当前播放项的封面图像
          sizes: "512x512",
          type: "image/jpeg",
        },
      ],
    });
    updatePositionState();
  };

  if (store.webSpeech) {
    if (store.playerSpeechName) {
      stopSpeech();
      const voice = import.meta.env.VITE_TTS_Voice;
      const vstyle = import.meta.env.VITE_TTS_Style;
      Speech(
        "正在播放，“" +
        store.getPlayerData.artist +
        "”的歌曲，《" +
        store.getPlayerData.name +
        "》。",
        voice,
        vstyle,
      );
    };
  };
};

// 开始播放处理
const onCanplay = () => {
  // 播放状态
  store.setPlayerCanplay(true);
  updatePositionState();
};

const onWaiting = () => {
  store.setPlayerCanplay(false);
};

// 暂停
const onPause = () => {
  store.setPlayerState(player.value.audioRef.paused);
};

// 切换播放暂停事件
const playToggle = () => {
  player.value.toggle();
  updatePositionState();
};

// 切换音量事件
const changeVolume = (value) => {
  player.value.setVolume(value, false);
};

// 切换上下曲
const changeSong = (type) => {
  type === 0 ? player.value.skipBack() : player.value.skipForward();
  store.setPlayerCanplay(false);
  updatePositionState();
  nextTick(() => {
    player.value.play();
  });
};

// 切换歌曲列表状态
const toggleList = () => {
  player.value.toggleList();
};

// 快退
const seekbackward = (value) => {
  const dur = player.value.audioStatus.duration;
  const currentTime = player.value.audioStatus.playedTime;
  const ti = currentTime - value;
  if (ti > dur) {
    changeSong(1);
  } else if (ti < dur) {
    player.value.aplayer.seek(0);
  } else {
    player.value.aplayer.seek(ti);
  };
  updatePositionState();
};

// 快进
const seekforward = (value) => {
  const dur = player.value.audioStatus.duration;
  const currentTime = player.value.audioStatus.playedTime;
  const ti = currentTime + value;
  if (ti > dur) {
    changeSong(1);
  } else if (ti < dur) {
    player.value.aplayer.seek(0);
  } else {
    player.value.aplayer.seek(ti);
  };
  updatePositionState();
};

// 跳转
const seektime = (value) => {
  const dur = player.value.audioStatus.duration;
  if (value > dur) {
    changeSong(1);
  } else if (value < 0) {
    player.value.aplayer.seek(0);
  } else {
    player.value.aplayer.seek(value);
  };
  updatePositionState();
};

// 加载音频错误
const loadMusicError = () => {
  let notice = "";
  if (playList.value.length > 1) {
    notice = "播放歌曲出现错误，播放器将在 2s 后进行下一首";
    if (store.webSpeech) {
      stopSpeech();
      const voice = import.meta.env.VITE_TTS_Voice;
      const vstyle = import.meta.env.VITE_TTS_Style;
      SpeechLocal("歌曲加载失败.mp3");
    };
  } else {
    notice = "播放歌曲出现错误";
    if (store.webSpeech) {
      stopSpeech();
      const voice = import.meta.env.VITE_TTS_Voice;
      const vstyle = import.meta.env.VITE_TTS_Style;
      SpeechLocal("播放器未知异常.mp3");
    };
  };
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

// 音频时间更新事件
const fetchYrc = async (yrcUrl) => {
  // 逐字接入模块
  const yrcSource = await fetch(yrcUrl);
  const yrcText = await yrcSource.text();
  store.yrcIndex = playIndex.value;
  if (yrcText.startsWith("[ch:0]")) {
    store.yrcEnable = true;
    store.yrcTemp = decodeYrc(yrcText);
    store.yrcLoading = false;
    return;
  } else if (!store.playerYrcATDB) {
    store.yrcEnable = false;
    store.yrcTemp = [];
    store.yrcLoading = false;
    return;
  };
  // 接入 AMLL TTML Database
  const songUrlInf = new URLSearchParams(new URL(yrcUrl).search);
  const songId = songUrlInf.get("id");
  const songServer = songUrlInf.get("server");
  if (!songId) {
    return;
  };
  const songUrlInfUrl = store.playerYrcATDBF
    ? {
      netease: `https://ghfast.top/https://raw.githubusercontent.com/Steve-xmh/amll-ttml-db/main/ncm-lyrics/${songId}.yrc`,
      tencent: `https://ghfast.top/https://raw.githubusercontent.com/Steve-xmh/amll-ttml-db/main/qq-lyrics/${songId}.qrc`,
    }
    : {
      netease: `https://raw.githubusercontent.com/Steve-xmh/amll-ttml-db/main/ncm-lyrics/${songId}.yrc`,
      tencent: `https://raw.githubusercontent.com/Steve-xmh/amll-ttml-db/main/qq-lyrics/${songId}.qrc`,
    };
  if (!["netease", "tencent"].includes(songServer)) {
    return;
  };
  try {
    const amllUrl = songUrlInfUrl[songServer].replace("${songIdlrc}", songId);
    const amllSource = await fetch(amllUrl);
    const amllText = await amllSource.text();
    store.yrcEnable = true;
    store.yrcTemp = decodeYrc(amllText);
    store.yrcLoading = false;
  } catch (e) {
    store.yrcEnable = false;
    store.yrcTemp = [];
    store.yrcLoading = false;
  };
};

function onLoadStart() {
  // 逐字获取模块
  try {
    if (player.value == null || player.value.aplayer == null) {
      return;
    };
    const lyrics = player.value.aplayer.lyrics[playIndex.value];
    if (store.playerYrcShow != true) {
      store.yrcEnable = false;
      store.yrcTemp = [];
      store.yrcLoading = false;
      return;
    };
    if (store.yrcIndex == playIndex.value) {
      return;
    };
    const yrcUrl = player.value.aplayer.audio[player.value.aplayer.index]["lrc"] + "&yrc=true";
    store.yrcIndex = playIndex.value;
    store.yrcLoading = true;
    fetchYrc(yrcUrl);
  } catch (error) {
    store.yrcEnable = false;
    store.yrcTemp = [];
    store.yrcLoading = false;
    console.error(error);
  };
};

const onTimeUp = () => {
  store.playerCurrentTime = player.value.audioStatus.playedTime;
  store.playerDuration = player.value.audioStatus.duration;
  if (showYrcRunning == 0 && player.value != null && player.value.aplayer != null) {
    requestAnimationFrame(syncYrcLrc);
  };
};

function updatePositionState() {
  navigator.mediaSession.setPositionState({
    duration: player.value.audioStatus.duration,
    position: player.value.audioStatus.playedTime,
  });
};

function syncYrcLrc() {
  showYrcRunning = 1;
  try {
    if (player.value == null || player.value.aplayer == null) {
      return requestAnimationFrame(syncYrcLrc);
    } else {
      const isLineByLine = !store.yrcEnable || store.yrcTemp.length == 0 || store.yrcLoading;
      if (isLineByLine) {
        // 逐行模块
        const lyrics = player.value.aplayer.lyrics[playIndex.value];
        const playerLyricIndex = player.value.aplayer.lyricIndex;
        if (lyrics === undefined || lyrics[playerLyricIndex] === undefined) {
          const lrc = "歌词加载中...";
          const output = [[true, 1, playerLyricIndex, 0, lrc]];
          if (store.playerLrc.toString() != output.toString()) {
            store.setPlayerLrc(output);
          };
        } else {
          let lrc = lyrics[playerLyricIndex][1];
          if (lrc === "Loading") {
            lrc = "歌词加载中...";
          } else if (lrc === "Not available" && !store.playerYrcATDB) {
            lrc = "歌词加载失败";
          } else if (lrc === "Not availible") {
            // 哈哈哈又是你（）
            const songUrlInfw = new URLSearchParams(new URL(yrcUrl).search);
            const songIdlrc = songUrlInfw.get("id");
            const songServerlrc = songUrlInfw.get("server");
            if (!songIdlrc) {
              lrc = "歌词加载失败";
            } else {
              const songUrlInfwurl = store.playerYrcATDBF
                ? {
                  netease: `https://ghfast.top/https://raw.githubusercontent.com/Steve-xmh/amll-ttml-db/main/ncm-lyrics/${songIdlrc}.lrc`,
                  tencent: `https://ghfast.top/https://raw.githubusercontent.com/Steve-xmh/amll-ttml-db/main/qq-lyrics/${songIdlrc}.lrc`,
                }
                : {
                  netease: `https://raw.githubusercontent.com/Steve-xmh/amll-ttml-db/main/ncm-lyrics/${songIdlrc}.lrc`,
                  tencent: `https://raw.githubusercontent.com/Steve-xmh/amll-ttml-db/main/qq-lyrics/${songIdlrc}.lrc`,
                };
              if (!["netease", "tencent"].includes(songServerlrc)) {
                lrc = "歌词加载失败";
              } else {
                const amllUrllrc = songUrlInfwurl[songServerlrc].replace("${songIdlrc}", songIdlrc);
                fetch(amllUrllrc)
                  .then((response) => {
                    if (response.status === 404 || !response.ok) {
                      lrc = "歌词加载失败";
                    } else {
                      // 加载 AMLL 逐行歌词 [酪灰写这段代码时脑子没带,纯瞎写的,测试不周,一般也用不到...有异常记得反馈!]
                      response.text().then((text) => {
                        const lines = text.split('\n');
                        const lyrics = lines.map((line) => {
                          const match = line.match(/\[(\d{2}):(\d{2}\.\d{3})\](.*)/);
                          if (match) {
                            const minutes = parseInt(match[1], 10);
                            const seconds = parseFloat(match[2]);
                            const time = minutes * 60 + seconds;
                            const lyric = match[3];
                            return [time, lyric];
                          };
                          return null;
                        }).filter(line => line !== null);
                        player.value.aplayer.lyrics[playIndex.value] = lyrics;
                        const playerLyricIndex = player.value.aplayer.lyricIndex;
                        const lrc = lyrics[playerLyricIndex][1];
                        const output = [[true, 1, playerLyricIndex, 0, lrc]];
                        if (store.playerLrc.toString() != output.toString()) {
                          store.setPlayerLrc(output);
                        };
                      });
                    };
                  })
                  .catch(() => {
                    lrc = "歌词加载失败";
                  });
              };
            };
          } else {
            const output = [[true, 1, playerLyricIndex, 0, lrc]];
            if (store.playerLrc.toString() != output.toString()) {
              store.setPlayerLrc(output);
            };
          };
        };
      } else {
        // 逐字模块
        const now = player.value.audioStatus.playedTime * 1000;
        const yrcFiltered = store.yrcTemp.filter((i) => i[0] < now);
        const yrcLyric =
          yrcFiltered.length > 0
            ? yrcFiltered.slice(-1)[0][2].map((it) => {
              const [[start, duration], word, line, row] = it;
              const isCurrent = now >= start && now <= start + duration;
              const isSungLyrics = start + duration < now;
              const lessdur = start + duration - now;
              return [isCurrent, isSungLyrics, line, row, word, duration, lessdur, "auto"];
            })
            : [[true, 1, 0, 0, `${store.playerTitle} - ${store.playerArtist}`]];
        if (store.playerLrc.toString() != yrcLyric.toString()) {
          store.setPlayerLrc(yrcLyric);
        };
      };
    };
  } catch (error) {
    console.error(error);
  };
  return requestAnimationFrame(syncYrcLrc);
};

// 暴露子组件方法
defineExpose({ playToggle, changeVolume, changeSong, toggleList });
</script>

<style lang="scss" scoped>
.aplayer {
  width: 80%;
  border-radius: 6px;
  font-family: "HarmonyOS_Regular", sans-serif !important;

  :deep(.aplayer-body) {
    background-color: transparent;

    .aplayer-pic {
      display: none;
    }

    .aplayer-info {
      margin-left: 0;
      background-color: #ffffff40;
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
        -webkit-mask: linear-gradient(#fff 15%,
            #fff 85%,
            hsla(0deg, 0%, 100%, 0.6) 90%,
            hsla(0deg, 0%, 100%, 0));
        mask: linear-gradient(#fff 15%,
            #fff 85%,
            hsla(0deg, 0%, 100%, 0.6) 90%,
            hsla(0deg, 0%, 100%, 0));

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
    height: v-bind(listHeight);
    background-color: transparent;

    ol {
      &::-webkit-scrollbar-track {
        background-color: transparent;
      }

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
