const ap = new APlayer({
    container: document.getElementById('aplayer'),
    order: 'random',
    preload: 'auto',
    listMaxHeight: '336px',
    volume: '0.5',
    mutex: true,
    lrcType: 3,
    /* 下方更改为你自己的歌单就行 */
    audio: [{
            name: "夜曲",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E5%A4%9C%E6%9B%B2.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M0000024bjiL2aocxT_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E5%A4%9C%E6%9B%B2.lrc",
            theme: "#171513"
        },
        {
            name: "断了的弦",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E6%96%AD%E4%BA%86%E7%9A%84%E5%BC%A6.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000001BGzMs369FzU_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E6%96%AD%E4%BA%86%E7%9A%84%E5%BC%A6.lrc",
            theme: "#0057a7"
        },
        {
            name: "发如雪",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E5%8F%91%E5%A6%82%E9%9B%AA.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M0000024bjiL2aocxT_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E5%8F%91%E5%A6%82%E9%9B%AA.lrc",
            theme: "#171513"
        },
        {
            name: "稻香",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E7%A8%BB%E9%A6%99.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000002Neh8l0uciQZ_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E7%A8%BB%E9%A6%99.lrc",
            theme: "#e3ae55"
        },
        {
            name: "七里香",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E4%B8%83%E9%87%8C%E9%A6%99.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000003DFRzD192KKD_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E4%B8%83%E9%87%8C%E9%A6%99.lrc",
            theme: "#395732"
        },
        {
            name: "晴天",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E6%99%B4%E5%A4%A9.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000000MkMni19ClKG_3.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E6%99%B4%E5%A4%A9.lrc",
            theme: "#08362e"
        },
        {
            name: "以父之名",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E4%BB%A5%E7%88%B6%E4%B9%8B%E5%90%8D.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000000MkMni19ClKG_3.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E4%BB%A5%E7%88%B6%E4%B9%8B%E5%90%8D.lrc",
            theme: "#08362e"
        },
        {
            name: "本草纲目",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E6%9C%AC%E8%8D%89%E7%BA%B2%E7%9B%AE.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000002jLGWe16Tf1H_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E6%9C%AC%E8%8D%89%E7%BA%B2%E7%9B%AE.lrc",
            theme: "#171513"
        },
        {
            name: "一路向北",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E4%B8%80%E8%B7%AF%E5%90%91%E5%8C%97.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000002MAeob3zLXwZ_2.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E4%B8%80%E8%B7%AF%E5%90%91%E5%8C%97.lrc",
            theme: "#383a37"
        },
        {
            name: "半岛铁盒",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E5%8D%8A%E5%B2%9B%E9%93%81%E7%9B%92.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000004MGitN0zEHpb_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E5%8D%8A%E5%B2%9B%E9%93%81%E7%9B%92.lrc",
            theme: "#f0a059"
        },
        {
            name: "简单爱",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E7%AE%80%E5%8D%95%E7%88%B1.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000000I5jJB3blWeN_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E7%AE%80%E5%8D%95%E7%88%B1.lrc",
            theme: "#c21c0f"
        },
        {
            name: "青花瓷",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E9%9D%92%E8%8A%B1%E7%93%B7.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000002eFUFm2XYZ7z_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E9%9D%92%E8%8A%B1%E7%93%B7.lrc",
            theme: "#000000"
        },
        {
            name: "烟花易冷",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E7%83%9F%E8%8A%B1%E6%98%93%E5%86%B7.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000000bviBl4FjTpO_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E7%83%9F%E8%8A%B1%E6%98%93%E5%86%B7.lrc",
            theme: "#86b5bb"
        },
        {
            name: "霍元甲",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E9%9C%8D%E5%85%83%E7%94%B2.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000000OixvE1YjIqd_3.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E9%9C%8D%E5%85%83%E7%94%B2.lrc",
            theme: "#295249"
        },
        {
            name: "兰亭序",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E5%85%B0%E4%BA%AD%E5%BA%8F.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000002Neh8l0uciQZ_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E5%85%B0%E4%BA%AD%E5%BA%8F.lrc",
            theme: "#e3ae55"
        },
        {
            name: "枫",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E6%9E%AB.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M0000024bjiL2aocxT_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E6%9E%AB.lrc",
            theme: "#171513"
        },
        {
            name: "断了的弦",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E6%96%AD%E4%BA%86%E7%9A%84%E5%BC%A6.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000001BGzMs369FzU_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E6%96%AD%E4%BA%86%E7%9A%84%E5%BC%A6.lrc",
            theme: "#0057a7"
        },
        {
            name: "天涯过客",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E5%A4%A9%E6%B6%AF%E8%BF%87%E5%AE%A2.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000001uqejs3d6EID_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E5%A4%A9%E6%B6%AF%E8%BF%87%E5%AE%A2.lrc",
            theme: "#b88e16"
        },
        {
            name: "千里之外",
            artist: "周杰伦 / 费玉清",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6%26%E8%B4%B9%E7%8E%89%E6%B8%85-%E5%8D%83%E9%87%8C%E4%B9%8B%E5%A4%96.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000002jLGWe16Tf1H_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6%26%E8%B4%B9%E7%8E%89%E6%B8%85-%E5%8D%83%E9%87%8C%E4%B9%8B%E5%A4%96.lrc",
            theme: "#171513"
        },
        {
            name: "珊瑚海",
            artist: "周杰伦 / 梁心颐",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6%26%E6%A2%81%E5%BF%83%E9%A2%90-%E7%8F%8A%E7%91%9A%E6%B5%B7.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M0000024bjiL2aocxT_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6%26%E6%A2%81%E5%BF%83%E9%A2%90-%E7%8F%8A%E7%91%9A%E6%B5%B7.lrc",
            theme: "#181714"
        },
        {
            name: "单车",
            artist: "陈奕迅",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E9%99%88%E5%A5%95%E8%BF%85-%E5%8D%95%E8%BD%A6.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000004S8YQr3UmEbG_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E9%99%88%E5%A5%95%E8%BF%85-%E5%8D%95%E8%BD%A6.lrc",
            theme: "#32201f"
        },
        {
            name: "孤勇者",
            artist: "陈奕迅",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/%E9%99%88%E5%A5%95%E8%BF%85-%E5%AD%A4%E5%8B%87%E8%80%85.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000001uaPM93kxk1R_3.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E9%99%88%E5%A5%95%E8%BF%85-%E5%AD%A4%E5%8B%87%E8%80%85.lrc",
            theme: "#131915"
        },
        {
            name: "浮夸",
            artist: "陈奕迅",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E9%99%88%E5%A5%95%E8%BF%85-%E6%B5%AE%E5%A4%B8.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000003J6fvc0bVJon_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E9%99%88%E5%A5%95%E8%BF%85-%E6%B5%AE%E5%A4%B8.lrc",
            theme: "#040402"
        },
        {
            name: "十年",
            artist: "陈奕迅",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E9%99%88%E5%A5%95%E8%BF%85-%E5%8D%81%E5%B9%B4.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000003J6fvc0bVJon_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E9%99%88%E5%A5%95%E8%BF%85-%E5%8D%81%E5%B9%B4.lrc",
            theme: "#040402"
        },
        {
            name: "一丝不挂",
            artist: "陈奕迅",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E9%99%88%E5%A5%95%E8%BF%85-%E4%B8%80%E4%B8%9D%E4%B8%8D%E6%8C%82.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000001sjRhH0wqa4Q_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E9%99%88%E5%A5%95%E8%BF%85-%E4%B8%80%E4%B8%9D%E4%B8%8D%E6%8C%82.lrc",
            theme: "#0d0d0d"
        },
        {
            name: "麻雀",
            artist: "李荣浩",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E6%9D%8E%E8%8D%A3%E6%B5%A9-%E9%BA%BB%E9%9B%80.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000003P3ByD1n8nBK_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E6%9D%8E%E8%8D%A3%E6%B5%A9-%E9%BA%BB%E9%9B%80.lrc",
            theme: "#849fbd"
        },
        {
            name: "老街",
            artist: "李荣浩",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E6%9D%8E%E8%8D%A3%E6%B5%A9-%E8%80%81%E8%A1%97.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000001LP8hk0a6pOp_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E6%9D%8E%E8%8D%A3%E6%B5%A9-%E8%80%81%E8%A1%97.lrc",
            theme: "#e0d7bb"
        },
        {
            name: "年少有为",
            artist: "李荣浩",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E6%9D%8E%E8%8D%A3%E6%B5%A9-%E5%B9%B4%E5%B0%91%E6%9C%89%E4%B8%BA.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000000RLvtE1eDyOs_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E6%9D%8E%E8%8D%A3%E6%B5%A9-%E5%B9%B4%E5%B0%91%E6%9C%89%E4%B8%BA.lrc",
            theme: "#d2ddd5"
        },
        {
            name: "爸爸妈妈",
            artist: "李荣浩",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E6%9D%8E%E8%8D%A3%E6%B5%A9-%E7%88%B8%E7%88%B8%E5%A6%88%E5%A6%88.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000001fi1zG0EjU2u_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E6%9D%8E%E8%8D%A3%E6%B5%A9-%E7%88%B8%E7%88%B8%E5%A6%88%E5%A6%88.lrc",
            theme: "#aec3ce"
        },
        {
            name: "干杯",
            artist: "五月天",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E4%BA%94%E6%9C%88%E5%A4%A9-%E5%B9%B2%E6%9D%AF.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000001fbipy4azgKM_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E4%BA%94%E6%9C%88%E5%A4%A9-%E5%B9%B2%E6%9D%AF.lrc",
            theme: "#0f1e32"
        },
        {
            name: "倔强",
            artist: "五月天",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E4%BA%94%E6%9C%88%E5%A4%A9-%E5%80%94%E5%BC%BA.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M0000006MmDz4Hl2Ud_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E4%BA%94%E6%9C%88%E5%A4%A9-%E5%80%94%E5%BC%BA.lrc",
            theme: "#b3dae1"
        },
        {
            name: "知足",
            artist: "五月天",
            url: "https://drive.imsyy.top/api/raw/?path=/音乐/文件引用/五月天-知足.mp3",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M0000020I7sO0ayXhN_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E4%BA%94%E6%9C%88%E5%A4%A9-%E7%9F%A5%E8%B6%B3.lrc",
            theme: "#0a0708"
        },
        {
            name: "如烟",
            artist: "五月天",
            url: "https://drive.imsyy.top/api/raw/?path=/音乐/文件引用/五月天-如烟.mp3",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M0000020I7sO0ayXhN_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E4%BA%94%E6%9C%88%E5%A4%A9-%E5%A6%82%E7%83%9F.lrc",
            theme: "#0a0708"
        },
        {
            name: "叹服",
            artist: "许嵩",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/%E8%AE%B8%E5%B5%A9-%E5%8F%B9%E6%9C%8D.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000002CJON012PxwU_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E8%AE%B8%E5%B5%A9-%E5%8F%B9%E6%9C%8D.lrc",
            theme: "#def3fc"
        },
        {
            name: "幻听",
            artist: "许嵩",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/%E8%AE%B8%E5%B5%A9-%E5%B9%BB%E5%90%AC.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000004RbL3b0BDIe2_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E8%AE%B8%E5%B5%A9-%E5%B9%BB%E5%90%AC.lrc",
            theme: "#bf1c21"
        },
        {
            name: "庐州月",
            artist: "许嵩",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/%E8%AE%B8%E5%B5%A9-%E5%BA%90%E5%B7%9E%E6%9C%88.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000002CJON012PxwU_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E8%AE%B8%E5%B5%A9-%E5%BA%90%E5%B7%9E%E6%9C%88.lrc",
            theme: "#def3fc"
        },
        {
            name: "断桥残雪",
            artist: "许嵩",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/%E8%AE%B8%E5%B5%A9-%E6%96%AD%E6%A1%A5%E6%AE%8B%E9%9B%AA.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000001jmC6x1RMfh0_2.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E8%AE%B8%E5%B5%A9-%E6%96%AD%E6%A1%A5%E6%AE%8B%E9%9B%AA.lrc",
            theme: "#1a1b14"
        },
        {
            name: "有何不可",
            artist: "许嵩",
            url: "https://drive.imsyy.top/api/raw/?path=/音乐/华语音乐/许嵩/许嵩%20-%20有何不可%20-%20独白版.mp3",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000002KSDg90IaScI_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E8%AE%B8%E5%B5%A9%20-%20%E6%9C%89%E4%BD%95%E4%B8%8D%E5%8F%AF%20-%20%E7%8B%AC%E7%99%BD%E7%89%88.lrc",
            theme: "#edbe76"
        },
        {
            name: "温泉",
            artist: "许嵩 / 刘美麟",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/%E8%AE%B8%E5%B5%A9%26%E5%88%98%E7%BE%8E%E9%BA%9F-%E6%B8%A9%E6%B3%89.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000000vKMVO0srdMF_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E8%AE%B8%E5%B5%A9%26%E5%88%98%E7%BE%8E%E9%BA%9F-%E6%B8%A9%E6%B3%89.lrc",
            theme: "#e3b58b"
        },
        {
            name: "素颜",
            artist: "许嵩 / 何曼婷",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/%E8%AE%B8%E5%B5%A9%26%E4%BD%95%E6%9B%BC%E5%A9%B7-%E7%B4%A0%E9%A2%9C.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M0000035f8nw11cjkf_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E8%AE%B8%E5%B5%A9%26%E4%BD%95%E6%9B%BC%E5%A9%B7-%E7%B4%A0%E9%A2%9C.lrc",
            theme: "#622931"
        },
        {
            name: "打上花火",
            artist: "米津玄师 / daoko",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/%E7%B1%B3%E6%B4%A5%E7%8E%84%E5%B8%88%26daoko-%E6%89%93%E4%B8%8A%E8%8A%B1%E7%81%AB.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000002rLPlR0CXaWS_3.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E7%B1%B3%E6%B4%A5%E7%8E%84%E5%B8%88%26daoko-%E6%89%93%E4%B8%8A%E8%8A%B1%E7%81%AB.lrc",
            theme: "#ed1306"
        },
        {
            name: "Lemon",
            artist: "米津玄师",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/%E7%B1%B3%E6%B4%A5%E7%8E%84%E5%B8%88-Lemon.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000000nPoD43Dybcc_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E7%B1%B3%E6%B4%A5%E7%8E%84%E5%B8%88-Lemon.lrc",
            theme: "#20778f"
        },
        {
            name: "LOSER",
            artist: "米津玄师",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/%E7%B1%B3%E6%B4%A5%E7%8E%84%E5%B8%88-LOSER.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000002kl9Hs4WaKFO_3.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E7%B1%B3%E6%B4%A5%E7%8E%84%E5%B8%88-LOSER.lrc",
            theme: "#13141d"
        },
        {
            name: "Numb",
            artist: "Linkin Park",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2FLinkin%20Park-Numb.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000000C4MQU17Phga_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2FLinkin%20Park-Numb.lrc",
            theme: "#0d0d0d"
        },
        {
            name: "In The End",
            artist: "Linkin Park",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2FLinkin%20Park-In%20The%20End.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000004ImTxE1OkGqR_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2FLinkin%20Park-In%20The%20End.lrc",
            theme: "#270408"
        },
        {
            name: "My Love",
            artist: "Westlife",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/Westlife-My%20Love.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000000vux3D1vZI0u_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2FWestlife-My%20Love.lrc",
            theme: "#e88ba6"
        },
        {
            name: "Victory",
            artist: "Two Steps From Hell / Thomas Bergersen",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/Two%20Steps%20From%20Hell%26Thomas%20Bergersen-Victory.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000002hKKCC1LSc8y_2.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2FTwo%20Steps%20From%20Hell%26Thomas%20Bergersen-Victory.lrc",
            theme: "#0a0c1b"
        },
        {
            name: "Star Sky",
            artist: "Two Steps From Hell / Thomas Bergersen",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/Two%20Steps%20From%20Hell%26Thomas%20Bergersen-Star%20Sky.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000002hKKCC1LSc8y_2.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2FTwo%20Steps%20From%20Hell%26Thomas%20Bergersen-Star%20Sky.lrc",
            theme: "#0a0c1b"
        },
        {
            name: "Fireflies",
            artist: "Owl City",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2FOwl%20City-Fireflies.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000002FEF7L03Cv7T_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2FOwl%20City-Fireflies.lrc",
            theme: "#33658d"
        },
        {
            name: "The Saltwater Room",
            artist: "Owl City",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2FOwl%20City-The%20Saltwater%20Room.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000002FEF7L03Cv7T_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2FOwl%20City-The%20Saltwater%20Room.lrc",
            theme: "#33658d"
        }
    ]
});

/* 底栏歌词 */
setInterval(function () {
    $("#lrc").html("<span class='lrc-show'><i class='iconfont icon-music'></i> " + $(".aplayer-lrc-current").text() + " <i class='iconfont icon-music'></i></span>");
}, 500);

/* 音乐通知及控制 */
ap.on('play', function () {
    music = $(".aplayer-title").text() + $(".aplayer-author").text();
    iziToast.info({
        timeout: 8000,
        iconUrl: './img/icon/music.png',
        displayMode: 'replace',
        message: music
    });
    $("#play").html("<i class='iconfont icon-pause'>");
    $("#music-name").html($(".aplayer-title").text() + $(".aplayer-author").text());
    if ($(document).width() >= 990) {
        $('.power').css("cssText", "display:none");
        $('#lrc').css("cssText", "display:block !important");
    }
});

ap.on('pause', function () {
    $("#play").html("<i class='iconfont icon-play'>");
    if ($(document).width() >= 990) {
        $('#lrc').css("cssText", "display:none !important");
        $('.power').css("cssText", "display:block");
    }
});

//音量调节
function changevolume() {
    var x = $("#volume").val();
    ap.volume(x, true);
    if (x == 0) {
        $("#volume-ico").html("<i class='iconfont icon-volume-x'></i>");
    } else if (x > 0 && x <= 0.3) {
        $("#volume-ico").html("<i class='iconfont icon-volume'></i>");
    } else if (x > 0.3 && x <= 0.6) {
        $("#volume-ico").html("<i class='iconfont icon-volume-1'></i>");
    } else {
        $("#volume-ico").html("<i class='iconfont icon-volume-2'></i>");
    }
}

$("#music").hover(function () {
    $('.music-text').css("display", "none");
    $('.music-volume').css("display", "flex");
}, function () {
    $('.music-text').css("display", "block");
    $('.music-volume').css("display", "none");
})

/* 一言与音乐切换 */
$('#open-music').on('click', function () {
    $('#hitokoto').css("display", "none");
    $('#music').css("display", "flex");
});

$("#hitokoto").hover(function () {
    $('#open-music').css("display", "flex");
}, function () {
    $('#open-music').css("display", "none");
})

$('#music-close').on('click', function () {
    $('#music').css("display", "none");
    $('#hitokoto').css("display", "flex");
});

/* 上下曲 */
$('#play').on('click', function () {
    ap.toggle();
    $("#music-name").html($(".aplayer-title").text() + $(".aplayer-author").text());
});

$('#last').on('click', function () {
    ap.skipBack();
    $("#music-name").html($(".aplayer-title").text() + $(".aplayer-author").text());
});

$('#next').on('click', function () {
    ap.skipForward();
    $("#music-name").html($(".aplayer-title").text() + $(".aplayer-author").text());
});

/* 打开音乐列表 */
$('#music-open').on('click', function () {
    if ($(document).width() >= 990) {
        $('#box').css("display", "block");
        $('#row').css("display", "none");
        $('#more').css("cssText", "display:none !important");
    }
});