// import axios from "axios";
import fetchJsonp from "fetch-jsonp";
import { gwg } from "@/utils/authServer";

/**
 * JSONP 请求模块
 */
// JSONP 请求函数，并返回 JSON 【关于为什么要有这个呢...请腾讯自觉扫一下（x）】
const loadJSONP = (url, callbackName) => {
  return new Promise((resolve, reject) => {
    // 定义 JSONP 回调函数
    window[callbackName] = (data) => {
      resolve(data); // 解析 JSON 数据
      delete window[callbackName]; // 清理全局变量，防止污染
    };
    // 创建 script 标签
    const script = document.createElement('script');
    script.src = url;
    script.onerror = () => {
      reject(new Error('JSONP 请求失败'));
      delete window[callbackName]; // 出错时也要清理
    };
    document.body.appendChild(script);
  });
};

/**
 * 音乐播放器
 */

// 获取音乐播放列表
export const getPlayerList = async (server, type, id, yrc) => {
  const res = await fetch(
    `${import.meta.env.VITE_SONG_API}?server=${server}&type=${type}&id=${id}`,
  );
  const data = await res.json();

  if (data[0].url.startsWith("@")) {
    // eslint-disable-next-line no-unused-vars
    const [handle, jsonpCallback, jsonpCallbackFunction, url] = data[0].url.split("@").slice(1);
    const jsonpData = await fetchJsonp(url).then((res) => res.json());
    const domain = (
      jsonpData.req_0.data.sip.find((i) => !i.startsWith("http://ws")) ||
      jsonpData.req_0.data.sip[0]
    ).replace("http://", "https://");

    return data.map((v, i) => ({
      name: v.name || v.title,
      artist: v.artist || v.author,
      url: domain + jsonpData.req_0.data.midurlinfo[i].purl,
      cover: v.cover || v.pic,
      lrc: v.lrc,
    }));
  } else {
    return data.map((v) => ({
      name: v.name || v.title,
      artist: v.artist || v.author,
      url: v.url,
      cover: v.cover || v.pic,
      lrc: v.lrc,
    }));
  }
};

/**
 * 一言
 */

// 获取一言数据
export const getHitokoto = async () => {
  const res = await fetch("https://v1.hitokoto.cn");
  return await res.json();
};

/**
 * 天气
 */
// 获取腾讯地理位置信息（JSONP 方式）
export const getTXAdcode = async (key) => {
  const callback = `jsonpCallback_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
  const url = `https://apis.map.qq.com/ws/location/v1/ip?key=${key}&output=jsonp&callback=${callback}`;
  return await loadJSONP(url, callback);
};

// 获取腾讯地理天气信息（JSONP 方式）
export const getTXWeather = async (key, adcode) => {
  const callback = `jsonpCallback_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
  const url = `https://apis.map.qq.com/ws/weather/v1/?key=${key}&adcode=${adcode}&type=now&output=jsonp&callback=${callback}`;
  return await loadJSONP(url, callback);
};

// 获取腾讯地理位置信息（鉴权模式 JSONP 方式）
export const getTXAdcodeS = async (key, skey) => {
  const callback = `jsonpCallback_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
  const url = `https://apis.map.qq.com/ws/location/v1/ip?key=${key}&output=jsonp&callback=${callback}`;
  const urls = await gwg(url, skey);
  return await loadJSONP(urls, callback);
};

// 获取腾讯地理天气信息（鉴权模式 JSONP 方式）
export const getTXWeatherS = async (key, adcode, skey) => {
  const callback = `jsonpCallback_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
  const url = `https://apis.map.qq.com/ws/weather/v1/?key=${key}&adcode=${adcode}&type=now&output=jsonp&callback=${callback}`;
  const urls = await gwg(url, skey);
  return await loadJSONP(urls, callback);
};


// 获取高德地理位置信息
export const getGDAdcode = async (key) => {
  const res = await fetch(`https://restapi.amap.com/v3/ip?key=${key}`);
  return await res.json();
};

// 获取高德地理位置信息（带IP）
export const getGDAdcodeI = async (ipv4, key) => {
  const res = await fetch(`https://restapi.amap.com/v3/ip?ip=${ipv4}&key=${key}`);
  return await res.json();
};

// 获取高德地理天气信息
export const getGDWeather = async (key, city) => {
  const res = await fetch(`https://restapi.amap.com/v3/weather/weatherInfo?key=${key}&city=${city}`);
  return await res.json();
};

// 补充的获取 IPV4 地址的 API
export const getIPV4Addr = async () => {
  const res = await fetch(`https://api4.ipify.org?format=json`);
  return await res.json();
};

// 补充的获取 IPV6 地址的 API
export const getIPV6Addr = async () => {
  const res = await fetch(`https://api6.ipify.org?format=json`);
  return await res.json();
};

// 免 KEY 区域
// 强烈建议自己注册腾讯或高德的 API
// 获取韩小韩天气 API
export const getHXHWeather = async () => {
  const res = await fetch("https://api.vvhan.com/api/weather");
  return await res.json();
};

// 获取教书先生天气 API
// https://api.oioweb.cn/doc/weather/GetWeather
export const getOtherWeather = async () => {
  const res = await fetch("https://api.oioweb.cn/api/weather/GetWeather");
  return await res.json();
};

// 获取小米天气 API
// 这个接口或许会比上面两个稳的多，但是它需要自己定位并转换 Adcode ...
export const getXMWeather = async () => {
  const res = await fetch(`https://weatherapi.market.xiaomi.com/wtr-v3/weather/all?latitude=0&longitude=0&isLocated=true&locationKey=weathercn%3A${city}&days=2&appKey=weather20151024&sign=zUFJoAR2ZVrDy1vF3D07&locale=zh_cn&alpha=false&isGlobal=false`);
  return await res.json();
};
