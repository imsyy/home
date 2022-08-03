English | [Chinese](./README.md)

<p>
<strong><h2>無名の主页</h2></strong>
Simple little homepage, had enough of the original one and made a new one
</p>

![無名の主页](https://s2.loli.net/2022/07/14/K5JigfvDoNewtuS.webp)

>The logo font on the home page has been compressed, so if you use a font other than this logo, it will change back to the default font, Here is the [full font](https://file.imsyy.top/font/Pacifico-Regular.ttf)  

### Demo

>Due to CDN caching, you may need `Ctrl` + `F5` to force a browser cache refresh to see the latest results

- [無名の主页](https://www.imsyy.top)
- [無名の主页 - 备用线路](https://home-imsyy.vercel.app/)

### Functions

- [x] Loading animation
- [x] Site description
- [x] Hitokoto
- [x] Date and time
- [x] Live weather
- [x] Time progress bar
- [x] Music player
- [x] Mobile adaptation

* [ ] Remove jQuery dependency
* [ ] VUE refactoring

### Weather

Because the original weather API is unstable, the weather API has been replaced. Now you need to go to the following website to obtain the key  

- to [ROLL] (https://www.mxnzp.com/doc/list) for app_id and app_secret, used to capture the city  

- to [and wind weather] (https://dev.qweather.com/) to obtain the key, is used to get the weather information  

It can also be replaced by other methods

<!-- ### Configuration

This project uses `json` file to configure the site content, the configuration is not affected by version updates, you can write custom configuration to `setting.json` to change the page content

<details>
<summary>Configuration instructions</summary>

```json
{
    "title": "Title of the page",
    "description": "Short description of the page",
    "keywords": "Keyword(s)",
    "author": "author of the page",
    "logo_img": "Logo image path",
    "logo_text_1": "Domain Prefix",
    "logo_text_2": "Domain_suffix",
    "des_title": [
        "Hello World !" , // site description title
        "A small site built in the 21st century, living on the edge of the Internet" // site description content
    ],
    "des_title_change": [
        "Oops !" , //text after clicking on the site's title
        "Oops, you found this ( click once more to close )" //text after click on site content
    ],
    "github": "imsyy", //Github username
    "qq": "1539250352", //QQ
    "email": "one@imsyy.top", //email email
    "telegram": "bottom_user", //Telegram user name
    "twitter": "iimmsyy", //Twitter username
    "weather_api": "https://www.yiketianqi.com", //Weather API
    "link_1": [
        "https://blog.imsyy.top/", //link_address
        "fa-solid fa-blog", //icon class name
        "blog" //link text
    ],
    "link_2": [
        "https://drive.imsyy.top/",
        "fa-solid fa-cloud",
        "netdisk"
    ],
    "wallpaper_api": [
        [
            "picture of the day", //name of wallpaper setting item
            "https://api.dujin.org/bing/1920.php" //link to wallpaper image
        ]
    ],
    "Copyright_year": "2020", //site start year
    "Copyright_text": "No name" //Copyright
}
```

</details> -->

### Music

>This project uses the `Aplayer` music player based on `MetingJS` for quick song list customization  
>*Only supported in **Mainland China**, please replace `music.js` with [the following](https://cdn.jsdelivr.net/gh/imsyy/file/js/music/music-other.js) in other regions to enable the music player to work properly

Change the parameters of `music.js` to achieve a custom song list

```js
let server = "netease"; //netease; tencent; kugou; xiami; kuwo; 
let type = "playlist"; //song; playlist; album;
let id = "7452421335"; //album ID; song ID; playlist ID;
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

### Plugins

* [Bootstrap](https://getbootstrap.com/)
* [iziToast](https://izitoast.marcelodolza.com/)
* [Font Awesome](https://fontawesome.com/)
* [jQuery](https://jquery.com/)
* [Aplayer](https://aplayer.js.org/)

### API

* [MetingAPI By wuenci](https://api.wuenci.com/meting/api/)
* [小歪 API](https://api.ixiaowai.cn/)
* [和风天气](https://dev.qweather.com/)
* [ROLL](https://www.mxnzp.com/doc/list)
* [Hitokoto 一言](https://hitokoto.cn/)

<a title="SSL" target="_blank" href="https://myssl.com/seal/detail?domain=blog.imsyy.top"><img src="https://img.shields.io/badge/MySSL-安全认证-brightgreen"></a>&nbsp;<a title="CDN" target="_blank" href="https://cdnjs.com/"><img src="https://img.shields.io/badge/CDN-Cloudflare-blue"></a>&nbsp;<a title="Copyright" target="_blank" href="https://imsyy.top/"><img src="https://img.shields.io/badge/Copyright%20%C2%A9%202020--2022-%E7%84%A1%E5%90%8D-red"></a>
