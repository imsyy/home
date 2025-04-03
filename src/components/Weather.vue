<template>
  <div class="weather" v-if="weatherData.adCode.city && weatherData.weather.weather">
    <span>{{ weatherData.adCode.city }}&nbsp;</span>
    <span>{{ weatherData.weather.weather }}&nbsp;</span>
    <span>{{ weatherData.weather.temperature }}℃</span>
    <span class="sm-hidden">
      &nbsp;{{
        weatherData.weather.winddirection?.endsWith("风")
          ? weatherData.weather.winddirection
          : weatherData.weather.winddirection + "风"
      }}&nbsp;
    </span>
    <span class="sm-hidden">{{ weatherData.weather.windpower?.endsWith("级")
      ? weatherData.weather.windpower
      : weatherData.weather.windpower + "级" }}&nbsp;</span>
  </div>
  <div class="weather" v-else>
    <span>天气数据获取失败</span>
  </div>
</template>

<script setup>
import { getTXAdcode, getTXWeather, getTXAdcodeS, getTXWeatherS, getGDAdcode, getGDAdcodeI, getGDWeather, getIPV4Addr, getIPV6Addr, getOtherWeather, getHXHWeather, getXMWeather } from "@/api";
import { Error } from "@icon-park/vue-next";
import { mainStore } from "@/store";
import { Speech, stopSpeech, SpeechLocal } from "@/utils/speech";
const store = mainStore();

// 加载密钥
const txkey = import.meta.env.VITE_TX_WEATHER_KEY; // 腾讯天气密钥
const txskey = import.meta.env.VITE_TX_WEATHER_SKEY; // 选择性对腾讯天气接口加密
const gdkey = import.meta.env.VITE_GD_WEATHER_KEY; // 高德天气密钥

// 天气数据
const weatherData = reactive({
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

// 取出天气平均值
const getTemperature = (min, max) => {
  try {
    const cleanMin = parseFloat(min.toString().replace(/[^\d.-]/g, ""));
    const cleanMax = parseFloat(max.toString().replace(/[^\d.-]/g, ""));
    if (isNaN(cleanMin) || isNaN(cleanMax)) {
      throw new Error("无法解析温度数据");
    };
    const average = (cleanMin + cleanMax) / 2;
    return Math.round(average);
  } catch (error) {
    console.error("计算温度出现错误：", error);
    if (store.webSpeech) {
      stopSpeech();
      const voice = import.meta.env.VITE_TTS_Voice;
      const vstyle = import.meta.env.VITE_TTS_Style;
      SpeechLocal("天气信息无法计算.mp3");
    };
    return "NaN";
  }
};

const getTXW = async () => {
  if (!txskey) {
    console.log("正在使用腾讯天气接口");
    // 获取 Adcode
    const adCode = await getTXAdcode(txkey);
    if (String(adCode.status) !== "0") {
      if (store.webSpeech) {
        stopSpeech();
        const voice = import.meta.env.VITE_TTS_Voice;
        const vstyle = import.meta.env.VITE_TTS_Style;
        SpeechLocal("位置信息获取失败.mp3");
      };
      throw "地区查询失败";
    };
    weatherData.adCode = {
      city: adCode.result.ad_info.district || adCode.result.ad_info.city || adCode.result.ad_info.province || "未知地区",
      adcode: adCode.result.ad_info.adcode,
    };
    // 获取天气信息
    const txWeather = await getTXWeather(txkey, weatherData.adCode.adcode);
    if (String(txWeather.status) !== "0") {
      if (store.webSpeech) {
        stopSpeech();
        const voice = import.meta.env.VITE_TTS_Voice;
        const vstyle = import.meta.env.VITE_TTS_Style;
        SpeechLocal("天气加载失败.mp3");
      };
      throw "天气信息获取失败";
    };
    const realtimeData = txWeather.result.realtime?.[0];
    if (!realtimeData?.infos) {
      if (store.webSpeech) {
        stopSpeech();
        const voice = import.meta.env.VITE_TTS_Voice;
        const vstyle = import.meta.env.VITE_TTS_Style;
        SpeechLocal("天气加载失败.mp3");
      };
      throw "天气信息获取失败";
    };
    weatherData.weather = {
      weather: realtimeData.infos.weather,
      temperature: realtimeData.infos.temperature,
      winddirection: realtimeData.infos.wind_direction,
      windpower: realtimeData.infos.wind_power,
    };
  } else {
    console.log("正在使用腾讯天气接口，鉴权模式已启用");
    // 获取 Adcode
    const adCode = await getTXAdcodeS(txkey, txskey);
    if (String(adCode?.status) !== "0") {
      if (store.webSpeech) {
        stopSpeech();
        const voice = import.meta.env.VITE_TTS_Voice;
        const vstyle = import.meta.env.VITE_TTS_Style;
        SpeechLocal("位置信息获取失败.mp3");
      };
      throw "地区查询失败";
    };
    weatherData.adCode = {
      city: adCode.result.ad_info.district || adCode.result.ad_info.city || adCode.result.ad_info.province || "未知地区",
      adcode: adCode.result.ad_info.adcode,
    };
    // 获取天气信息
    const txWeather = await getTXWeatherS(txkey, weatherData.adCode.adcode, txskey);
    if (String(txWeather.status) !== "0") {
      if (store.webSpeech) {
        stopSpeech();
        const voice = import.meta.env.VITE_TTS_Voice;
        const vstyle = import.meta.env.VITE_TTS_Style;
        SpeechLocal("天气加载失败.mp3");
      };
      throw "天气信息获取失败";
    };
    const realtimeData = txWeather.result.realtime?.[0];
    if (!realtimeData?.infos) {
      if (store.webSpeech) {
        stopSpeech();
        const voice = import.meta.env.VITE_TTS_Voice;
        const vstyle = import.meta.env.VITE_TTS_Style;
        SpeechLocal("天气加载失败.mp3");
      };
      throw "天气信息获取失败";
    };
    weatherData.weather = {
      weather: realtimeData.infos.weather,
      temperature: realtimeData.infos.temperature,
      winddirection: realtimeData.infos.wind_direction,
      windpower: realtimeData.infos.wind_power,
    };
  };
};

const getGDW = async () => {
  // 获取 Adcode
  const adCode = await getGDAdcode(gdkey);
  let adCodei = null;
  if (String(adCode?.infocode) !== "10000" || String(adCode?.status) !== "1") {
    console.log("检测到高德接口 IP 获取失败，调用额外接口获取 IPV4 地址...");
    const ipV4addr = await getIPV4Addr();
    adCodei = await getGDAdcodeI(ipV4addr.ip, gdkey);
    if (String(adCodei?.infocode) !== "10000" || String(adCodei?.status) !== "1") {
      if (store.webSpeech) {
        stopSpeech();
        const voice = import.meta.env.VITE_TTS_Voice;
        const vstyle = import.meta.env.VITE_TTS_Style;
        SpeechLocal("位置信息获取失败.mp3");
      };
      throw "地区查询失败";
    };
  };
  if (!adCodei) {
    weatherData.adCode = {
      city: adCode.city || adCode.province || "未知地区",
      adcode: adCode.adcode,
    };
  } else {
    weatherData.adCode = {
      city: adCodei.city || adCodei.province || "未知地区",
      adcode: adCodei.adcode,
    };
  };
  // 获取天气信息
  const result = await getGDWeather(gdkey, weatherData.adCode.adcode);
  if (String(result?.status) !== "1" || String(result?.infocode) !== "10000") {
    if (store.webSpeech) {
      stopSpeech();
      const voice = import.meta.env.VITE_TTS_Voice;
      const vstyle = import.meta.env.VITE_TTS_Style;
      SpeechLocal("天气加载失败.mp3");
    };
    throw "天气信息获取失败";
  };
  weatherData.weather = {
    weather: result.lives[0].weather,
    temperature: result.lives[0].temperature,
    winddirection: result.lives[0].winddirection,
    windpower: result.lives[0].windpower,
  };
};

const getOW = async () => {
  const result = await getOtherWeather();
  const data = result.result;
  weatherData.adCode = {
    city: data.city.City || "未知地区",
  };
  weatherData.weather = {
    weather: data.condition.day_weather,
    temperature: getTemperature(data.condition.min_degree, data.condition.max_degree),
    winddirection: data.condition.day_wind_direction,
    windpower: data.condition.day_wind_power,
  };
};

const getHXHW = async () => {
  const result = await getHXHWeather();
  if (String(result?.success) !== "true") {
    if (store.webSpeech) {
      stopSpeech();
      const voice = import.meta.env.VITE_TTS_Voice;
      const vstyle = import.meta.env.VITE_TTS_Style;
      SpeechLocal("天气加载失败.mp3");
    };
    throw "天气信息获取失败";
  };
  weatherData.adCode = {
    city: result.city || "未知地区",
  };
  weatherData.weather = {
    weather: result.data.type || result.data.night.type,
    temperature: getTemperature(result.data.low || result.data.night.low, result.data.high || result.data.night.high),
    winddirection: result.data.fengxiang || result.data.night.fengxiang,
    windpower: result.data.fengli || result.data.night.fengli,
  };
};

const getXMW = async () => {
  // 待补（）
};

// 获取天气数据
const getWeatherData = async () => {
  try {
    // 获取地理位置信息
    if (!gdkey && !txkey) {
      console.log("未配置天气接口密钥，使用备用天气接口");
      try {
        await getHXHW();
      } catch (error) {
        await getOW();
      };
    } else if (!txkey) {
      // 调用高德天气 API
      console.log("正在使用高德天气接口");
      try {
        await getGDW();
      } catch (error) {
        console.error("高德天气接口获取失败，尝试调用备用接口");
        try {
          await getHXHW();
        } catch (error) {
          await getOW();
        };
      };
    } else {
      // 调用腾讯天气 API
      try {
        await getTXW();
      } catch (error) {
        console.error("腾讯天气接口获取失败，尝试使用高德天气接口");
        try {
          await getGDW();
        } catch (error) {
          console.error("高德天气接口获取失败，尝试调用备用接口");
          try {
            await getHXHW();
          } catch (error) {
            await getOW();
          };
        };
      };
    };
  } catch (error) {
    console.error("天气信息获取失败:" + error);
    onError("天气信息获取失败");
    if (store.webSpeech) {
      stopSpeech();
      const voice = import.meta.env.VITE_TTS_Voice;
      const vstyle = import.meta.env.VITE_TTS_Style;
      SpeechLocal("天气加载失败.mp3");
    };
  };
};

// 报错信息
const onError = (message) => {
  ElMessage({
    message,
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
