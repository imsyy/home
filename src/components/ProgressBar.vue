<template>
    <div v-if="store.footerProgressBar" class="progress-bar">
        <div class="progress" :class="{ dragging: isDragging }"
            :style="{ width: isDragging ? `${dragProgress}%` : `${progressBarWidth}%` }">
            <img v-if="showProgressIcon" src="/images/icon/ProgressBar.ico" class="progress-icon" draggable="false"
                :onmousedown="handleMouseDown" @touchstart.prevent="handleTouchStart" ref="icon" />
            <Icon v-if="!store.playerCanplay" size="32" color="black" class="ReloadCircle">
                <ReloadCircle />
            </Icon>
        </div>
    </div>
</template>

<script setup>
import { MusicOne } from "@icon-park/vue-next";
import { Icon } from "@vicons/utils";
import { Paw, ReloadCircle } from "@vicons/ionicons5";
import { mainStore } from "@/store";
import config from "@/../package.json";
import { ref, watch, computed, onMounted, nextTick, onUpdated, onBeforeUnmount } from "vue";
import { throttle } from "lodash";


const store = mainStore();
const showProgressIcon = ref(false);
const isSeeking = ref(false);
const audio = ref(null);
const icon = ref(null);
const touchIdentifier = ref(null);
const isDragging = ref(false);
const dragProgress = ref(0);
let dragTimer = null;

const props = defineProps({
    forceShowIcon: {
        type: Boolean,
        default: false
    }
});

// 进度计算
const progressBarWidth = computed(() => {
    if (!store.playerState) return 0;
    return (store.playerCurrentTime / store.playerDuration) * 100;
});

// 鼠标事件处理
const handleMouseEnter = () => {
    if (!props.forceShowIcon) {
        showProgressIcon.value = true;
    } else {
        showProgressIcon.value = true;
    };
};

const handleMouseLeave = () => {
    if (!props.forceShowIcon) {
        showProgressIcon.value = false;
    } else {
        showProgressIcon.value = true;
    };
};

const handleMouseDown = (e) => {
    isDragging.value = true;
    isSeeking.value = true;
    const progressBar = document.querySelector('.progress-bar');
    const rect = progressBar.getBoundingClientRect();
    const initialX = e.clientX - rect.left;
    dragProgress.value = (initialX / rect.width) * 100;
};

const onMouseUp = () => {
    if (!isDragging.value) return;
    isDragging.value = false;
    isSeeking.value = false;
    if (dragTimer) clearTimeout(dragTimer);
    if (audio.value && store.playerDuration) {
        audio.value.currentTime = (dragProgress.value / 100) * store.playerDuration;
    };
    dragTimer = setTimeout(() => {
        if (icon.value) icon.value.style.left = '';
    }, 1000);
};

const onMouseMove = throttle((e) => {
    if (!isDragging.value) return;
    const progressBar = document.querySelector('.progress-bar');
    const rect = progressBar.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;
    offsetX = Math.max(0, Math.min(rect.width, offsetX));
    dragProgress.value = (offsetX / rect.width) * 100;
    if (icon.value) {
        const newLeft = offsetX - icon.value.offsetWidth / 2;
        icon.value.style.left = `${newLeft}px`;
    };
}, 16);

// 触摸事件处理
const handleTouchStart = (e) => {
    if (e.touches.length > 1) return;
    isDragging.value = true;
    isSeeking.value = true;
    touchIdentifier.value = e.touches[0].identifier;
    const progressBar = document.querySelector('.progress-bar');
    const rect = progressBar.getBoundingClientRect();
    const initialX = e.touches[0].clientX - rect.left;
    dragProgress.value = (initialX / rect.width) * 100;
};

const onTouchMove = throttle((e) => {
    if (!isDragging.value || touchIdentifier.value === null) return;
    const touch = Array.from(e.touches).find(t => t.identifier === touchIdentifier.value);
    if (!touch) return;
    e.preventDefault();
    const progressBar = document.querySelector('.progress-bar');
    const rect = progressBar.getBoundingClientRect();
    let offsetX = touch.clientX - rect.left;
    offsetX = Math.max(0, Math.min(rect.width, offsetX));
    dragProgress.value = (offsetX / rect.width) * 100;
    if (icon.value) {
        const newLeft = offsetX - icon.value.offsetWidth / 2;
        icon.value.style.left = `${newLeft}px`;
    };
}, 16);

const onTouchEnd = () => {
    if (!isDragging.value) return;
    isDragging.value = false;
    isSeeking.value = false;
    touchIdentifier.value = null;
    if (audio.value && store.playerDuration) {
        audio.value.currentTime = (dragProgress.value / 100) * store.playerDuration;
    };
    if (dragTimer) clearTimeout(dragTimer);
    dragTimer = setTimeout(() => {
        if (icon.value) icon.value.style.left = '';
    }, 1000);
};

// 数据处理
watch(() => store.playerState, (_acc, _now) => {
    audio.value = document.querySelector('audio');
});

// 监听外部强制开关
watch(() => props.forceShowIcon, (val) => {
    if (val) {
        showProgressIcon.value = true;
    } else {
        showProgressIcon.value = false;
    }
});

onMounted(() => nextTick(() => {
    audio.value = document.querySelector('audio');
    const progressBarShowCheck = document.querySelector('#footer');
    if (progressBarShowCheck) {
        progressBarShowCheck.addEventListener('mouseenter', handleMouseEnter);
        progressBarShowCheck.addEventListener('mouseleave', handleMouseLeave);
    };
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
    document.addEventListener('touchcancel', onTouchEnd);
}));

onBeforeUnmount(() => {
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
    document.removeEventListener('touchcancel', onTouchEnd);
});
</script>

<style lang="scss" scoped>
.progress-bar {
    // 进度条样式
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1.5px;
    opacity: 1;
    user-select: none;
    background-color: rgba(240, 240, 240, 1);
    z-index: 99;

    .progress {
        height: 100%;
        width: 100%;
        opacity: 1;
        background-color: rgba(138, 43, 226, 1);
        transition: width 0.1s linear;
        position: relative;
        user-select: none;

        &.dragging {
            transition: none !important;
        }

        .ReloadCircle {
            position: absolute;
            user-select: none;
            touch-action: none;
            top: -16px;
            right: -16px;
            width: 32px;
            height: 32px;
            color: black;
            animation: spin 1s linear infinite;

            @keyframes spin {
                0% {
                    transform: rotate(0deg) translateZ(0);
                }

                100% {
                    transform: rotate(360deg) translateZ(0);
                }
            }
        }


        .progress-icon {
            // 进度条图标，请勿修改宽高和边距，这些参数是定嘶的！除非你有大改动的能力
            position: absolute;
            user-select: none;
            touch-action: none;
            top: -16px;
            right: -16px;
            opacity: 1;
            width: 32px;
            height: 32px;
            cursor: grab;
            transform: translateX(var(--progress-icon-x, 0)) translateZ(0);
            will-change: transform;
            transition: transform 0.1s linear;

            &:active {
                cursor: grabbing;
            }
        }
    }
}
</style>