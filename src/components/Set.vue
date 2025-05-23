<template>
  <div class="setting">
    <el-collapse class="collapse" v-model="activeName" accordion>
      <el-collapse-item title="个性壁纸" name="1">
        <div class="bg-set">
          <el-radio-group v-model="coverType" text-color="#ffffff" @change="radioChange">
            <el-radio value="0" size="large" border>默认壁纸</el-radio>
            <el-radio value="1" size="large" border>每日一图</el-radio>
            <el-radio value="2" size="large" border>随机风景</el-radio>
            <el-radio value="3" size="large" border>随机动漫</el-radio>
          </el-radio-group>
        </div>
      </el-collapse-item>
      <el-collapse-item title="个性化调整" name="2">
        <div class="item">
          <span class="text">建站日期显示</span>
          <el-switch v-model="siteStartShow" inline-prompt :active-icon="CheckSmall" :inactive-icon="CloseSmall" />
        </div>
        <div class="item">
          <span class="text">音乐点击是否打开面板</span>
          <el-switch v-model="musicClick" inline-prompt :active-icon="CheckSmall" :inactive-icon="CloseSmall" />
        </div>
        <div class="item">
          <span class="text">显示季节特效（此开关刷新后生效）</span>
          <el-switch v-model="seasonalEffects" inline-prompt :active-icon="CheckSmall" :inactive-icon="CloseSmall" />
        </div>
        <div class="item">
          <span class="text">底栏背景模糊</span>
          <el-switch v-model="footerBlur" inline-prompt :active-icon="CheckSmall" :inactive-icon="CloseSmall" />
        </div>
        <div class="item">
          <span class="text">显示底栏音乐进度条</span>
          <el-switch v-model="footerProgressBar" inline-prompt :active-icon="CheckSmall" :inactive-icon="CloseSmall" />
        </div>
      </el-collapse-item>
      <el-collapse-item title="播放器配置" name="3">
        <div class="item">
          <span class="text">自动播放</span>
          <el-switch v-model="playerAutoplay" inline-prompt :active-icon="CheckSmall" :inactive-icon="CloseSmall" />
        </div>
        <div class="item">
          <span class="text">随机播放</span>
          <el-switch v-model="playerOrder" inline-prompt :active-icon="CheckSmall" :inactive-icon="CloseSmall"
            active-value="random" inactive-value="list" />
        </div>
        <div class="item">
          <span class="text">循环模式</span>
          <el-radio-group v-model="playerLoop" size="small" text-color="#FFFFFF">
            <el-radio value="all" border>列表</el-radio>
            <el-radio value="one" border>单曲</el-radio>
            <el-radio value="none" border>不循环</el-radio>
          </el-radio-group>
        </div>
      </el-collapse-item>
      <el-collapse-item title="歌词设置" name="4">
        <div class="item">
          <span class="text">显示底栏歌词</span>
          <el-switch v-model="playerLrcShow" inline-prompt :active-icon="CheckSmall" :inactive-icon="CloseSmall" />
        </div>
        <div v-if="playerLrcShow" class="item">
          <span class="text" white-space="pre">允许调用 AMLL TTML Database 加载网易云没有的歌词<br>&nbsp;&nbsp;&nbsp;（在 Github
            不稳定的网络中可能导致歌词载入速度变慢）</span>
          <el-switch v-model="playerYrcATDB" inline-prompt :active-icon="CheckSmall" :inactive-icon="CloseSmall" />
        </div>
        <div v-if="playerLrcShow && playerYrcATDB" class="item">
          <span class="text" white-space="pre">调用 AMLL TTML Database 时使用镜像加速</span>
          <el-switch v-model="playerYrcATDBF" inline-prompt :active-icon="CheckSmall" :inactive-icon="CloseSmall" />
        </div>
        <div v-if="playerLrcShow" class="item">
          <span class="text">逐字歌词解析总开关</span>
          <el-switch v-model="playerYrcShow" inline-prompt :active-icon="CheckSmall" :inactive-icon="CloseSmall" />
        </div>
        <div v-if="playerLrcShow && playerYrcShow" class="item">
          <span class="text">逐字效果增强开关</span>
          <el-switch v-model="playerYrcShowPro" inline-prompt :active-icon="CheckSmall" :inactive-icon="CloseSmall" />
        </div>
      </el-collapse-item>
      <el-collapse-item title="语音设置" name="5">
        <div class="item">
          <span class="text">网页语音交互总开关</span>
          <el-switch v-model="webSpeech" inline-prompt :active-icon="CheckSmall" :inactive-icon="CloseSmall" />
        </div>
        <div v-if="webSpeech" class="item">
          <span class="text">播报歌名</span>
          <el-switch v-model="playerSpeechName" inline-prompt :active-icon="CheckSmall" :inactive-icon="CloseSmall" />
        </div>
      </el-collapse-item>
      <el-collapse-item title="其他设置" name="6">
        <div>暂时没有其它啦qwq</div>
      </el-collapse-item>
      <el-collapse-item v-if="setV" title="开发设置" name="7">
        <DevSet />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { CheckSmall, CloseSmall, SuccessPicture } from "@icon-park/vue-next";
import DevSet  from "@/components/DevSet.vue";
import { mainStore } from "@/store";
import { storeToRefs } from "pinia";
import { Speech, stopSpeech, SpeechLocal } from "@/utils/speech";

const store = mainStore();
const {
  coverType,
  siteStartShow,
  musicClick,
  playerLrcShow,
  footerBlur,
  playerAutoplay,
  playerOrder,
  playerLoop,
  webSpeech,
  playerSpeechName,
  playerYrcShow,
  playerYrcShowPro,
  playerYrcATDB,
  playerYrcATDBF,
  footerProgressBar,
  seasonalEffects,
  setV,
} = storeToRefs(store);

// 默认选中项
const activeName = ref("1");

// 壁纸切换
const radioChange = () => {
  ElMessage({
    message: "壁纸更换成功",
    icon: h(SuccessPicture, {
      theme: "filled",
      fill: "#efefef",
    }),
  });
  if (store.webSpeech) {
    stopSpeech();
    const voice = import.meta.env.VITE_TTS_Voice;
    const vstyle = import.meta.env.VITE_TTS_Style;
    SpeechLocal("更换壁纸成功.mp3");
  };
};
</script>

<style lang="scss" scoped>
.setting {
  .collapse {
    border-radius: 8px;
    --el-collapse-content-bg-color: #ffffff10;
    border-color: transparent;
    overflow: hidden;

    :deep(.el-collapse-item__header) {
      background-color: #ffffff30;
      color: #fff;
      font-size: 15px;
      padding-left: 18px;
      border-color: transparent;
    }

    :deep(.el-collapse-item__wrap) {
      border-color: transparent;

      .el-collapse-item__content {
        padding: 20px;

        .item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          font-size: 14px;

          .el-switch__core {
            border-color: transparent;
            background-color: #ffffff30;
          }

          .el-radio-group {
            .el-radio {
              margin: 2px 10px 2px 0;
              border-radius: 5px;

              &:last-child {
                margin-right: 0;
              }
            }
          }
        }

        .el-radio-group {
          justify-content: space-between;

          .el-radio {
            margin: 10px 16px;
            background: #ffffff26;
            border: 2px solid transparent;
            border-radius: 8px;

            .el-radio__label {
              color: #fff;
            }

            .el-radio__inner {
              background: #ffffff06 !important;
              border: 2px solid #eeeeee !important;
            }

            &.is-checked {
              background: #ffffff06 !important;
              border: 2px solid #eeeeee !important;
            }

            .is-checked {
              .el-radio__inner {
                background-color: #ffffff30 !important;
                border-color: #fff !important;
              }

              &+.el-radio__label {
                color: #fff !important;
              }
            }
          }
        }
      }
    }
  }
}
</style>
