<template>
  <!-- 社交链接 -->
  <div class="social">
    <div class="link">
      <a
        id="github"
        :href="socialLinks.github"
        target="_blank"
        @mouseenter="changeTip"
        @mouseleave="leaveTip"
      >
        <Icon size="24">
          <Github />
        </Icon>
      </a>
      <a
        id="qq"
        :href="socialLinks.qq"
        target="_blank"
        @mouseenter="changeTip"
        @mouseleave="leaveTip"
      >
        <Icon size="24">
          <Qq />
        </Icon>
      </a>
      <a
        id="email"
        :href="socialLinks.email"
        @mouseenter="changeTip"
        @mouseleave="leaveTip"
      >
        <Icon size="28">
          <EmailRound />
        </Icon>
      </a>
      <a
        id="telegram"
        :href="socialLinks.telegram"
        target="_blank"
        @mouseenter="changeTip"
        @mouseleave="leaveTip"
      >
        <Icon size="24">
          <Telegram />
        </Icon>
      </a>
      <a
        id="twitter"
        :href="socialLinks.twitter"
        target="_blank"
        @mouseenter="changeTip"
        @mouseleave="leaveTip"
      >
        <Icon size="24">
          <Twitter />
        </Icon>
      </a>
    </div>
    <span class="tip">{{ socialTip }}</span>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { Github, Qq, Telegram, Twitter } from "@vicons/fa";
import { EmailRound } from "@vicons/material";
import { Icon } from "@vicons/utils";

// 社交链接数据
let socialHover = ref(false);
let socialTip = ref("通过这里联系我吧");
let socialTipData = {
  github: "去 Github 看看",
  qq: "有什么事吗",
  email: "来封 Email",
  telegram: "你懂的 ~",
  twitter: "你懂的 ~",
};

// 社交链接地址
const socialLinks = reactive({
  github: "https://github.com/" + import.meta.env.VITE_SOCIAL_GITHUB,
  qq:
    "https://wpa.qq.com/msgrd?v=3&uin=" +
    import.meta.env.VITE_SOCIAL_QQ +
    "&site=qq&menu=yes",
  email: "mailto:" + import.meta.env.VITE_SOCIAL_EMAIL,
  telegram: "https://t.me/" + import.meta.env.VITE_SOCIAL_TELEGRAM,
  twitter: "https://twitter.com/" + import.meta.env.VITE_SOCIAL_TWITTER,
});

// 鼠标移入移出事件
const changeTip = (e) => {
  let tipKey = e.target.id;
  switch (tipKey) {
    case "github":
      socialTip.value = socialTipData.github;
      return true;
    case "qq":
      socialTip.value = socialTipData.qq;
      return true;
    case "email":
      socialTip.value = socialTipData.email;
      return true;
    case "telegram":
      socialTip.value = socialTipData.telegram;
      return true;
    case "twitter":
      socialTip.value = socialTipData.twitter;
      return true;
    default:
      return true;
  }
};

const leaveTip = () => {
  socialTip.value = "通过这里联系我吧";
};
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
      span {
        margin: 0 12px;
      }
    }
  }
  .tip {
    display: none;
    margin-right: 12px;
  }
  &:hover {
    background-color: #00000040;
    backdrop-filter: blur(5px);
    .tip {
      display: block;
    }
  }
}
</style>