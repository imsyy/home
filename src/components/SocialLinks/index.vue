<template>
  <!-- 社交链接 -->
  <div class="social">
    <div class="link">
      <a
        v-for="item in socialLinks"
        :key="item.name"
        :href="item.url"
        target="_blank"
        @mouseenter="socialTip = item.tip"
        @mouseleave="socialTip = '通过这里联系我吧'"
      >
        <img class="icon" :src="item.icon" height="24" />
      </a>
    </div>
    <span class="tip">{{ socialTip }}</span>
  </div>
</template>

<script setup>
import { ref } from "vue";
import socialLinks from "@/assets/socialLinks.json";

// 社交链接提示
const socialTip = ref("通过这里联系我吧");
</script>

<style lang="scss" scoped>
.social {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 460px;
  width: 100%;
  height: 42px;
  background-color: transparent;
  border-radius: 6px;
  backdrop-filter: blur(0);
  animation: fade;
  -webkit-animation: fade 0.5s;
  transition: all 0.5s;
  @media (max-width: 840px) {
    max-width: 100%;
    justify-content: center;
    .link {
      justify-content: space-evenly !important;
      width: 90%;
    }
    .tip {
      display: none !important;
    }
  }

  .link {
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      display: inherit;
      .icon {
        margin: 0 12px;
        transition: all 0.3s;
        &:active {
          transform: scale(0.9);
        }
      }
    }
  }
  .tip {
    display: none;
    margin-right: 12px;
    animation: fade;
    -webkit-animation: fade 0.5s;
  }
  @media (min-width: 768px) {
    &:hover {
      background-color: #00000040;
      backdrop-filter: blur(5px);
      .tip {
        display: block;
      }
    }
  }
}
</style>
