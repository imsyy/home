<template>
  <div class="animate">
    <Background />
    <main>
      <div class="container" v-show="!store.backgroundShow">
        <section class="main" v-show="!store.setOpenState">
          <MainLeft />
          <MainRight v-show="!store.boxOpenState" />
          <Box v-show="store.boxOpenState" />
        </section>
        <section
          class="more"
          v-show="store.setOpenState"
          @click="store.setOpenState = false"
        >
          <MoreSet />
        </section>
      </div>
      <!-- 移动端菜单按钮 -->
      <Icon
        class="menu"
        size="24"
        @click="store.mobileOpenState = !store.mobileOpenState"
      >
        <component :is="store.mobileOpenState ? CloseSmall : HamburgerButton" />
      </Icon>
    </main>
    <Footer v-show="!store.backgroundShow && !store.setOpenState" />
  </div>
</template>
<script setup>
import { onMounted, onBeforeUnmount, watch } from "vue";
import { helloInit, checkDays } from "@/utils/getTime.js";
import { mainStore } from "@/store";
import { Icon } from "@vicons/utils";
import { HamburgerButton, CloseSmall } from "@icon-park/vue-next";
import MainLeft from "@/views/Main/Left.vue";
import MainRight from "@/views/Main/Right.vue";
import Background from "@/components/Background/index.vue";
import Footer from "@/components/Footer/index.vue";
import Box from "@/views/Box/index.vue";
import MoreSet from "@/views/MoreSet/index.vue";
import cursorInit from "@/utils/cursor.js";
import config from "@/../package.json";
// 新春灯笼
import "@/utils/lantern.js";

const store = mainStore();

// 页面宽度
const getWidth = () => {
  store.setInnerWidth(window.innerWidth);
};

onMounted(() => {
  // 自定义鼠标
  cursorInit();
  // 欢迎提示
  helloInit();
  // 默哀模式
  checkDays();
  // 加载完成事件
  window.addEventListener("load", () => {
    console.log("加载完成");
    // 去除加载标记
    document.getElementsByTagName("body")[0].className = "";
    // 给加载动画添加结束标记
    let loadingBox = document.getElementById("loading-box");
    loadingBox.classList.add("loaded");
  });

  // 屏蔽右键
  document.oncontextmenu = () => {
    ElMessage({
      message: "为了浏览体验，本站禁用右键",
      grouping: true,
      duration: 2000,
    });
    return false;
  };

  // 鼠标中键事件
  window.addEventListener("mousedown", (event) => {
    if (event.button == 1) {
      store.backgroundShow = !store.backgroundShow;
      if (store.backgroundShow) {
        ElMessage("已开启壁纸展示状态");
      } else {
        ElMessage("已退出壁纸展示状态");
      }
    }
  });

  // 监听当前页面宽度
  getWidth();
  window.addEventListener("resize", getWidth);

  // 控制台输出
  let styleTitle1 = "font-size: 20px;font-weight: 600;color: rgb(244,167,89);";
  let styleTitle2 = "font-size:12px;color: rgb(244,167,89);";
  let styleContent = "color: rgb(30,152,255);";
  let title1 = "無名の主页";
  let title2 = `
 _____ __  __  _______     ____     __
|_   _|  \\/  |/ ____\\ \\   / /\\ \\   / /
  | | | \\  / | (___  \\ \\_/ /  \\ \\_/ / 
  | | | |\\/| |\\___ \\  \\   /    \\   /  
 _| |_| |  | |____) |  | |      | |   
|_____|_|  |_|_____/   |_|      |_|`;
  let content = `\n\n版本: ${config.version}\n主页: ${config.home}\nGithub: ${config.github}`;
  console.info(
    `%c${title1} %c${title2} %c${content}`,
    styleTitle1,
    styleTitle2,
    styleContent
  );
});

// 监听宽度变化
watch(
  () => store.innerWidth,
  (value) => {
    if (value < 990) {
      store.boxOpenState = false;
    }
  }
);

onBeforeUnmount(() => {
  window.removeEventListener("resize", getWidth);
});
</script>

<style lang="scss" scoped>
main {
  .container {
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    @media (max-width: 1200px) {
      padding: 0 2vw;
    }
    .main {
      width: 100%;
      height: 100%;
      padding: 0 0.75rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .more {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #00000080;
      backdrop-filter: blur(20px);
      z-index: 2;
      animation: fade;
      -webkit-animation: fade 0.5s;
    }
  }
  .menu {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 84%;
    left: calc(50% - 28px);
    width: 56px;
    height: 34px;
    background: rgb(0 0 0 / 20%);
    backdrop-filter: blur(10px);
    border-radius: 6px;
    transition: all 0.3s;
    animation: fade;
    -webkit-animation: fade 0.5s;
    &:active {
      transform: scale(0.95);
    }
    .i-icon {
      transform: translateY(2px);
    }
    @media (min-width: 720px) {
      display: none;
    }
  }
}

// 加载动画层
.animate {
  transform: scale(1);
  transition: all ease 1.25s;
  opacity: 1;
  filter: blur(0);
  width: 100%;
  height: 100%;
}

.loading {
  .animate {
    transform: scale(1.2);
    transition: all ease 1.25s;
    opacity: 0;
    filter: blur(10px);
  }
}
</style>