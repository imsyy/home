<template>
  <div class="animate">
    <Background />
    <main>
      <div class="container">
        <MainLeft />
        <MainRight v-show="!store.boxOpenState" />
        <Box v-show="store.boxOpenState" />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import MainLeft from "@/views/Main/Left.vue";
import MainRight from "@/views/Main/Right.vue";
import Background from "@/components/Background/index.vue";
import Footer from "@/components/Footer/index.vue";
import Box from "@/views/Box/index.vue";
import cursorInit from "@/utils/cursor.js";
import { mainStore } from "@/store";
const store = mainStore();

// 页面宽度
const getWidth = () => {
  store.setInnerWidth(window.innerWidth);
};

onMounted(() => {
  // 自定义鼠标
  cursorInit();
  // 加载完成事件
  window.addEventListener("load", () => {
    console.log("加载完成");
    // console.clear();
    // 去除加载标记
    document.getElementsByTagName("body")[0].className = "";
    // 给加载动画添加结束标记
    let loadingBox = document.getElementById("loading-box");
    loadingBox.classList.add("loaded");
  });

  // 监听当前页面宽度
  getWidth();
  window.addEventListener("resize", getWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", getWidth);
});
</script>

<style lang="scss" scoped>
main {
  .container {
    margin: 0 auto;
    padding: 0 0.75rem;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
}

// 加载动画层
.animate {
  transform: scale(1);
  transition: all ease 1.25s;
  opacity: 1;
  filter: blur(0);
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