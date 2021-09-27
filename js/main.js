//弹窗样式
iziToast.settings({
    timeout: 10000,
    icon: 'Fontawesome',
    closeOnEscape: 'true',
    position: 'topLeft',
    transitionIn: 'bounceInRight',
    transitionOut: 'fadeOutLeft',
    displayMode: 'replace',
    layout: '2',
    titleColor: '#efefef',
    messageColor: '#efefef',
    iconColor: '#efefef',
});

iziToast.info({
    icon: 'fad fa-vial',
    title: '新版站点试运行',
    message: '还存在亿些小问题 ~ <a href="./old/" style="color:#efefef">返回旧版</a>'
});

//控制台输出
/*
let date = '2021-09-27 21:32'
let a = 'background: #606060; color: #fff; border-radius: 3px 0 0 3px;'
let b = 'background: #1475B2; color: #fff; border-radius: 0 3px 3px 0;'
console.log(`%c Update Time %c ${date} `, a, b)
*/
/* 样式代码 */
var styleTitle1 = `
font-size: 20px;
font-weight: 600;
color: rgb(244,167,89);
`
var styleTitle2 = `
font-style: oblique;
font-size:14px;
color: rgb(244,167,89);
font-weight: 400;
`
var styleContent = `
color: rgb(30,152,255);
`

/* 内容代码 */
var title1 = '無名の主页'
var title2 = 'imsyy.top'
var content = `
版 本 号：1.2.0
更新日期：2021-09-27 19:39:21

更新说明：
1. 新增 点击左侧简介弹出更多页面
2. 新增 时间胶囊 （ 时光进度条 ）
3. 优化 移动端动画及细节
4. 修复 星期进度条显示错误

主页:  https://imsyy.top
Github:  https://github.com/imsyy/home
`
console.log(`%c${title1} %c${title2}
%c${content}`, styleTitle1, styleTitle2, styleContent)

//获取一言
fetch('https://v1.hitokoto.cn')
    .then(response => response.json())
    .then(data => {
        const hitokoto = document.getElementById('hitokoto_text')
        const from = document.getElementById('from_text')
        hitokoto.innerText = data.hitokoto
        from.innerText = data.from
    })
    .catch(console.error)

//获取天气
fetch('https://www.tianqiapi.com/free/day?appid=43986679&appsecret=TksqGZT7')
    .then(response => response.json())
    .then(data => {
        const wea = document.getElementById('wea_text')
        const city = document.getElementById('city_text')
        const tem_night = document.getElementById('tem_night')
        const tem_day = document.getElementById('tem_day')
        const win = document.getElementById('win_text')
        const win_speed = document.getElementById('win_speed')
        wea.innerText = data.wea
        city.innerText = data.city
        tem_night.innerText = data.tem_night
        tem_day.innerText = data.tem_day
        win.innerText = data.win
        win_speed.innerText = data.win_speed
    })
    .catch(console.error)

//获取时间
var t = null;
t = setTimeout(time, 1000);

function time() {
    clearTimeout(t);
    dt = new Date();
    var y = dt.getYear() + 1900;
    var mm = dt.getMonth() + 1;
    var d = dt.getDate();
    var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var day = dt.getDay();
    var h = dt.getHours();
    var m = dt.getMinutes();
    var s = dt.getSeconds();
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    document.getElementById("time").innerHTML = y + "&nbsp;年&nbsp;" + mm + "&nbsp;月&nbsp;" + d + "&nbsp;日&nbsp;" + "<span class='weekday'>" + weekday[day] + "</span><br>" + "<span class='time-text'>" + h + ":" + m + ":" + s + "</span>";
    t = setTimeout(time, 1000);
}

//必应壁纸
var url = 'https://bird.ioliu.cn/v1/?url=https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8';
var imgUrls = JSON.parse(sessionStorage.getItem("imgUrls"));
var index = sessionStorage.getItem("index");
var $section = $('#section');
if (imgUrls == null) {
    imgUrls = new Array();
    index = 0;
    $.get(url, function (result) {
        images = result.images;
        for (let i = 0; i < images.length; i++) {
            const item = images[i];
            imgUrls.push(item.url);
        }
        var imgUrl = imgUrls[index];
        var url = "https://www.bing.com" + imgUrl;
        $section.css("background", "url('" + url + "') center center no-repeat #666");
        $section.css("background-size", "cover");
        sessionStorage.setItem("imgUrls", JSON.stringify(imgUrls));
        sessionStorage.setItem("index", index);
    });
} else {
    if (index == 7)
        index = 0;
    else
        index++;
    var imgUrl = imgUrls[index];
    var url = "https://www.bing.com" + imgUrl;
    $section.css("background", "url('" + url + "') center center no-repeat #666");
    $section.css("background-size", "cover");
    sessionStorage.setItem("index", index);
}

//加载动画
window.addEventListener('load', function () {
    document.body.style.overflow = 'auto';
    document.getElementById('loading-box').classList.add("loaded")
}, false)

//链接提示文字
window.onload = function () {
    var link = document.getElementById("social");
    link.onmouseover = function () {
        document.getElementById("social").style.cssText = "background: rgb(0 0 0 / 25%);backdrop-filter: blur(5px);border-radius: 6px;transition: all 0.5s";
        document.getElementById("link-text").style.cssText = "display: block;transition: all 0.5s";
    };
    link.onmouseout = function () {
        document.getElementById("social").style.cssText = "background: none;backdrop-filter: none;border-radius: 6px;transition: all 0.5s";
        document.getElementById("link-text").style.cssText = "display: none;transition: all 0.5s";
    }

    var link = document.getElementById("github");
    link.onmouseover = function () {
        document.getElementById("link-text").innerHTML = "去 Github 看看";
    };
    link.onmouseout = function () {
        document.getElementById("link-text").innerHTML = "通过这里联系我";
    }
    var link1 = document.getElementById("qq");
    link1.onmouseover = function () {
        document.getElementById("link-text").innerHTML = "有什么事吗";
    };
    link1.onmouseout = function () {
        document.getElementById("link-text").innerHTML = "通过这里联系我";
    }
    var link2 = document.getElementById("email");
    link2.onmouseover = function () {
        document.getElementById("link-text").innerHTML = "来封 Email";
    };
    link2.onmouseout = function () {
        document.getElementById("link-text").innerHTML = "通过这里联系我";
    }
    var link3 = document.getElementById("telegram");
    link3.onmouseover = function () {
        document.getElementById("link-text").innerHTML = "你懂的 ~";
    };
    link3.onmouseout = function () {
        document.getElementById("link-text").innerHTML = "通过这里联系我";
    }
    var link4 = document.getElementById("twitter");
    link4.onmouseover = function () {
        document.getElementById("link-text").innerHTML = "你懂的 ~";
    };
    link4.onmouseout = function () {
        document.getElementById("link-text").innerHTML = "通过这里联系我";
    }
};

//菜单栏切换
function switchMenu() {
    var menu = document.cookie.replace(/(?:(?:^|.*;\s*)menu\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
    if (menu == '0') {
        document.getElementById("container").classList.add('menus');
        document.getElementById("menu").innerHTML = "<i class='fad fa-times'></i>";
        document.cookie = "menu=1;path=/";
    } else {
        document.getElementById("container").classList.remove('menus');
        document.getElementById("menu").innerHTML = "<i class='fad fa-bars'></i>";
        document.cookie = "menu=0;path=/";
    }
}

//更多页面切换
function switchMore() {
    var more = document.cookie.replace(/(?:(?:^|.*;\s*)more\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
    if (more == '0') {
        document.getElementById("container").classList.add('mores');
        document.getElementById("change").innerHTML = "Oops&nbsp;!";
        document.getElementById("change1").innerHTML = "哎呀，这都被你发现了（ 再点击一次可关闭 ）";
        document.cookie = "more=1;path=/";
    } else {
        document.getElementById("container").classList.remove('mores');
        document.getElementById("change").innerHTML = "Hello&nbsp;World&nbsp;!";
        document.getElementById("change1").innerHTML = "一个建立于 21 世纪的小站，存活于互联网的边缘";
        document.cookie = "more=0;path=/";
    }
}

//更多弹窗页面
function openBox() {
    document.getElementById("box").style.cssText = "display: block";
    document.getElementById("row").style.cssText = "display: none";
    document.getElementById("more").style.cssText = "display: none!important";
}

function closeBox() {
    document.getElementById("box").style.cssText = "display: none";
    document.getElementById("row").style.cssText = "display: flex";
    document.getElementById("more").style.cssText = "display: flex";
}

//监听网页宽度
window.addEventListener('load', function () {
    //console.log(window.innerWidth);
    window.addEventListener('resize', function () {
        //console.log(window.innerWidth);
        //关闭移动端样式
        if (window.innerWidth >= 600) {
            document.getElementById("container").classList.remove('menus');
        }
        //移动端隐藏更多页面
        if (window.innerWidth <= 990) {
            document.getElementById("container").classList.remove('mores');
            document.getElementById("change").innerHTML = "Hello&nbsp;World&nbsp;!";
            document.getElementById("change1").innerHTML = "一个建立于 21 世纪的小站，存活于互联网的边缘";
        }
    })

})

//更多页面显示关闭按钮
$("#more").hover(function(){
    document.getElementById("close").style.cssText = "display: block";
},function(){
    document.getElementById("close").style.cssText = "display: none";
})

//屏蔽右键
document.oncontextmenu = function(){
    iziToast.info({
        icon: 'fad fa-do-not-enter',
        title: '温馨提醒',
        message: '为了浏览体验，本站禁用右键'
    });
    return false;
}