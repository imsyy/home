<template>
  <!-- 基本信息 -->
  <div class="message">
    <!-- Logo -->
    <div class="logo">
      <img class="logo-img" src="/images/icon/logo.png" alt="logo" />
      <div class="name">
        <span class="bg">imsyy</span>
        <span class="sm">.top</span>
      </div>
    </div>
    <!-- 简介 -->
    <div class="description cards" @click="changeBox">
      <div class="content">
        <Icon size="16">
          <QuoteLeft />
        </Icon>
        <div class="text">
          <p>{{ descriptionText.hello }}</p>
          <p>{{ descriptionText.text }}</p>
        </div>
        <Icon size="16">
          <QuoteRight />
        </Icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, h } from "vue";
import { Icon } from "@vicons/utils";
import { QuoteLeft, QuoteRight } from "@vicons/fa";
import { Error } from "@icon-park/vue-next";
import { mainStore } from "@/store";
const store = mainStore();

// 简介区域文字
let descriptionText = reactive({
  hello: import.meta.env.VITE_DESC_HELLO,
  text: import.meta.env.VITE_DESC_TEXT,
});

// 切换右侧功能区
const changeBox = () => {
  if (store.getInnerWidth >= 990) {
    store.boxOpenState = !store.boxOpenState;
  } else {
    ElMessage({
      message: "当前页面宽度不足以开启盒子",
      icon: h(Error, {
        theme: "filled",
        fill: "#efefef",
      }),
    });
  }
};

// 监听状态变化
watch(
  () => store.boxOpenState,
  (value) => {
    if (value) {
      descriptionText.hello = import.meta.env.VITE_DESC_HELLO_OTHER;
      descriptionText.text = import.meta.env.VITE_DESC_TEXT_OTHER;
    } else {
      descriptionText.hello = import.meta.env.VITE_DESC_HELLO;
      descriptionText.text = import.meta.env.VITE_DESC_TEXT;
    }
  }
);
</script>

<style lang="scss" scoped>
.message {
  .logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    .logo-img {
      border-radius: 50%;
      width: 120px;
    }
    .name {
      width: 100%;
      margin-left: 12px;
      transform: translateY(-8px);
      font-family: "Pacifico-Regular";
      .bg {
        font-size: 5rem;
      }
      .sm {
        margin-left: 6px;
        font-size: 2rem;
      }
    }
  }
  .description {
    padding: 1rem;
    margin-top: 3.5rem;
    max-width: 460px;
    .content {
      display: flex;
      justify-content: space-between;
      .text {
        margin: 0.75rem auto;
        line-height: 2rem;
        margin-right: auto;
        p {
          &:nth-of-type(1) {
            font-family: "Pacifico-Regular";
          }
        }
      }
      .xicon:nth-of-type(2) {
        align-self: flex-end;
      }
    }
  }
}
</style>