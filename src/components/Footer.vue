<template>
  <footer id="footer" :class="store.footerBlur ? 'blur' : null">
    <Transition name="fade" mode="out-in">
      <div v-if="!store.playerState || !store.playerLrcShow" class="power">
        <span>
          <span :class="startYear < fullYear ? 'c-hidden' : 'hidden'">Copyright&nbsp;</span>
          &copy;
          <span v-if="startYear < fullYear" class="site-start">
            {{ startYear }}
            -
          </span>
          {{ fullYear }}
          <a :href="siteUrl">{{ siteAuthor }}</a>
        </span>
        <!-- 以下信息请不要修改哦 -->
        <span class="hidden">
          &amp;&nbsp;Made&nbsp;by
          <a :href="config.github" target="_blank">
            {{ config.author }}
          </a>
        </span>
        <!-- 站点备案 -->
        <span>
          <a v-if="siteIcp" href="https://beian.miit.gov.cn" target="_blank">
            &amp;&nbsp;{{ siteIcp }}
          </a>
          <!-- 这备那备的真的很扫（bushi） -->
          <a v-if="siteMps" href="https://beian.mps.gov.cn" target="_blank">
            &amp;&nbsp;{{ siteMps }}
          </a>
        </span>
      </div>
      <div v-else class="lrc" @dblclick="toggleForceIcon">
        <!-- 音乐进度条 -->
        <ProgressBar v-if="store.footerProgressBar" :forceShowIcon="forceShowIcon" />
        <Transition name="fade" mode="out-in" :id="`lrc-line-${store.playerLrc[0][2]}`"
          v-if="!(!store.yrcEnable || store.yrcTemp.length == 0 || store.yrcLoading)">
          <!-- &amp; -->
          <!-- 逐字模块山 -->
          <div class="lrc-all"
            :key="store.playerLrc.length != 0 ? `lrc-line-${store.playerLrc[0][2]}` : `lrc-line-null`">
            <music-one theme="filled" size="18" fill="#efefef" />
            &nbsp;
            <Icon size="20" style="transform: rotate(-18deg);" class="paws-1">
              <paw />
            </Icon>
            <span class="yrc-box">
              <span class="yrc-2 lrc-text text-hidden" id="yrc-2-wrap">
                <span v-for="i in store.playerLrc" :key="`lrc-over-char-${i[2]}-${i[3]}`" v-html="i[4]">
                </span>
              </span>
              <span class="yrc-1 lrc-text text-hidden" id="yrc-1-wrap">
                <span v-for="i in store.playerLrc" :key="`lrc-char-${i[2]}-${i[3]}`" :class="[
                  'yrc-char',
                  i[0] && Number(i[6]) > 0 ? 'fade-in' : 'fade-in-start',
                  i[0] && Number(i[5]) > 1019 && Number(i[6]) > 0 ? 'long-tone' : 'fade-in-start',
                  i[0] && Number(i[6]) <= 0 ? 'fade-out' : '',
                  i[1] ? 'yrc-style-s2' : 'yrc-style-s1'
                ]" :id="`lrc-char-${i[2]}-${i[3]}`" v-html="i[4]">
                </span>
              </span>
            </span>
            <Icon size="20" style="transform: rotate(18deg);" class="paws-2">
              <paw />
            </Icon>
            &nbsp;
            <music-one theme="filled" size="18" fill="#efefef" />
          </div>
        </Transition>
        <Transition name="fade" mode="out-in" v-else>
          <!-- 逐行模块 -->
          <div class="lrc-all" :key="store.getPlayerLrc">
            <music-one theme="filled" size="18" fill="#efefef" />
            &nbsp;
            <Icon size="20" style="transform: rotate(-18deg);" class="paws-3">
              <paw />
            </Icon>
            <span class="lrc-text text-hidden" v-html="store.getPlayerLrc[0][4]" :class="`lrc-char`" />
            <Icon size="20" style="transform: rotate(18deg);" class="paws-4">
              <paw />
            </Icon>
            &nbsp;
            <music-one theme="filled" size="18" fill="#efefef" />
          </div>
        </Transition>
      </div>
    </Transition>
  </footer>
</template>

<script setup>
import ProgressBar from "@/components/ProgressBar.vue";
import { Speech, stopSpeech, SpeechLocal } from "@/utils/speech";
import { MusicOne } from "@icon-park/vue-next";
import { Icon } from "@vicons/utils";
import { Paw } from "@vicons/ionicons5";
import { mainStore } from "@/store";
import config from "@/../package.json";
import { ref, watch, computed, onMounted, nextTick, onBeforeUnmount } from "vue";
import { throttle } from "lodash";

const store = mainStore();
const fullYear = new Date().getFullYear();
const lrcContainer = ref(null);
const scrollPosition = ref(0);
const currentLine = ref(0);
const audio = ref(null);
const icon = ref(null);
const forceShowIcon = ref(false);

// 加载配置数据
// const siteStartDate = ref(import.meta.env.VITE_SITE_START);
const startYear = ref(
  import.meta.env.VITE_SITE_START?.length >= 4 ?
    import.meta.env.VITE_SITE_START.substring(0, 4) : null
);
const siteIcp = ref(import.meta.env.VITE_SITE_ICP);
const siteMps = ref(import.meta.env.VITE_SITE_MPS);
const siteAuthor = ref(import.meta.env.VITE_SITE_AUTHOR);
const siteUrl = computed(() => {
  const url = import.meta.env.VITE_SITE_URL;
  if (!url) return "https://www.imsyy.top";
  // 判断协议前缀
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "//" + url;
  };
  return url;
});

const toggleForceIcon = () => {
  forceShowIcon.value = !forceShowIcon.value;
  ElMessage({
    dangerouslyUseHTMLString: true,
    message: `${forceShowIcon.value ? '诶？' : '进度 ICON 常驻已禁用'}`,
  });
  if (forceShowIcon.value) {
    stopSpeech();
    const voice = import.meta.env.VITE_TTS_Voice;
    const vstyle = import.meta.env.VITE_TTS_Style;
    SpeechLocal("启用进度图标常驻.mp3");
  } else {
    stopSpeech();
    const voice = import.meta.env.VITE_TTS_Voice;
    const vstyle = import.meta.env.VITE_TTS_Style;
    SpeechLocal("禁用进度图标常驻.mp3");
  };
};

// yrc part
watch(() => store.getPlayerLrc, (_new, _old) => {
  const isLineByLine = !store.yrcEnable || store.yrcTemp.length == 0 || store.yrcLoading;
  if (!store.playerYrcShowPro || isLineByLine) {
    return;
  };
  const audio = document.querySelector('audio');
  if (audio == undefined) {
    return;
  };
  const now = audio.currentTime * 1000;
  const yrc2 = document.getElementsByClassName("yrc-box")[0];
  if (yrc2 == undefined) {
    return;
  };
  const outputDom = yrc2.querySelectorAll("#yrc-2-wrap span");
  const inputDom = yrc2.querySelectorAll("#yrc-1-wrap span");
  if (inputDom.length == 0 || outputDom.length == 0) {
    return;
  };
  const yrcFiltered = store.yrcTemp.filter((i) => i[0] < now && now < i[0] + i[1]);
  if (yrcFiltered.length == 0) {
    return;
  };
  const nowLine = yrcFiltered[yrcFiltered.length - 1][2];
  for (let i = 0; i < nowLine.length; i++) {
    const [[start, duration], _a, _b, _c] = nowLine[i];
    const inputItem = inputDom[i];
    if (!inputItem || inputItem.hasAttribute('data-start')) {
      return;
    };
    const computedStyle = window.getComputedStyle(inputItem);
    const width = parseFloat(computedStyle.width);
    if (isNaN(width)) {
      inputItem.removeAttribute('data-start');
      return;
    };
    const outputItem = outputDom[i];
    const animateOptions = {
      delay: Math.max(0, start - now),
      duration: duration,
      fill: "forwards",
      easing: "linear",
    };
    outputItem.style.transform = "translateY(-1px)";
    const outputAnimate = outputItem.animate(
      [
        { width: 0 },
        { width: `${width}px` },
      ],
      animateOptions,
    );
    outputAnimate.onfinish = () => {
      outputItem.style.transform = "translateY(1px)";
      outputItem.animate(
        [
          { transform: "translateY(-1px)" },
          { transform: "translateY(1px)" },
        ],
        {
          duration: 300,
          fill: "forwards",
          easing: "linear",
        }
      );
    };
    inputItem.setAttribute("data-start", true);
  };
});

</script>

<style lang="scss" scoped>
// 逐字模块1
.yrc-char {
  display: inline-block;
  opacity: 0.6;
  -webkit-transform: translateY(1px);
  transform: translateY(1px);
  -webkit-background-clip: text;
  background-clip: text;
  font-family: MiSans-Regular;
  transition:
    opacity 0.3s linear,
    color 0.5s linear,
    transform 0.3s linear;

  &.fade-in-start {
    text-shadow: 0px 0px 2px rgba(255, 240, 245, 1);
    opacity: 0.6; // 初始显示的透明度
    -webkit-transform: translateY(1px);
    transform: translateY(1px);
    transition:
      color 0.5s linear,
      opacity 0.3s linear,
      transform 0.3s linear;
  }

  &.fade-in {
    opacity: 1;
    -webkit-transform: translateY(-1px);
    transform: translateY(-1px);
    animation: colorFade 0.7s ease-in-out forwards;
    transition:
      color 0.5s linear,
      opacity 0.3s linear,
      transform 0.3s linear;
  }

  &.fade-out {
    opacity: 1;
    -webkit-transform: translateY(-1px);
    transform: translateY(-1px);
    text-shadow: 0px 0px 6px rgba(255, 240, 245, 1),
      0px 0px 2px rgba(176, 224, 230, 1),
      0px 0px 2px rgba(230, 230, 250, 1);
    transition:
      color 0.5s linear,
      opacity 0.3s linear,
      transform 0.3s linear;
  }

  &.fade-enter-active {
    animation: float-up 0.3s linear forwards;
  }

  &.long-tone {
    opacity: 1;
    -webkit-transform: translateY(-1px);
    transform: translateY(-1px);
    animation: pulse 1s ease-in-out forwards;
    transition:
      color 0.5s linear,
      opacity 0.3s linear,
      transform 0.3s linear;
  }

  &.yrc-style-s1 {
    opacity: 0.6;
    color: rgba(220, 220, 220, 1);
    transition:
      color 0.5s linear,
      opacity 0.3s linear,
      transform 0.3s linear;
  }

  &.yrc-style-s2 {
    opacity: 1;
    color: rgba(255, 240, 245, 1);
    text-shadow: 0px 0px 6px rgba(255, 240, 245, 1),
      0px 0px 2px rgba(176, 224, 230, 1),
      0px 0px 2px rgba(230, 230, 250, 1);
    transition:
      color 0.5s linear,
      opacity 0.3s linear,
      transform 0.3s linear;
  }
}

@keyframes float-up {
  from {
    -webkit-transform: translateY(1px);
    transform: translateY(1px);
  }

  to {
    -webkit-transform: translateY(-1px);
    transform: translateY(-1px);
  }
}

@keyframes colorFade {
  from {
    color: rgba(220, 220, 220, 1);
    opacity: 0.6;
    text-shadow: 0px 0px 3px rgba(255, 240, 245, 1),
      0px 0px 0px rgba(176, 224, 230, 1),
      0px 0px 0px rgba(230, 230, 250, 1);
  }

  to {
    color: rgba(255, 240, 245, 1);
    opacity: 1;
    text-shadow: 0px 0px 6px rgba(255, 240, 245, 1),
      0px 0px 2px rgba(176, 224, 230, 1),
      0px 0px 2px rgba(230, 230, 250, 1);
  }
}

@keyframes pulse {
  from {
    color: rgba(220, 220, 220, 1);
    opacity: 0.6;
    text-shadow: 0px 0px 3px rgba(255, 240, 245, 1),
      0px 0px 0px rgba(255, 182, 193, 1),
      0px 0px 0px rgba(255, 192, 203, 1);
  }

  to {
    color: rgba(255, 240, 245, 1);
    opacity: 1;
    text-shadow: 3px 3px 7px rgba(255, 240, 245, 1),
      0px 0px 12px rgba(255, 182, 193, 1),
      0px 0px 12px rgba(255, 192, 203, 1);
  }
}

// 逐字模块2
#yrc-2-wrap>span {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  width: 0;
  opacity: 0.8;
  transition:
    opacity 0.3s linear,
    color 0.5s linear,
    transform 0.3s linear,
    width 0.3s linear;
}

#yrc-2-wrap {
  display: inline-block;
  position: absolute;
  width: auto;
  opacity: 0.8;
  color: rgba(255, 240, 245, 0.3);
  text-shadow: 0 0 6px rgba(0, 191, 255, 0.9),
    0px 0px 2px rgba(176, 224, 230, 0.9),
    0px 0px 2px rgba(230, 230, 250, 0.9);
  font-family: MiSans-Regular;
  overflow: hidden;
  white-space: nowrap;
  transition:
    opacity 0.3s linear,
    color 0.5s linear,
    transform 0.3s linear,
    width 0.3s linear;
}

// 逐行部分
.lrc-char {
  display: inline;
  opacity: 1;
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow: 0 0 6px rgba(255, 240, 245, 1),
    0 0 2px rgba(255, 165, 0, 1),
    0 0 2px rgba(255, 179, 71, 1);
  font-family: MiSans-Regular;
  transition:
    opacity 0.3s linear,
    color 0.5s linear;
}

// End

#footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 46px;
  line-height: 46px;
  text-align: center;
  z-index: 0;
  font-size: 18px;
  // 文字不换行
  word-break: keep-all;
  white-space: nowrap;

  .power {
    animation: fade 0.3s;
  }

  .lrc {
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 1;
    justify-content: flex-start;

    .lrc-all {
      width: 98%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      white-space: nowrap;

      .lrc-text {
        margin: 0 8px;
      }

      .i-icon {
        width: 18px;
        height: 18px;
        display: inherit;
      }

      .yrc-box {
        justify-content: flex-start;
        position: relative;
        white-space: nowrap;
        align-items: center;
        width: auto;
        height: auto;
        z-index: 0;

        .yrc-1,
        .yrc-2 {
          white-space: nowrap;
        }

        .yrc-1 {
          z-index: 1;
        }

        .yrc-2 {
          position: absolute;
          z-index: 1000;
        }
      }
    }

    .lrc-container {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 46px;
      white-space: nowrap;
    }

    .lrc-scroll {
      display: flex;
      transition: transform 0.3s ease;
    }

    .lrc-line {
      display: inline-block;
      padding: 0 10px;
      white-space: nowrap;
      font-size: 18px;
      opacity: 0.6;
      transition: opacity 0.3s, color 0.3s;
    }

    .lrc-line.active {
      opacity: 1;
      color: #fff;
    }

    .lrc-line.played {
      color: #aaa;
    }
  }

  &.blur {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    background: rgb(0 0 0 / 25%);
    font-size: 16px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition:
      opacity 0.2s linear,
      transform 0.2s linear;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(2px);
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 720px) {
    font-size: 0.9rem;

    &.blur {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 560px) {
    .c-hidden {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .hidden {
      display: none;
    }
  }
}
</style>
