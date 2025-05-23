<template>
  <div :class="store.backgroundShow ? 'cover show' : 'cover'">
    <img v-show="store.imgLoadStatus" :src="bgUrl" class="bg" alt="cover" @load="imgLoadComplete"
      @error.once="imgLoadError" @animationend="imgAnimationEnd" />
    <div :class="store.backgroundShow ? 'gray hidden' : 'gray'" />
    <Transition name="fade" mode="out-in">
      <a v-if="store.backgroundShow && store.coverType != '3'" class="down" :href="bgUrl" target="_blank">
        下载壁纸
      </a>
    </Transition>
  </div>
</template>

<script setup>
import { mainStore } from "@/store";
import { Error } from "@icon-park/vue-next";
import { Speech, stopSpeech, SpeechLocal } from "@/utils/speech";
import initSnowfall from "@/utils/season/snow";
import initFirefly from "@/utils/season/firefly";

const store = mainStore();
const bgUrl = ref(null);
const imgTimeout = ref(null);
const emit = defineEmits(["loadComplete"]);

// 自定义壁纸
// 酪灰的小批注：这里增加了从配置文件读取壁纸数的功能，使得在增加壁纸时不需要重新编译项目，只需修改这个 json 文件内的值
// 设置一个默认值，防止在无法加载 JSON 文件时壁纸失效。应该尽量保证壁纸数始终不小于这个默认值
let bgImageCount = 10; // PC 版壁纸
let bgImageCountP = 2; // 移动版壁纸
let bgRandom = 0;
let bgRandomp = 0;
let sest = 0;

// 加载 config.json
async function loadConfig() {
  try {
    const response = await fetch('/images/config.json');
    const data = await response.json();
    bgImageCount = Math.max(data.bgImageCount, 1);
    bgImageCountP = Math.max(data.bgImageCountP, 1);
    bgRandom = Math.floor(Math.random() * bgImageCount + 1);
    bgRandomp = Math.floor(Math.random() * bgImageCountP + 1);
  } catch (error) {
    console.error('无法加载壁纸配置文件:', error);
    bgRandom = Math.floor(Math.random() * bgImageCount + 1);
    bgRandomp = Math.floor(Math.random() * bgImageCountP + 1);
  };
};

// 检测设备类型
const detectDevice = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  if (/mobile|android|iphone|ipad|ipod|windows phone/.test(userAgent)) {
    if (/ipad|tablet|playbook|silk|kindle/.test(userAgent)) {
      return 'tablet'; // 平板
    } else {
      return 'mobile'; // 手机
    };
  } else {
    return 'pc'; // PC
  };
};

// 更换壁纸链接
const changeBg = (type) => {
  (async () => {
    await loadConfig(); // 加载配置文件
    const deviceType = detectDevice(); // 加载设备类型
    if (type == 0) {
      // 这里指定了所有自定义背景的文件格式，必须统一。可以自定义修改，比如 webp 或 png
      // 酪灰的小批注：这里添加了设备类型识别以加载不同分辨率的壁纸
      // 如果不需要区分设备类型，则只需要保留这一行 bgUrl.value = `/images/background${bgRandom}.jpg`;
      if (deviceType === 'mobile') {
        bgUrl.value = `/images/phone/backgroundphone${bgRandomp}.jpg`;
      } else if (deviceType === 'tablet' || deviceType === 'pc') {
        bgUrl.value = `/images/background${bgRandom}.jpg`;
      } else {
        bgUrl.value = `/images/background${bgRandom}.jpg`;
      };
    } else if (type == 1) {
      bgUrl.value = "https://api.dujin.org/bing/1920.php";
    } else if (type == 2) {
      bgUrl.value = "https://api.vvhan.com/api/wallpaper/views";
    } else if (type == 3) {
      bgUrl.value = "https://api.vvhan.com/api/wallpaper/acg";
    };
  })();
};

// 图片加载完成
const imgLoadComplete = () => {
  imgTimeout.value = setTimeout(
    () => {
      store.setImgLoadStatus(true);
    },
    Math.floor(Math.random() * (600 - 300 + 1)) + 300,
  );
};

// 图片动画完成
const imgAnimationEnd = () => {
  console.log("壁纸加载且动画完成");
  // 加载完成事件
  emit("loadComplete");
};

// 图片显示失败
const imgLoadError = () => {
  console.error("壁纸加载失败：", bgUrl.value);
  ElMessage({
    message: "壁纸加载失败，已临时切换回默认",
    icon: h(Error, {
      theme: "filled",
      fill: "#efefef",
    }),
  });
  bgUrl.value = `/images/background${bgRandom}.jpg`;
  if (store.webSpeech) {
    stopSpeech();
    const voice = import.meta.env.VITE_TTS_Voice;
    const vstyle = import.meta.env.VITE_TTS_Style;
    SpeechLocal("壁纸加载失败.mp3");
  };
};

// 监听壁纸切换
watch(
  () => store.coverType,
  (value) => {
    changeBg(value);
  },
);

const SeasonStyle = async (type) => {
  if (store.seasonalEffects) {
    const month = new Date().getMonth() + 1; // 当前月份，1-12
    if (type == 0) {
      if (sest == 1) return;
      if ([12, 1, 2].includes(month)) {
        initSnowfall();
      } else if ([1, 2].includes(month)) {
        await import("@/utils/season/lantern");
      } else if ([7, 8, 9].includes(month)) {
        initFirefly();
      } else {
        return;
      };
    } else if (type == 1) {
      initSnowfall();
    } else if (type == 2) {
      await import("@/utils/season/lantern");
    } else if (type == 3) {
      initFirefly();
    } else {
      return;
    };
  };
  sest = 1;
};


onMounted(async () => {
  // 加载壁纸
  changeBg(store.coverType);
  // 加载季节特效
  SeasonStyle(0);
});

onBeforeUnmount(() => {
  clearTimeout(imgTimeout.value);
});
</script>

<style lang="scss" scoped>
.cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.25s;
  z-index: -1;

  &.show {
    z-index: 1;
  }

  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    backface-visibility: hidden;
    filter: blur(20px) brightness(0.3);
    transition:
      filter 0.3s,
      transform 0.3s;
    animation: fade-blur-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    animation-delay: 0.45s;
  }

  .gray {
    opacity: 1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.5) 100%),
      radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%);

    transition: 1.5s;

    &.hidden {
      opacity: 0;
      transition: 1.5s;
    }
  }

  .down {
    font-size: 16px;
    color: white;
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: block;
    padding: 20px 26px;
    border-radius: 8px;
    background-color: #00000030;
    width: 120px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      transform: scale(1.05);
      background-color: #00000060;
    }

    &:active {
      transform: scale(1);
    }
  }
}
</style>
