<template>
  <div
    class="box cards"
    @mouseenter="closeShow = true"
    @mouseleave="closeShow = false"
  >
    <transition name="el-fade-in-linear">
      <close-one
        class="close"
        theme="filled"
        size="28"
        fill="#ffffff60"
        v-show="closeShow"
        @click="store.boxOpenState = false"
      />
    </transition>
    <div class="content">
      <TimeCapsule />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { CloseOne } from "@icon-park/vue-next";
import TimeCapsule from "@/components/TimeCapsule/index.vue";
import { mainStore } from "@/store";
const store = mainStore();

let closeShow = ref(false);

// 监听宽度变化
watch(
  () => store.innerWidth,
  (value) => {
    console.log(value);
    if (value < 990 && store.boxOpenState) {
      store.boxOpenState = false;
    }
  }
);
</script>

<style lang="scss" scoped>
.box {
  flex: 1 0 0%;
  margin-left: 0.75rem;
  height: 80%;
  position: relative;
  &:hover {
    transform: scale(1);
  }
  .close {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 28px;
    height: 28px;
    &:hover {
      transform: scale(1.2);
    }
    &:active {
      transform: scale(1);
    }
  }
  .content {
    padding: 30px;
    width: 100%;
    height: 100%;
  }
}
</style>