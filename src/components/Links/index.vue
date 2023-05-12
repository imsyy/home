<template>
  <div class="links">
    <div class="line">
      <Icon size="20">
        <Link />
      </Icon>
      <span class="title">网站列表</span>
    </div>
    <Swiper :modules="[Pagination]" :slides-per-view="1" :space-between="40" :pagination="{ el: '.swiper-pagination', clickable: true, bulletElement: 'div', renderBullet: changeBullet }">
      <SwiperSlide v-for="slide in linksData">
        <el-row class="link-all" :gutter="20">
          <el-col :span="8" v-for="(item, index) in slide.slice(0, 6)" :key="item" :style="index >= 3 ? 'margin-top: 20px' : null" @click="jumpLink(item.link)">
            <div class="item cards">
              <Icon size="26">
                <component :is="collection[item.icon] ? collection[item.icon] : Link" />
              </Icon>
              <span class="name">{{ item.name }}</span>
            </div>
          </el-col>
        </el-row>
      </SwiperSlide>
      <div v-show="slideSize > 1" class="pagination-wrapper">
          <div class="swiper-pagination"></div>
      </div>
    </Swiper>
  </div>
</template>

<script setup>
import { h, ref, onMounted } from "vue";
import { getLocalData } from '@/api';
import { Icon } from "@vicons/utils";
import {
  Link,
  Blog,
  CompactDisc,
  Cloud,
  Compass,
  Book,
  Fire,
} from "@vicons/fa";

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper';
import 'swiper/scss'

// 名称与组件集合
const collection = {
  "Blog": Blog,
  "Cloud": Cloud,
  "CompactDisc": CompactDisc,
  "Compass": Compass,
  "Book": Book,
  "Fire": Fire
};

// 网站链接数据
let linksData = ref([]);

// Slide 数量
let slideSize = ref(1);

const getWebsiteLinks = () => {
    getLocalData("/websiteLinks.json")
      .then((res) => {
        linksData.value = res;
        slideSize.value = res.length;

        console.log(linksData.value);
      })
      .catch((err) => {
        console.error(err);
        ElMessage({
          message: "网站链接数据获取失败",
          grouping: true,
          icon: h(Error, {
          theme: "filled",
          fill: "#EFEFEF",
          }),
        });
      });
}

const changeBullet = (index, className) => {
    return "<div class="+ className +"><span></span></div>";
}  

// 链接跳转
const jumpLink = (url) => {
  window.open(url, "_blank");
};

onMounted(() => {
    getWebsiteLinks();
});
</script>

<style lang="scss" scoped>
.links {
  .line {
    margin: 2rem 0.25rem 1rem;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    animation: fade;
    -webkit-animation: fade 0.5s;
    .title {
      margin-left: 8px;
      font-size: 1.15rem;
      text-shadow: 0 0 5px #00000050;
    }
  }

  .swiper {
    left: -10px;
    width: calc(100% + 20px);
    padding: 5px 10px 0 !important;
    z-index: 0 !important;

    .pagination-wrapper {
      display: flex;
      justify-content: center;
      align-content: center;
      position: relative;
      margin-top: 0.25rem;
          
      .swiper-pagination {
          padding: 0 7px;
          border-radius: 12px;
          font-size: 0;
          transition: .25s;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

          // &:hover {
          //     background-color: rgba(0, 0, 0, 0.2509803922);
          //     backdrop-filter: blur(10px) !important;
          //     -webkit-backdrop-filter: blur(10px) !important;
          // }
      }
    }

    .link-all {
      .item {
        height: 100px;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: center;
        animation: fade;
        -webkit-animation: fade 0.5s;

        &:hover {
          transform: scale(1.02);
          background: rgb(0 0 0 / 40%);
          transition: 0.3s;
        }
        .name {
          font-size: 1.1rem;
          margin-left: 8px;
        }
        @media (min-width: 720px) and (max-width: 820px) {
          .name {
            display: none;
          }
        }
        @media (max-width: 720px) {
          height: 80px;
        }
        @media (max-width: 460px) {
          flex-direction: column;
          .name {
            font-size: 1rem;
            margin-left: 0;
            margin-top: 8px;
          }
        }
      }
    }
  }
}
</style>