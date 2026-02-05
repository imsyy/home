简体中文 | [English](./README_EN.md)

> [!IMPORTANT]
> ## 致大家
> 此项目最初只是一个简单的主页。然而，随着越来越多的小伙伴发现了这个项目，它受到了大量本不应有的关注。而且，此项目作为初学前端的作品，其代码相当杂乱且质量低下。此外，该项目还遭到众多不明资源站或下载站的倒卖，致使许多不明真相的购买者从源代码中找到本人的联系方式进行问题咨询或提出功能需求。由于目前个人原因，该仓库进行存档，敬请谅解！

<p>
<strong><h2>無名の主页</h2></strong>
简单的小主页，原来的看够了，重新弄了一个
</p>

![無名の主页](/screenshots/main.jpg)

> 主页的 Logo 字体已经过压缩，若用本站 Logo 以外的字母会变回默认字体，这里是 [完整字体](https://file.imsyy.top/font/Other/Pacifico-Regular.ttf)，若无法下载，可将字体目录下的 `Pacifico-Regular-all.ttf` 进行替换

### 👀 Demo

> 由于 CDN 缓存原因，查看最新效果可能需要 `Ctrl` + `F5` 强制刷新浏览器缓存

- [無名の主页](https://www.imsyy.top)
- [無名の主页 - Dev](https://home-imsyy.vercel.app)
- [無名の主页 - 备用线路](https://home-5iw.pages.dev)

### 🎉 功能

- [x] 载入动画
- [x] 站点简介
- [x] Hitokoto 一言
- [x] 日期及时间
- [x] 实时天气
- [x] 时光进度条
- [x] 音乐播放器
- [x] 移动端适配

### ⚙️ 自动部署

如果遇到构建环境或者打包过程出现错误，则可以采用 `Github Actions` 来进行自动构建

- 在成功 `fork` 仓库后，前往 `Actions` 页面，若您是首次开启，则会出现下面的提示，点击开启

  ![步骤1](/screenshots/step1.jpg)

- 然后在仓库中进行任意修改后均会触发工作流的运行，在工作流完成后，会在下方生成一个可供下载的压缩包，这就是构建出的静态文件，可自行上传至服务器

  ![步骤2](/screenshots/step2.jpg)

### ⚙️ 手动部署

- **安装** [node.js](https://nodejs.org/zh-cn/) **环境**

  > node > 16.16.0  
  > npm > 8.15.0

- 然后以 **管理员权限** 运行 `cmd` 终端，并 `cd` 到 项目根目录
- 在 `终端` 中输入：

```bash
# 安装 pnpm
npm install -g pnpm

# 安装依赖
pnpm install

# 预览
pnpm dev

# 构建
pnpm build
```

> 构建完成后，静态资源会在 **`dist` 目录** 中生成，可将 **`dist` 文件夹下的文件**上传至服务器，也可使用 `Vercel` 等托管平台一键导入并自动部署

### ⚙️ Docker 部署

> 安装及配置 Docker 将不在此处说明，请自行解决

```bash
# 构建
docker build -t home .
# 运行
docker run -p 12445:12445 -d home
```

### ⚙️ Vercel 部署

> 其他部署平台大致相同，在此不做说明

1. 点击本仓库右上角的 `Fork`，复制本仓库到你的 `GitHub` 账号
2. 复制 `/.env.example` 文件并重命名为 `/.env`（ 重要 ）
3. 按需修改 `/.env` 文件中的配置
4. 点击 `Deploy`，即可成功部署

### 网站链接

在 `src/assets/siteLinks.json` 中可以自定义网站链接（以指向自己的网站）:

```json
{
  "icon": "Blog",
  "name": "博客",
  "link": "https://blog.imsyy.top/"
},
```

其中 `icon` 网站链接的图标可以在 `src/components/Links/index.vue` 中添加:

```js
// 可前往 https://www.xicons.org 自行挑选并在此处引入
// 此处引入的是 fa 类型
import {
  Link,
  Blog,
  CompactDisc,
  Cloud,
  Compass,
  Book,
  Fire,
  LaptopCode,
} from "@vicons/fa";

...

// 网站链接图标
const siteIcon = {
  Blog,
  Cloud,
  CompactDisc,
  Compass,
  Book,
  Fire,
  LaptopCode,
};
```

### 社交链接

在 `src/assets/socialLinks.json` 中可以自定义社交链接。

### 天气

天气及地区获取需要 `高德开放平台` 相关 API

- 前往 [高德开放平台控制台](https://console.amap.com/dev/index) 创建一个 `Web 服务` 类型的 `Key`，并将 `Key` 填入 `.env` 中的 `VITE_WEATHER_KEY` 中

也可自行更换其他方式

### 音乐

> 本项目采用了基于 `MetingJS` 的 `Aplayer` 音乐播放器，可实现快速自定义歌单  
> \*仅支持 **中国大陆地区**

请在 `.env` 文件中更改歌曲相关参数即可实现自定义歌单列表

```bash
# 歌曲 API 地址
VITE_SONG_API = "https://api-meting.imsyy.top"
# 歌曲服务器 ( netease-网易云, tencent-qq音乐 )
VITE_SONG_SERVER = "netease"
# 播放类型 ( song-歌曲, playlist-播放列表, album-专辑, search-搜索, artist-艺术家 )
VITE_SONG_TYPE = "playlist"
# 播放 ID
VITE_SONG_ID = "7452421335"
```

### 字体

现采用 `HarmonyOS Sans` 开源字体，采用字体拆分，提升加载速度

> 由于本站 `CDN` 已开启防盗链，**非本站域名不可访问**，请将字体引入链接更改为下方内容，否则 **自定义字体将失效**
>
> `https://s1.hdslb.com/bfs/static/jinkela/long/font/regular.css`

<details>
<summary>旧版方式</summary>

> 由于本项目引入了中文字体，需要压缩中文字体以提高网页加载速度（ 也可以取消使用中文字体 ）

#### 中文字体去除繁体

- 安装 `Python 3.7` 和 `pip`
- 运行 `pip install fonttools`
- 下载 [sc_unicode.txt](https://gist.githubusercontent.com/imaegoo/d64e5088b723c2e02c40985f55ff12db/raw/5ebd2ce49418c73459a9dfe050483409306a6c1d/sc_unicode.txt)
- 运行 `pyftsubset 字体名称.ttf --unicodes-file=sc_unicode.txt`

#### 字体进一步压缩

- 编译安装 `Google woff2`

```bash
sudo apt-get install -y git g++ make
git clone --recursive https://github.com/google/woff2.git
cd woff2
make clean all
```

- 再压缩字体

```
./woff2_compress ./字体名称.ttf
```

- 最终可对原字体进行缓加载，**先行加载压缩后的字体**

> 详细信息可前往 [虹墨空间站](https://www.imaegoo.com/2020/chinese-font-compress/) 查看原文

</details>

### 网站图标及网站背景

#### 网站背景

可以在 `public/images` 中修改网站背景

如果想要添加更多的本地图片作为网站背景，可以将图片重命名 `background+数字` 的形式，并在 `src/components/Background/index.vue` 中进行修改：

```js
if (type == 0) {
  // 修改此处 Math.random() 后面的第一个数字为图片的数量
  bgUrl.value = `/images/background${Math.floor(Math.random() * 10 + 1)}.webp`;
}
```

#### 网站图标

可以在 `public/images/icon` 中修改网站图标。

### 技术栈

- [Vue](https://cn.vuejs.org/)
- [Vite](https://vitejs.cn/vite3-cn/)
- [Pinia](https://pinia.vuejs.org/zh/)
- [IconPark](https://iconpark.oceanengine.com/official)
- [xicons](https://xicons.org/)
- [Aplayer](https://aplayer.js.org/)

### API

- [韩小韩 WebAPI 接口](https://api.vvhan.com/)
- [搏天 API](https://api.btstu.cn/doc/sjbz.php)
- [教书先生 API](https://api.oioweb.cn/doc/weather/GetWeather)
- [高德开放平台](https://lbs.amap.com/)
- [Hitokoto 一言](https://hitokoto.cn/)

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=imsyy/home&type=Date)](https://star-history.com/#imsyy/home&Date)

<a title="SSL" target="_blank" href="https://myssl.com/seal/detail?domain=blog.imsyy.top"><img src="https://img.shields.io/badge/MySSL-安全认证-brightgreen"></a>&nbsp;<a title="CDN" target="_blank" href="https://cdnjs.com/"><img src="https://img.shields.io/badge/CDN-Cloudflare-blue"></a>&nbsp;<a title="Copyright" target="_blank" href="https://imsyy.top/"><img src="https://img.shields.io/badge/Copyright%20%C2%A9%202020--2023-%E7%84%A1%E5%90%8D-red"></a>
