<template>
  <div
    class="weather"
    v-if="weatherData.adCode.city && weatherData.weather.weather"
  >
    <span>{{ weatherData.adCode.city }}&nbsp;</span>
    <span>{{ weatherData.weather.weather }}&nbsp;</span>
    <span>{{ weatherData.weather.temperature }}℃</span>
    <span class="sm-hidden">&nbsp;{{ weatherData.weather.winddirection }}风&nbsp;</span>
    <span class="sm-hidden">{{ weatherData.weather.windpower }}&nbsp;级</span>
  </div>
  <div class="weather" v-else>
    <span>天气数据获取失败</span>
  </div>
</template>

<script setup>
import { onMounted, reactive, h } from "vue";
import { getAdcode, getWeather } from "@/api";
import { Error } from "@icon-park/vue-next";

// 高德开发者 Key
let mainKey = import.meta.env.VITE_WEATHER_KEY;

// 天气数据
let weatherData = reactive({
  adCode: {
    city: null, // 城市
    adcode: null, // 城市编码
  },
  weather: {
    weather: null, // 天气现象
    temperature: null, // 实时气温
    winddirection: null, // 风向描述
    windpower: null, // 风力级别
  },
});

// 获取天气数据
const getWeatherData = () => {
  // 获取地理位置信息
  if (!mainKey) return onError("请配置天气 Key");
  getAdcode(mainKey)
    .then((res) => {
      if (res.status) {
        weatherData.adCode = {
          city: res.city,
          adcode: res.adcode,
        };
        // 获取天气信息
        getWeather(mainKey, weatherData.adCode.adcode)
          .then((res) => {
            if (res.status) {
              weatherData.weather = {
                weather: res.lives[0].weather,
                temperature: res.lives[0].temperature,
                winddirection: res.lives[0].winddirection,
                windpower: res.lives[0].windpower,
              };
            } else {
              onError("天气信息获取失败");
            }
          })
          .catch(() => {
            onError("天气信息获取失败");
          });
      } else {
        onError("地理位置获取失败");
      }
    })
    .catch(() => {
      onError("地理位置获取失败");
    });
};

// 报错信息
const onError = (message) => {
  ElMessage({
    message: message,
    icon: h(Error, {
      theme: "filled",
      fill: "#efefef",
    }),
  });
  console.error(message);
};

onMounted(() => {
  // 调用获取天气
  getWeatherData();
});
</script>