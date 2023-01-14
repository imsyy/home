<template>
  <div class="right">
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
</script>


<style lang="scss" scoped>
.right {
  flex: 1 0 0%;
  margin-left: 0.75rem;
}
</style>