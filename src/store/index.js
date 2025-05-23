import { defineStore } from "pinia";

export const mainStore = defineStore("main", {
  state: () => ({
    imgLoadStatus: false, // 壁纸加载状态
    innerWidth: null, // 当前窗口宽度
    coverType: "0", // 壁纸种类
    seasonalEffects: true, // 季节特效
    siteStartShow: true, // 建站日期显示
    musicClick: true, // 音乐链接是否跳转
    musicIsOk: false, // 音乐是否加载完成
    musicVolume: 0.7, // 音乐音量;
    musicOpenState: false, // 音乐面板开启状态
    backgroundShow: false, // 壁纸展示状态
    boxOpenState: false, // 盒子开启状态
    mobileOpenState: false, // 移动端开启状态
    mobileFuncState: false, // 移动端功能区开启状态
    setOpenState: false, // 设置页面开启状态
    setV: false, // 不知道
    playerState: false, // 当前播放状态
    playerCanplay: false, // 当前音乐是否完成加载
    playerTitle: null, // 当前播放歌曲名
    playerArtist: null, // 当前播放歌手名
    playerAlbum: null, // 当前播放专辑名
    playerLrc: [[true, "歌词加载中"]], // 当前播放歌词
    playerLrcShow: true, // 是否显示底栏歌词
    footerBlur: true, // 底栏模糊
    footerProgressBar: true, // 是否显示底栏进度条
    playerAutoplay: true, // 是否自动播放
    playerLoop: "all", // 循环播放 "all", "one", "none"
    playerOrder: "random", // 循环顺序 "list", "random"
    webSpeech: true, // 网页语音交互总开关（包含播报歌名功能）
    playerSpeechName: true, // 播报歌名
    playerYrcShow: true, // 逐字歌词解析总开关
    playerYrcShowPro: true, // 逐字效果增强开关
    playerYrcATDB: true, // 允许接入 AMLL TTML Database
    playerYrcATDBF: false, // 接入 AMLL TTML Database 时使用镜像加速
    playerCurrentTime: null, // 当前歌曲已播放时间
    playerDuration: null, // 当前歌曲总时长
    yrcIndex: -1, // 逐字歌词进度存储
    yrcTemp: [], // 逐字歌词缓存
    yrcEnable: true,
    yrcLoading: false,
  }),
  getters: {
    // 获取歌词
    getPlayerLrc(state) {
      return state.playerLrc;
    },
    // 获取歌曲信息
    getPlayerData(state) {
      return {
        name: state.playerTitle,
        artist: state.playerArtist,
        album: state.playerAlbum,
      };
    },
    // 获取页面宽度
    getInnerWidth(state) {
      return state.innerWidth;
    },
  },
  actions: {
    // 更改当前页面宽度
    setInnerWidth(value) {
      this.innerWidth = value;
      if (value >= 720) {
        this.mobileOpenState = false;
        this.mobileFuncState = false;
      }
    },
    // 更改播放状态
    setPlayerState(value) {
      if (value) {
        this.playerState = false;
      } else {
        this.playerState = true;
      }
    },
    // 更改音乐加载状态
    setPlayerCanplay(value) {
      this.playerCanplay = value;
    },
    // 更改歌词
    setPlayerLrc(value) {
      this.playerLrc = value;
    },
    // 更改歌曲数据
    setPlayerData(title, artist) {
      this.playerTitle = title;
      this.playerArtist = artist;
    },
    // 更改壁纸加载状态
    setImgLoadStatus(value) {
      this.imgLoadStatus = value;
    },
  },
  persist: [
    // 未存在这里的变量，刷新页面就会恢复默认值，主要用于状态
    {
      storage: localStorage,
      pick: [
        // 持久性存储，这里的变量永久存储于浏览器，用于存储用户的自定义设置
        'coverType',
        'musicVolume',
        'siteStartShow',
        'musicClick',
        'playerLrcShow',
        'footerBlur',
        'footerProgressBar',
        'playerAutoplay',
        'playerLoop',
        'playerOrder',
        'webSpeech',
        'playerSpeechName',
        'playerYrcShow',
        'playerYrcShowPro',
        'playerYrcATDB',
        'playerYrcATDBF',
        'seasonalEffects',
      ],
    },
    {
      storage: sessionStorage,
      pick: [
        // 会话性存储，这里的变量在重新打开页面时恢复默认值，多个窗口不互通，用于存储一些特殊的仅本次生效的设置
        'setV',
      ],
    },
  ],
});
