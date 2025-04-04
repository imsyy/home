English | [Chinese](./README.md)
<!-- test -->
> [!IMPORTANT]
> ## 致大家
> This project was originally just a simple homepage. However, as more and more friends discovered this project, it received a lot of undue attention. Moreover, as a work of a beginner in front-end development, its code is quite messy and of low quality. In addition, this project has also been resold by many unknown resource or download sites, causing many unsuspecting buyers to find my contact information from the source code to consult on problems or request features. But due to current personal life reasons, and I have never gained any benefits from this project, so I am unable to maintain this project. This repository will not be archived. We will actively accept PRs from all the experts, but no updates will be made for any new features or bugs. Please understand!

<p>
<strong><h2>Homepage</h2></strong>
Simple little homepage, had enough of the original one and made a new one
</p>

![無名の主页](https://s2.loli.net/2022/07/14/K5JigfvDoNewtuS.webp)

>The logo font on the home page has been compressed, so if you use a font other than this logo, it will change back to the default font, Here is the [full font](https://file.4everland.app/font/Other/Pacifico-Regular.ttf)  

### Demo

>Due to CDN caching, you may need `Ctrl` + `F5` to force a browser cache refresh to see the latest results

- [無名の主页](https://www.imsyy.top)
- [無名の主页 - Dev](https://home-imsyy.vercel.app)
- [無名の主页 - Standby](https://home-5iw.pages.dev)

### Functions

- [x] Loading animation
- [x] Site description
- [x] Hitokoto
- [x] Date and time
- [x] Live weather
- [x] Time progress bar
- [x] Music player
- [x] Mobile adaptation

* [ ] Player cancels using Aplayer

### Deployment

* **Installation** [node.js](https://nodejs.org/zh-cn/) **Environment**

  > node > 16.16.0  
  > npm > 8.15.0
  
* Then run the `cmd` terminal with **administrator privileges** and `cd` to the project root directory
* In the `terminal` type:

```bash
# Install pnpm
npm install -g pnpm

# Install the dependencies
pnpm install

# Preview
pnpm dev

# Build
pnpm build
```

> Once the build is complete, the files in the `dist` folder can be uploaded to the server or imported and automatically deployed with one click using a hosting platform such as `Vercel`.

### Weather

Weather and area access requires `高德开放平台` related API

- Go to [高德开放平台控制台](https://console.amap.com/dev/index) to create a `Key` of type `Web Service` and fill the `Key` into `VITE_WEATHER_KEY` in `.env` 

It can also be replaced by other methods

### Music

>This project uses the `Aplayer` music player based on `MetingJS` for quick song list customization  
>*Only supported in **Mainland China**

Please change the song related parameters in the `.env` file to customize the song list

```bash
# Songs API address
VITE_SONG_API = "https://api-meting.imsyy.top"
# Song server ( netease-netease, tencent-qq music )
VITE_SONG_SERVER = "netease"
# Playback type ( song-song, playlist-playlist, album-album, search-search, artist-artist )
VITE_SONG_TYPE = "playlist"
# Playback ID
VITE_SONG_ID = "7452421335"
```

### Fonts

Now using `HarmonyOS Sans` open source font, using font splitting to improve loading speed

>Because this site's `CDN` has opened anti-leech, **non-site domain name is not accessible**, please change the font import link to the following content, otherwise **custom fonts will be invalid**
>
>`https://cdn.jsdelivr.net/gh/imsyy/file/font/HarmonyOS_Sans/regular.min.css`

<details>
<summary>old way</summary>

>As Chinese fonts are introduced in this project, Chinese fonts need to be compressed to improve the loading speed of the page (you can also cancel the use of Chinese fonts)

#### Chinese font removal traditional

- Install `Python 3.7` and `pip`
- Run `pip install fonttools`
- Download [sc_unicode.txt](https://gist.githubusercontent.com/imaegoo/d64e5088b723c2e02c40985f55ff12db/raw/5ebd2ce49418c73459a9dfe050483409306a6c1d/sc_unicode.txt)
- Run `pyftsubset font-name.ttf --unicodes-file=sc_unicode.txt`

#### fonts further compressed

- Compile and install ``Google woff2``

```bash
sudo apt-get install -y git g++ make
git clone --recursive https://github.com/google/woff2.git
cd woff2
make clean all
```

- Compress the font again

```
. /woff2_compress . /font_name.ttf
```

- Eventually the original font can be slow loaded, **load the compressed font first**

>For more information, please go to [虹墨空间站](https://www.imaegoo.com/2020/chinese-font-compress/) to view the original article

</details>

### Technology Stack

* [Vue](https://cn.vuejs.org/)
* [Vite](https://vitejs.cn/vite3-cn/)
* [Pinia](https://pinia.vuejs.org/zh/)
* [IconPark](https://iconpark.oceanengine.com/official)
* [xicons](https://xicons.org/)
* [Aplayer](https://aplayer.js.org/)

### API

* [韩小韩 WebAPI 接口](https://api.vvhan.com/)
* [搏天 API](https://api.btstu.cn/doc/sjbz.php)
* [高德开放平台](https://lbs.amap.com/)
* [Hitokoto 一言](https://hitokoto.cn/)

<a title="SSL" target="_blank" href="https://myssl.com/seal/detail?domain=blog.imsyy.top"><img src="https://img.shields.io/badge/MySSL-安全认证-brightgreen"></a>&nbsp;<a title="CDN" target="_blank" href="https://cdnjs.com/"><img src="https://img.shields.io/badge/CDN-Cloudflare-blue"></a>&nbsp;<a title="Copyright" target="_blank" href="https://imsyy.top/"><img src="https://img.shields.io/badge/Copyright%20%C2%A9%202020--2023-%E7%84%A1%E5%90%8D-red"></a>
