<template>
  <div class="floating-music">
    <!-- 展开后的面板 -->
    <Transition name="fade-up">
      <div
        :class="['music-panel', { 'with-list': listOpen }]"
        v-show="store.musicOpenState"
        @mouseenter="volumeShow = true"
        @mouseleave="volumeShow = false"
      >
        <!-- 顶部信息 -->
        <div class="panel-header">
          <span
            class="song-name"
            :title="store.getPlayerData.name + ' - ' + store.getPlayerData.artist"
          >{{
            store.getPlayerData.name
              ? store.getPlayerData.name + " - " + store.getPlayerData.artist
              : (store.musicIsOk ? "未播放音乐" : "Loading...")
          }}</span>
          <div class="header-actions">
            <span
              v-if="listOpen"
              class="back-btn"
              @click="toggleList"
              title="返回播放器"
            >返回</span>
            <close-small
              theme="filled"
              size="20"
              fill="#efefef"
              class="close-btn"
              @click="store.musicOpenState = false"
            />
          </div>
        </div>

        <!-- 封面与旋转 -->
        <div class="cover-container" v-if="!listOpen">
          <div :class="['cover', { rotating: store.playerState }]">
            <img
              :src="store.getPlayerData.cover || defaultCover"
              alt="cover"
              class="cover-img"
              @error="imgError"
            />
            <div class="center-hole"></div>
          </div>
        </div>

        <!-- 进度条 -->
        <div class="progress-container" v-if="store.musicIsOk && !listOpen">
          <el-slider
            v-model="currentProgress"
            :show-tooltip="false"
            :min="0"
            :max="totalDuration"
            size="small"
            @change="changeProgress"
            @input="isDragging = true"
          />
          <div class="time-info">
            <span>{{ formatTime(currentTime) }}</span>
            <span>{{ formatTime(totalDuration) }}</span>
          </div>
        </div>
        <div class="loading" v-else-if="!listOpen">
          <span>Loading...</span>
        </div>

        <!-- 控制区 -->
        <div class="control" v-if="!listOpen">
          <!-- 播放模式 -->
          <div class="mode-btn" @click="changePlayMode" :title="modeTitle">
            <loop-once theme="filled" size="20" fill="#efefef" v-if="store.playerLoop === 'one'" />
            <shuffle-one theme="filled" size="20" fill="#efefef" v-else-if="store.playerOrder === 'random'" />
            <play-cycle theme="filled" size="20" fill="#efefef" v-else />
          </div>

          <go-start
            class="control-btn"
            theme="filled"
            size="28"
            fill="#efefef"
            @click="changeMusicIndex(0)"
          />
          <div class="play-btn" @click="changePlayState">
            <play-one theme="filled" size="38" fill="#efefef" v-show="!store.playerState" />
            <pause theme="filled" size="38" fill="#efefef" v-show="store.playerState" />
          </div>
          <go-end
            class="control-btn"
            theme="filled"
            size="28"
            fill="#efefef"
            @click="changeMusicIndex(1)"
          />

          <!-- 列表按钮 -->
          <div class="list-btn" @click="toggleList" title="播放列表">
            <music-list theme="filled" size="20" fill="#efefef" />
          </div>
        </div>

        <!-- 自动播放开关行 -->
        <div class="autoplay-row" v-if="!listOpen">
          <span class="label">自动播放音乐（此设置将被保存）</span>
          <el-switch v-model="store.playerAutoplay" @change="onAutoplayChange" />
        </div>

        <!-- 底部音量 -->
        <div class="tools" v-if="!listOpen">
          <div class="volume-control">
            <div class="icon" @click="toggleMute">
              <volume-mute theme="filled" size="18" fill="#efefef" v-if="volumeNum == 0" />
              <volume-small
                theme="filled"
                size="18"
                fill="#efefef"
                v-else-if="volumeNum > 0 && volumeNum < 0.7"
              />
              <volume-notice theme="filled" size="18" fill="#efefef" v-else />
            </div>
            <el-slider
              v-model="volumeNum"
              :show-tooltip="false"
              :min="0"
              :max="1"
              :step="0.01"
              size="small"
            />
          </div>
        </div>
        
        <!-- 播放器列表区域 -->
        <div class="player-ui" :class="{ open: listOpen }" v-show="listOpen">
          <Player
            ref="playerRef"
            :songServer="playerData.server"
            :songType="playerData.type"
            :songId="playerData.id"
            :volume="volumeNum"
            :listFolded="!listOpen"
            :listMaxHeight="listMaxHeight"
          />
        </div>
      </div>
    </Transition>

    <!-- 悬浮按钮 -->
    <div
      class="fab"
      v-show="!store.musicOpenState"
      @click="store.musicOpenState = true"
      title="打开音乐播放器"
    >
      <music theme="filled" size="24" fill="#efefef" />
    </div>
  </div>
</template>

<script setup>
import {
  GoStart,
  PlayOne,
  Pause,
  GoEnd,
  CloseSmall,
  VolumeMute,
  VolumeSmall,
  VolumeNotice,
  Music,
  LoopOnce,
  ShuffleOne,
  PlayCycle,
  MusicList,
} from "@icon-park/vue-next";
import Player from "@/components/Player.vue";
import { preloadPlayerList } from "@/api";
import { mainStore } from "@/store";

const store = mainStore();

// 默认封面
const defaultCover = "https://y.qq.com/mediastyle/global/img/album_300.png";

// 音量
const volumeShow = ref(false);
const volumeNum = ref(store.musicVolume ? store.musicVolume : 0.7);
const lastVolume = ref(0.7);

// 进度
const currentProgress = ref(0);
const currentTime = ref(0);
const isDragging = ref(false);
const totalDuration = computed(() => playerRef.value?.audioDuration || 0);
// 列表最大高度（随窗口变化）
const MIN_VISIBLE_ITEMS = 5;
const ITEM_HEIGHT = 52;
const LIST_PADDING = 24;
const calcListHeight = () => {
  const min = MIN_VISIBLE_ITEMS * ITEM_HEIGHT + LIST_PADDING;
  const dynamic = Math.floor(window.innerHeight * 0.75);
  return Math.max(min, dynamic);
};
const listMaxHeight = ref(calcListHeight());

// 列表
const listOpen = ref(false);
const playerRef = ref(null);
const playerData = reactive({
  server: import.meta.env.VITE_SONG_SERVER,
  type: import.meta.env.VITE_SONG_TYPE,
  id: import.meta.env.VITE_SONG_ID,
});

// 格式化时间
const formatTime = (time) => {
  if (!time) return "00:00";
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60);
  return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
};

// 进度条变更
const changeProgress = (val) => {
  if (playerRef.value?.player?.audioRef) {
    playerRef.value.player.audioRef.currentTime = val;
    isDragging.value = false;
    console.log('[FloatingMusic] 拖动进度到', val);
  }
};

// 封面加载错误
const imgError = (e) => {
  e.target.src = defaultCover;
};

// 播放模式切换
const changePlayMode = () => {
  if (store.playerLoop === "one") {
    // 单曲 -> 随机
    store.playerLoop = "none";
    store.playerOrder = "random";
    ElMessage.info("随机播放");
    console.log('[FloatingMusic] 播放模式 -> 随机');
  } else if (store.playerOrder === "random") {
    // 随机 -> 列表循环
    store.playerLoop = "all";
    store.playerOrder = "list";
    ElMessage.info("列表循环");
    console.log('[FloatingMusic] 播放模式 -> 列表循环');
  } else {
    // 列表循环 -> 单曲循环
    store.playerLoop = "one";
    store.playerOrder = "list";
    ElMessage.info("单曲循环");
    console.log('[FloatingMusic] 播放模式 -> 单曲循环');
  }
};

const modeTitle = computed(() => {
  if (store.playerLoop === "one") return "单曲循环";
  if (store.playerOrder === "random") return "随机播放";
  return "列表循环";
});

// 静音切换
const toggleMute = () => {
  if (volumeNum.value > 0) {
    lastVolume.value = volumeNum.value;
    volumeNum.value = 0;
    console.log('[FloatingMusic] 静音');
  } else {
    volumeNum.value = lastVolume.value;
    console.log('[FloatingMusic] 取消静音', lastVolume.value);
  }
};

const toggleList = () => {
  listOpen.value = !listOpen.value;
  if (playerRef.value) playerRef.value.toggleList();
  console.log('[FloatingMusic] 列表切换', listOpen.value ? '打开' : '关闭');
};

const changePlayState = () => {
  if (playerRef.value) playerRef.value.playToggle();
  console.log('[FloatingMusic] 切换播放/暂停');
};

const changeMusicIndex = (type) => {
  if (playerRef.value) playerRef.value.changeSong(type);
  console.log('[FloatingMusic] 切歌', type === 0 ? '上一首' : '下一首');
};

// 自动播放开关变更
const onAutoplayChange = (val) => {
  store.playerAutoplayConfirmed = true;
  console.log('[FloatingMusic] 自动播放开关', val);
  if (val && playerRef.value?.player) {
    playerRef.value.player.play();
  }
};

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if (!store.musicIsOk) return;
    if (e.code == "Space") changePlayState();
  });
  window.$openList = toggleList;

  // 定时同步进度
  setInterval(() => {
    if (playerRef.value?.audioCurrent && !isDragging.value) {
      currentTime.value = playerRef.value.audioCurrent;
      currentProgress.value = currentTime.value;
      // 进度日志
      if (Math.floor(currentTime.value) % 10 === 0) {
        console.log('[FloatingMusic] 进度', {
          current: currentTime.value,
          duration: totalDuration.value,
        });
      }
    }
  }, 500);

  const onResize = () => {
    listMaxHeight.value = calcListHeight();
  };
  window.addEventListener('resize', onResize);
  onResize();

  preloadPlayerList(playerData.server, playerData.type, playerData.id);
});

watch(
  () => volumeNum.value,
  (value) => {
    store.musicVolume = value;
    if (playerRef.value) playerRef.value.changeVolume(store.musicVolume);
  },
);
</script>

<style lang="scss" scoped>
.floating-music {
  position: fixed;
  right: 20px;
  bottom: 80px;
  z-index: 998;

  @media (max-width: 720px) {
    bottom: 100px;
    right: 12px;
  }

  .fab {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 46px;
    height: 46px;
    background: #00000040;
    backdrop-filter: blur(10px);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 10px #00000030;
    border: 1px solid #ffffff1a;
    &:hover {
      background: #ffffff33;
      transform: scale(1.1);
    }
    &:active {
      transform: scale(0.95);
    }
  }

    .music-panel {
    position: absolute;
    bottom: 60px;
    right: 0;
    z-index: 2;
    width: 320px;
    background: #00000060;
    backdrop-filter: blur(20px);
    border-radius: 16px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: 0 8px 32px #00000050;
    border: 1px solid #ffffff1a;
      &.with-list {
        width: 480px;
        max-height: 85vh;
        overflow-y: auto;
        overflow-x: hidden;
      }
      @media (max-width: 720px) {
        width: calc(100vw - 40px);
        left: auto;
        right: 0;
        &.with-list {
          width: calc(100vw - 40px);
        }
      }

    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .song-name {
        font-size: 14px;
        font-weight: bold;
        color: #fff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 260px;
      }
      .header-actions {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .back-btn {
        cursor: pointer;
        color: #efefef;
        background: #ffffff26;
        padding: 2px 10px;
        border-radius: 8px;
        font-size: 12px;
        transition: all 0.2s ease;
        &:hover { background: #ffffff33; }
        &:active { transform: scale(0.96); }
      }
      .close-btn {
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s;
        &:hover {
          opacity: 1;
        }
      }
    }

    .cover-container {
      display: flex;
      justify-content: center;
      padding: 10px 0;
      .cover {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: #000;
        position: relative;
        box-shadow: 0 0 10px #00000050;
        overflow: hidden;
        border: 4px solid #1a1a1a;
        animation: rotate 20s linear infinite;
        
        &.rotating {
          animation-play-state: running;
        }
        &:not(.rotating) {
          animation-play-state: paused;
        }

        .cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .center-hole {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 24px;
          height: 24px;
          background: #2a2a2a;
          border-radius: 50%;
          border: 2px solid #000;
        }
      }
    }

    .progress-container {
      width: 100%;
      .time-info {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #ffffff80;
        margin-top: 4px;
      }
      :deep(.el-slider) {
        --el-slider-main-bg-color: #efefef;
        --el-slider-runway-bg-color: #ffffff20;
        --el-slider-button-size: 12px;
        height: 16px;
      }
    }

    .control {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      
      .mode-btn, .list-btn {
        cursor: pointer;
        opacity: 0.8;
        transition: all 0.3s;
        &:hover {
          opacity: 1;
          transform: scale(1.1);
        }
      }

      .play-btn {
        cursor: pointer;
        transition: transform 0.2s;
        &:hover {
          transform: scale(1.1);
        }
        &:active {
          transform: scale(0.95);
        }
      }
      
      .control-btn {
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.3s;
        &:hover {
          opacity: 1;
        }
      }
    }

    .autoplay-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: #ffffff10;
      padding: 8px 12px;
      border-radius: 12px;
      .label { color: #efefef; font-size: 12px; }
    }

    .tools {
      .volume-control {
        display: flex;
        align-items: center;
        background: #ffffff10;
        padding: 8px 12px;
        border-radius: 12px;
        .icon {
          margin-right: 12px;
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        :deep(.el-slider) {
          --el-slider-main-bg-color: #efefef;
          --el-slider-runway-bg-color: #ffffff20;
          --el-slider-button-size: 12px;
          height: 20px;
        }
      }
    }
    .player-ui {
      margin-top: 8px;
      max-width: 480px;
      &.open {
        max-height: 1000px;
        flex: 1;
        min-height: 300px;
        overflow-y: auto;
      }
      @media (max-width: 720px) {
        max-width: 100%;
        &.open { max-height: 75vh; }
      }
    }
  }
}

/* 动画 */
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.zoom-enter-active {
  animation: zoom 0.4s ease-in-out;
}
.zoom-leave-active {
  animation: zoom 0.3s ease-in-out reverse;
}
@keyframes zoom {
  0% {
    opacity: 0;
    transform: scale(0) translateY(-600px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
