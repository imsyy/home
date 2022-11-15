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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { CloseOne } from "@icon-park/vue-next";
import { mainStore } from "@/store";
const store = mainStore();

let closeShow = ref(false);
</script>

<style lang="scss" scoped>
.box {
  flex: 1 0 0%;
  margin-left: 0.75rem;
  height: 80%;
  padding: 20px;
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
}
</style>