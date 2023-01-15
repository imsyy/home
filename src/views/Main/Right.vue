<template>
  <div :class="store.mobileOpenState ? 'right' : 'right hidden'">
    <!-- 移动端 Logo -->
    <div class="logo" @click="store.mobileFuncState = !store.mobileFuncState">
      <span class="bg">{{ siteUrl[0] }}</span>
      <span class="sm">.{{ siteUrl[1] }}</span>
    </div>
    <!-- 功能区 -->
    <Func />
    <!-- 网站链接 -->
    <Link />
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { mainStore } from "@/store";
import Func from "@/views/Func/index.vue";
import Link from "@/components/Links/index.vue";
const store = mainStore();

// 站点链接
let siteUrl = import.meta.env.VITE_SITE_URL.split(".");
</script>


<style lang="scss" scoped>
.right {
  flex: 1 0 0%;
  margin-left: 0.75rem;
  .logo {
    font-family: "Pacifico-Regular";
    font-size: 1.75rem;
    position: fixed;
    width: 140px;
    text-align: center;
    top: 8%;
    left: calc(50% - 70px);
    transition: all 0.3s;
    animation: fade;
    -webkit-animation: fade 0.5s;
    &:active {
      transform: scale(0.95);
    }
    @media (min-width: 720px) {
      display: none;
    }
  }
  @media (max-width: 720px) {
    margin-left: 0;
    &.hidden {
      display: none;
    }
  }
}
</style>