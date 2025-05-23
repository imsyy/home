<template>
  <div class="progress-bar">
    <div class="progress" :style="{ width: progressBarWidth + '%' }">
      <img
        src="/images/icon/ProgressBar.ico"
        class="progress-icon"
        draggable="false"
        :onmousedown="startSeeking"
        ref="icon"
      />
    </div>
  </div>
</template>

<script setup>
import { mainStore } from "@/store";

const store = mainStore();
const isSeeking = ref(false);
const icon = ref(null);
// 手动管理
const audio = ref(null);

const startSeeking = () => {
  isSeeking.value = true;
};

const endSeeking = () => {
  if (isSeeking.value && audio.value) {
    const rect = icon.value.getBoundingClientRect();
    const position = rect.left + rect.width / 2;
    audio.value.fastSeek((position / innerWidth) * store.playerDuration);
  }
  isSeeking.value = false;
};

const onMouseMove = (ev) => {
  if (isSeeking.value && audio.value && icon.value) {
    icon.value.style.left = `${Math.floor(ev.clientX - 16)}px`;
  }
};

const onTouchMove = (ev) => {
  if (isSeeking.value && audio.value && icon.value && ev.touches.length == 1) {
    icon.value.style.left = `${Math.floor(ev.touches[0].clientX - 16)}px`;
  }
};

const onCanplay = () => {
  setTimeout(() => {
    icon.value.style.left = "";
  }, 1000);
};

const progressBarWidth = computed(() => {
  if (!store.playerState) return 0;
  return (store.playerCurrentTime / store.playerDuration) * 100;
});

onMounted(() =>
  nextTick(() => {
    audio.value = document.querySelector("audio");
    document.addEventListener("mouseup", endSeeking);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", endSeeking);
    document.addEventListener("touchcancel", endSeeking);
    if (icon.value) {
      icon.value.addEventListener("touchstart", startSeeking);
    }
    if (icon.value && audio.value) {
      audio.value.addEventListener("canplay", onCanplay);
    }
  }),
);
onBeforeUnmount(() => {
  audio.value = null;
  document.removeEventListener("mouseup", endSeeking);
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("touchmove", onTouchMove);
  document.removeEventListener("touchend", endSeeking);
  document.removeEventListener("touchcancel", endSeeking);
  if (icon.value) {
    icon.value.removeEventListener("touchstart", startSeeking);
  }
  if (icon.value && audio.value) {
    audio.value.removeEventListener("canplay", onCanplay);
  }
});
</script>

<style lang="scss">
.progress-bar {
  // 进度条样式
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1.5px;
  opacity: 1;
  background-color: rgba(240, 240, 240, 1);

  .progress {
    height: 100%;
    width: 100%;
    opacity: 1;
    background-color: rgba(138, 43, 226, 1);
    transition: width 0.1s linear;
    position: relative;

    .progress-icon {
      // 进度条图标，请勿修改宽高和边距，这些参数是定嘶的！除非你有大改动的能力
      position: absolute;
      top: -16px;
      right: -16px;
      opacity: 1;
      width: 32px;
      height: 32px;
      transform: translateX(var(--progress-icon-x, 0));
      transition: transform 0.1s linear;
    }
  }
}
</style>
