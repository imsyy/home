// import axios from "axios";
import fetchJsonp from "fetch-jsonp";

const memCache = new Map();
const pending = new Map();
const CACHE_TTL = Number(import.meta.env.VITE_PLAYER_CACHE_TTL || 21600000);
const cacheKey = (server, type, id) => `${server}:${type}:${id}`;
const readCache = (key) => {
  const v = memCache.get(key);
  if (v) return v;
  try {
    const raw = localStorage.getItem(`player_cache:${key}`);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    if (!obj || !obj.ts || !obj.data) return null;
    if (Date.now() - obj.ts > CACHE_TTL) return null;
    memCache.set(key, obj.data);
    return obj.data;
  } catch {
    return null;
  }
};
const writeCache = (key, data) => {
  memCache.set(key, data);
  try {
    localStorage.setItem(
      `player_cache:${key}`,
      JSON.stringify({ ts: Date.now(), data }),
    );
  } catch {
    void 0;
  }
};

/**
 * 音乐播放器
 */

// 获取音乐播放列表
export const getPlayerList = async (server, type, id) => {
  const key = cacheKey(server, type, id);
  const cached = readCache(key);
  if (cached) return cached;
  if (pending.has(key)) return pending.get(key);

  const p = (async () => {
    const res = await fetch(
      `${import.meta.env.VITE_SONG_API}?server=${server}&type=${type}&id=${id}`,
    );
    const data = await res.json();

    let normalized;
    if (data[0].url.startsWith("@")) {
      const url = data[0].url.split("@").slice(1)[3];
      const jsonpData = await fetchJsonp(url).then((res) => res.json());
      const domain = (
        jsonpData.req_0.data.sip.find((i) => !i.startsWith("http://ws")) ||
        jsonpData.req_0.data.sip[0]
      ).replace("http://", "https://");
      normalized = data.map((v, i) => ({
        name: v.name || v.title,
        artist: v.artist || v.author,
        url: domain + jsonpData.req_0.data.midurlinfo[i].purl,
        cover: v.cover || v.pic,
        lrc: v.lrc,
      }));
    } else {
      normalized = data.map((v) => ({
        name: v.name || v.title,
        artist: v.artist || v.author,
        url: v.url,
        cover: v.cover || v.pic,
        lrc: v.lrc,
      }));
    }
    writeCache(key, normalized);
    return normalized;
  })();

  pending.set(key, p);
  try {
    const result = await p;
    return result;
  } finally {
    pending.delete(key);
  }
};

export const preloadPlayerList = async (server, type, id) => {
  try {
    await getPlayerList(server, type, id);
  } catch {
    void 0;
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

// 获取高德地理位置信息
export const getAdcode = async (key) => {
  const res = await fetch(`https://restapi.amap.com/v3/ip?key=${key}`);
  return await res.json();
};

// 获取高德地理天气信息
export const getWeather = async (key, city) => {
  const res = await fetch(
    `https://restapi.amap.com/v3/weather/weatherInfo?key=${key}&city=${city}`,
  );
  return await res.json();
};

// 获取教书先生天气 API
// https://api.oioweb.cn/doc/weather/GetWeather
export const getOtherWeather = async () => {
  const res = await fetch("https://api.oioweb.cn/api/weather/GetWeather");
  return await res.json();
};
