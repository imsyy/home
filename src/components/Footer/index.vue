<template>
  <footer>
    <Transition name="fade">
      <div class="power" v-show="!store.playerState">
        <span
          >Copyright&nbsp;&copy;&nbsp;{{ fullYear }}
          <a href="https://imsyy.top">無名</a>
        </span>
        <!-- 以下信息请不要修改哦 -->
        <span
          >&nbsp;&amp;&nbsp;Made&nbsp;by&nbsp;<a
            href="https://github.com/imsyy/home"
            target="_blank"
            >imsyy</a
          > </span
        >&nbsp;&amp;
        <!-- 站点备案 -->
        <a href="https://beian.miit.gov.cn" target="_blank"
          >豫ICP备2022018134号-1</a
        >
      </div>
    </Transition>
    <Transition name="fade">
      <div class="lrc" v-show="store.playerState">
        <music-one theme="filled" size="18" fill="#efefef" />
        <span class="lrc-text">{{ store.getPlayerLrc }}</span>
        <music-one theme="filled" size="18" fill="#efefef" />
      </div>
    </Transition>
  </footer>
</template>

<script setup>
import { MusicOne } from "@icon-park/vue-next";
import { mainStore } from "@/store";
const store = mainStore();

let fullYear = new Date().getFullYear();
</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 46px;
  line-height: 46px;
  text-align: center;
  backdrop-filter: blur(10px);
  background: rgb(0 0 0 / 25%);
  z-index: 0;
  .lrc {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .lrc-text {
      margin: 0 8px;
    }
    .i-icon {
      width: 18px;
      height: 18px;
      display: inherit;
    }
  }
}
</style>