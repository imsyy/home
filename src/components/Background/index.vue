<template>
  <div class="cover">
    <img class="bg" :src="bgUrl" alt="cover" />
    <div class="gray"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { mainStore } from "@/store";
const store = mainStore();

let bgUrl = ref(null); // 壁纸链接

const changeBg = (type) => {
  if (type == 0) {
    bgUrl.value = `/images/background${Math.floor(
      Math.random() * 10 + 1
    )}.webp`;
  } else if (type == 1) {
    bgUrl.value = "https://api.dujin.org/bing/1920.php";
  } else if (type == 2) {
    bgUrl.value = "https://api.ixiaowai.cn/gqapi/gqapi.php";
  } else if (type == 3) {
    bgUrl.value = "https://api.ixiaowai.cn/api/api.php";
  }
}

onMounted(() => {
  // 加载壁纸
  changeBg(store.coverType);
});

// 监听壁纸种类变化
watch(
  () => store.coverType,
  (value) => {
    changeBg(value);
  }
);
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

  .bg {
    transform: scale(1);
    filter: blur(0);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 1.5s ease 0s;
    backface-visibility: hidden;
  }

  .gray {
    opacity: 1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(rgba(0, 0, 0, 0) 0,
        rgba(0, 0, 0, 0.5) 100%),
      radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%);

    transition: 1.5s;
  }
}

// 加载时动画
.loading {
  .cover {
    .bg {
      transition: 1.5s;
      transform: scale(1.1);
      filter: blur(10px);
    }

    .gray {
      transition: 1.5s;
      opacity: 0;
    }
  }
}
</style>