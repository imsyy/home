<template>
  <div class="left">
    <Message />
    <SocialLinks />
  </div>
</template>

<script setup>
import Message from "@/components/Message/index.vue";
import SocialLinks from "@/components/SocialLinks/index.vue";
</script>

<style lang="scss" scoped>
.left {
  flex: 1 0 0%;
  margin-right: 10px;
  transform: translateY(20px);
}
</style>