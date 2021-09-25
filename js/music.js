function aplayer() {
    const ap = new APlayer({
        container: document.getElementById('aplayer'),
        order: 'random',
        preload: 'auto',
        volume: 0.5,
        mutex: true,
        listFolded: true,        lrcType: 3,
        audio: [{
                name: 'Mojito',
                artist: '周杰伦',
                url: 'https://file.imsyy.top/music/songs/%E5%91%A8%E6%9D%B0%E4%BC%A6-Mojito.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M0000009C3rp3Kfwg0_3.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/%E5%91%A8%E6%9D%B0%E4%BC%A6-Mojito.lrc',
                theme: '#3fbce8'
            },
            {
                name: '夜曲',
                artist: '周杰伦',
                url: 'https://file.imsyy.top/music/songs/%E5%91%A8%E6%9D%B0%E4%BC%A6-%E5%A4%9C%E6%9B%B2.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M0000024bjiL2aocxT_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/%E5%91%A8%E6%9D%B0%E4%BC%A6-%E5%A4%9C%E6%9B%B2.lrc',
                theme: '#171513'
            },
            {
                name: '发如雪',
                artist: '周杰伦',
                url: 'https://file.imsyy.top/music/songs/%E5%91%A8%E6%9D%B0%E4%BC%A6-%E5%8F%91%E5%A6%82%E9%9B%AA.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M0000024bjiL2aocxT_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/%E5%91%A8%E6%9D%B0%E4%BC%A6-%E5%8F%91%E5%A6%82%E9%9B%AA.lrc',
                theme: '#171513'
            },
            {
                name: '稻香',
                artist: '周杰伦',
                url: 'https://file.imsyy.top/music/songs/%E5%91%A8%E6%9D%B0%E4%BC%A6-%E7%A8%BB%E9%A6%99.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002Neh8l0uciQZ_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/%E5%91%A8%E6%9D%B0%E4%BC%A6-%E7%A8%BB%E9%A6%99.lrc',
                theme: '#e3ae55'
            },
            {
                name: '七里香',
                artist: '周杰伦',
                url: 'https://file.imsyy.top/music/songs/%E5%91%A8%E6%9D%B0%E4%BC%A6-%E4%B8%83%E9%87%8C%E9%A6%99.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000003DFRzD192KKD_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/%E5%91%A8%E6%9D%B0%E4%BC%A6-%E4%B8%83%E9%87%8C%E9%A6%99.lrc',
                theme: '#395732'
            },
            {
                name: '晴天',
                artist: '周杰伦',
                url: 'https://file.imsyy.top/music/songs/%E5%91%A8%E6%9D%B0%E4%BC%A6-%E6%99%B4%E5%A4%A9.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000MkMni19ClKG_3.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/%E5%91%A8%E6%9D%B0%E4%BC%A6-%E6%99%B4%E5%A4%A9.lrc',
                theme: '#08362e'
            },
            {
                name: '以父之名',
                artist: '周杰伦',
                url: 'https://file.imsyy.top/music/songs/%E5%91%A8%E6%9D%B0%E4%BC%A6-%E4%BB%A5%E7%88%B6%E4%B9%8B%E5%90%8D.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000MkMni19ClKG_3.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/%E5%91%A8%E6%9D%B0%E4%BC%A6-%E4%BB%A5%E7%88%B6%E4%B9%8B%E5%90%8D.lrc',
                theme: '#08362e'
            },
            {
                name: '本草纲目',
                artist: '周杰伦',
                url: 'https://file.imsyy.top/music/songs/%E5%91%A8%E6%9D%B0%E4%BC%A6-%E6%9C%AC%E8%8D%89%E7%BA%B2%E7%9B%AE.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002jLGWe16Tf1H_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/%E5%91%A8%E6%9D%B0%E4%BC%A6-%E6%9C%AC%E8%8D%89%E7%BA%B2%E7%9B%AE.lrc',
                theme: '#171513'
            },
            {
                name: '简单爱',
                artist: '周杰伦',
                url: 'https://file.imsyy.top/music/songs/%E5%91%A8%E6%9D%B0%E4%BC%A6-%E7%AE%80%E5%8D%95%E7%88%B1.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000I5jJB3blWeN_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/%E5%91%A8%E6%9D%B0%E4%BC%A6-%E7%AE%80%E5%8D%95%E7%88%B1.lrc',
                theme: '#c21c0f'
            },
            {
                name: '青花瓷',
                artist: '周杰伦',
                url: 'https://file.imsyy.top/music/songs/%E5%91%A8%E6%9D%B0%E4%BC%A6-%E9%9D%92%E8%8A%B1%E7%93%B7.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002eFUFm2XYZ7z_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/%E5%91%A8%E6%9D%B0%E4%BC%A6-%E9%9D%92%E8%8A%B1%E7%93%B7.lrc',
                theme: '#000000'
            },
            {
                name: '烟花易冷',
                artist: '周杰伦',
                url: 'https://file.imsyy.top/music/songs/%E5%91%A8%E6%9D%B0%E4%BC%A6-%E7%83%9F%E8%8A%B1%E6%98%93%E5%86%B7.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000bviBl4FjTpO_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/%E5%91%A8%E6%9D%B0%E4%BC%A6-%E7%83%9F%E8%8A%B1%E6%98%93%E5%86%B7.lrc',
                theme: '#86b5bb'
            },
            {
                name: '给我一首歌的时间',
                artist: '周杰伦',
                url: 'https://file.imsyy.top/music/songs/%E5%91%A8%E6%9D%B0%E4%BC%A6-%E7%BB%99%E6%88%91%E4%B8%80%E9%A6%96%E6%AD%8C%E7%9A%84%E6%97%B6%E9%97%B4.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002Neh8l0uciQZ_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/%E5%91%A8%E6%9D%B0%E4%BC%A6-%E7%BB%99%E6%88%91%E4%B8%80%E9%A6%96%E6%AD%8C%E7%9A%84%E6%97%B6%E9%97%B4.lrc',
                theme: '#e3ae55'
            },
            {
                name: '千里之外',
                artist: '周杰伦 / 费玉清',
                url: 'https://file.imsyy.top/music/songs/%E5%91%A8%E6%9D%B0%E4%BC%A6%26%E8%B4%B9%E7%8E%89%E6%B8%85-%E5%8D%83%E9%87%8C%E4%B9%8B%E5%A4%96.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002jLGWe16Tf1H_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/%E5%91%A8%E6%9D%B0%E4%BC%A6%26%E8%B4%B9%E7%8E%89%E6%B8%85-%E5%8D%83%E9%87%8C%E4%B9%8B%E5%A4%96.lrc',
                theme: '#171513'
            },
            {
                name: '单车',
                artist: '陈奕迅',
                url: 'https://file.imsyy.top/music/songs/%E9%99%88%E5%A5%95%E8%BF%85-%E5%8D%95%E8%BD%A6.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000004S8YQr3UmEbG_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/%E9%99%88%E5%A5%95%E8%BF%85-%E5%8D%95%E8%BD%A6i.lrc',
                theme: '#32201f'
            },
            {
                name: '浮夸',
                artist: '陈奕迅',
                url: 'https://file.imsyy.top/music/songs/%E9%99%88%E5%A5%95%E8%BF%85-%E6%B5%AE%E5%A4%B8.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000003J6fvc0bVJon_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/%E9%99%88%E5%A5%95%E8%BF%85-%E6%B5%AE%E5%A4%B8.lrc',
                theme: '#040402'
            },
            {
                name: '十年',
                artist: '陈奕迅',
                url: 'https://file.imsyy.top/music/songs/%E9%99%88%E5%A5%95%E8%BF%85-%E6%B5%AE%E5%A4%B8.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000003J6fvc0bVJon_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/%E9%99%88%E5%A5%95%E8%BF%85-%E6%B5%AE%E5%A4%B8.lrc',
                theme: '#040402'
            },
            {
                name: '一丝不挂',
                artist: '陈奕迅',
                url: 'https://file.imsyy.top/music/songs/%E9%99%88%E5%A5%95%E8%BF%85-%E4%B8%80%E4%B8%9D%E4%B8%8D%E6%8C%82.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000001sjRhH0wqa4Q_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/%E9%99%88%E5%A5%95%E8%BF%85-%E4%B8%80%E4%B8%9D%E4%B8%8D%E6%8C%82.lrc',
                theme: '#0d0d0d'
            },
            {
                name: '麻雀',
                artist: '李荣浩',
                url: 'https://file.imsyy.top/music/songs/%E6%9D%8E%E8%8D%A3%E6%B5%A9-%E9%BA%BB%E9%9B%80.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000003P3ByD1n8nBK_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/%E6%9D%8E%E8%8D%A3%E6%B5%A9-%E9%BA%BB%E9%9B%80.lrc',
                theme: '#849fbd'
            },
            {
                name: '老街',
                artist: '李荣浩',
                url: 'https://file.imsyy.top/music/songs/%E6%9D%8E%E8%8D%A3%E6%B5%A9-%E8%80%81%E8%A1%97.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000001LP8hk0a6pOp_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/%E6%9D%8E%E8%8D%A3%E6%B5%A9-%E8%80%81%E8%A1%97.lrc',
                theme: '#e0d7bb'
            },
            {
                name: '年少有为',
                artist: '李荣浩',
                url: 'https://file.imsyy.top/music/songs/%E6%9D%8E%E8%8D%A3%E6%B5%A9-%E5%B9%B4%E5%B0%91%E6%9C%89%E4%B8%BA.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000RLvtE1eDyOs_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/%E6%9D%8E%E8%8D%A3%E6%B5%A9-%E5%B9%B4%E5%B0%91%E6%9C%89%E4%B8%BA.lrc',
                theme: '#d2ddd5'
            },
            {
                name: '爸爸妈妈',
                artist: '李荣浩',
                url: 'https://file.imsyy.top/music/songs/%E6%9D%8E%E8%8D%A3%E6%B5%A9-%E7%88%B8%E7%88%B8%E5%A6%88%E5%A6%88.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000001fi1zG0EjU2u_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/%E6%9D%8E%E8%8D%A3%E6%B5%A9-%E7%88%B8%E7%88%B8%E5%A6%88%E5%A6%88.lrc',
                theme: '#aec3ce'
            },
            {
                name: '干杯',
                artist: '五月天',
                url: 'https://file.imsyy.top/music/songs/%E4%BA%94%E6%9C%88%E5%A4%A9-%E5%B9%B2%E6%9D%AF.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000001fbipy4azgKM_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/%E4%BA%94%E6%9C%88%E5%A4%A9-%E5%B9%B2%E6%9D%AF.lrc',
                theme: '#0f1e32'
            },
            {
                name: '倔强',
                artist: '五月天',
                url: 'https://file.imsyy.top/music/songs/%E4%BA%94%E6%9C%88%E5%A4%A9-%E5%80%94%E5%BC%BA.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M0000006MmDz4Hl2Ud_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/%E4%BA%94%E6%9C%88%E5%A4%A9-%E5%80%94%E5%BC%BA.lrc',
                theme: '#b3dae1'
            },
            {
                name: '你不是真正的快乐',
                artist: '五月天',
                url: 'https://file.imsyy.top/music/songs/%E4%BA%94%E6%9C%88%E5%A4%A9-%E4%BD%A0%E4%B8%8D%E6%98%AF%E7%9C%9F%E6%AD%A3%E7%9A%84%E5%BF%AB%E4%B9%90.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M0000020I7sO0ayXhN_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/%E4%BA%94%E6%9C%88%E5%A4%A9-%E4%BD%A0%E4%B8%8D%E6%98%AF%E7%9C%9F%E6%AD%A3%E7%9A%84%E5%BF%AB%E4%B9%90.lrc',
                theme: '#0a0708'
            },
            {
                name: '派对动物',
                artist: '五月天',
                url: 'https://file.imsyy.top/music/songs/%E4%BA%94%E6%9C%88%E5%A4%A9-%E6%B4%BE%E5%AF%B9%E5%8A%A8%E7%89%A9.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002fRO0N4FftzY_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/%E4%BA%94%E6%9C%88%E5%A4%A9-%E6%B4%BE%E5%AF%B9%E5%8A%A8%E7%89%A9.lrc',
                theme: '#d0e8f2'
            },
            {
                name: 'Jackpot',
                artist: 'TheFatRat',
                url: 'https://file.imsyy.top/music/songs/TheFatRat-Jackpot.mp3',
                cover: 'https://p2.music.126.net/MoyUJHTq1RcFvGy3N3Ooxg==/18596040161820969.jpg?param=130y130',
                lrc: 'https://file.imsyy.top/music/lrc/music.lrc',
                theme: '#813D25'
            },
            {
                name: 'All About Us',
                artist: 'He Is We / Owl City',
                url: 'https://file.imsyy.top/music/songs/He%20Is%20We%26Owl%20City-All%20About%20Us.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000004b2Efp2dEWlo_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/He%20Is%20We%26Owl%20City-All%20About%20Us.lrc',
                theme: '#ee5a75'
            },
            {
                name: 'You\'re Not Alone',
                artist: 'Owl City / Britt Nicole',
                url: 'https://file.imsyy.top/music/songs/Owl%20City%26Britt%20Nicole-You\'re%20Not%20Alone.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002ke9Cq3KeWYj_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/Owl%20City%26Britt%20Nicole-You\'re%20Not%20Alone.lrc',
                theme: '#eff8fa'
            },
            {
                name: 'Good Time',
                artist: 'Owl City / Carly Rae Jepsen',
                url: 'https://file.imsyy.top/music/songs/Owl%20City%26Carly%20Rae%20Jepsen-Good%20Time.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000001mat8F3tAzsu_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/Owl%20City%26Carly%20Rae%20Jepsen-Good%20Time.lrc',
                theme: '#dd111c'
            },
            {
                name: 'Unbelievable',
                artist: 'Owl City / Hanson',
                url: 'https://file.imsyy.top/music/songs/Owl%20City%26Hanson-Unbelievable.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000004O8zk80vaqfl_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/Owl%20City%26Hanson-Unbelievable.lrc',
                theme: '#de7227'
            },
            {
                name: 'Fireflies',
                artist: 'Owl City',
                url: 'https://file.imsyy.top/music/songs/Owl%20City-Fireflies.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002FEF7L03Cv7T_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/Owl%20City-Fireflies.lrc',
                theme: '#33658d'
            },
            {
                name: 'Gold',
                artist: 'Owl City',
                url: 'https://file.imsyy.top/music/songs/Owl%20City-Gold.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000001Y76KO1Vpg7b_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/Owl%20City-Gold.lrc',
                theme: '#94c1de'
            },
            {
                name: 'The Saltwater Room',
                artist: 'Owl City',
                url: 'https://file.imsyy.top/music/songs/Owl%20City-The%20Saltwater%20Room.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000002FEF7L03Cv7T_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/Owl%20City-The%20Saltwater%20Room.lrc',
                theme: '#33658d'
            },
            {
                name: 'When Can I See You Again？',
                artist: 'Owl City',
                url: 'https://file.imsyy.top/music/songs/Owl%20City-When%20Can%20I%20See%20You%20Again%EF%BC%9F.mp3',
                cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M0000034UcqG3UwYdy_1.jpg?max_age=2592000',
                lrc: 'https://file.imsyy.top/music/lrc/Owl%20City-When%20Can%20I%20See%20You%20Again%EF%BC%9F.lrc',
                theme: '#0e1c3a'
            }
        ]
    });
}