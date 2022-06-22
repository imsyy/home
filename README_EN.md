English | [Chinese](./README.md)

<p>
<strong><h2>無名の主页</h2></strong>
Simple little homepage, had enough of the original one and made a new one
</p>

![無名の主页](https://img.imsyy.top/other/imsyy-home.webp)

>The logo font on the home page has been compressed, so if you use a font other than this logo, it will change back to the default font, Here is the [full font](https://file.imsyy.top/font/Pacifico-Regular.ttf)  

>Weather API is limited to 100 times per day, must [Apply on your own](https://www.tianqiapi.com/), or change to another api

### Demo
>Due to CDN caching, you may need `Ctrl` + `F5` to force a browser cache refresh to see the latest results

- [無名の主页](https://www.imsyy.top)

### Functions

- [x] Loading animation
- [x] Site description
- [x] Hitokoto
- [x] Date and time
- [x] Live weather
- [x] Time progress bar
- [x] Music player
- [x] Mobile adaptation
* [ ] Haven't thought about it yet

### Music

>This project uses the `Aplayer` music player based on `MetingJS` for quick song list customization  
>*Only supported in **Mainland China**, please replace `music.js` with [the following](https://file.imsyy.top/js/music/music-other.js) in other regions to enable the music player to work properly

Change the parameters of `music.js` to achieve a custom song list

```js
var server = "netease"; //netease; tencent; kugou; xiami; kuwo; 
var type = "playlist"; //song; playlist; album;
var id = "7452421335"; //album ID; song ID; playlist ID;
```

### Fonts
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

### Plugins

* [Bootstrap](https://getbootstrap.com/)
* [iziToast](https://izitoast.marcelodolza.com/)
* [Font Awesome](https://fontawesome.com/)
* [jQuery](https://jquery.com/)
* [Aplayer](https://aplayer.js.org/)

### API

* [MetingAPI By wuenci](https://api.wuenci.com/meting/api/)
* [小歪 API](https://api.ixiaowai.cn/)
* [天气 API](https://www.tianqiapi.com/)
* [Hitokoto 一言](https://hitokoto.cn/)

<a title="SSL" target="_blank" href="https://myssl.com/seal/detail?domain=blog.imsyy.top"><img src="https://img.shields.io/badge/MySSL-安全认证-brightgreen"></a>&nbsp;<a title="CDN" target="_blank" href="https://cdnjs.com/"><img src="https://img.shields.io/badge/CDN-Cloudflare-blue"></a>&nbsp;<a title="Copyright" target="_blank" href="https://imsyy.top/"><img src="https://img.shields.io/badge/Copyright%20%C2%A9%202020--2022-%E7%84%A1%E5%90%8D-red"></a>
