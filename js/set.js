/*
作者: imsyy
主页：https://www.imsyy.top/
GitHub：https://github.com/imsyy/home
版权所有，请勿删除
*/

/* 自定义配置 */
// $(function () {
//     var url = "../setting.json"
//     $.getJSON(
//         url,
//         function (data) {
//             /* 页头数据 */
//             $('title').text(data.title);
//             $('#loading-title').html(data.title);
//             $("meta[name='description']").attr('content', data.description);
//             $("meta[name='keywords']").attr('content', data.keywords);
//             $("meta[name='author']").attr('content', data.author);
//             /* 基础信息 */
//             $("#logo-img").attr("src", data.logo_img);
//             $('#logo-text-1').html(data.logo_text_1);
//             $('#logo-text-2').html("." + data.logo_text_2);
//             $('#logo-title-other').html(data.logo_text_1);
//             $('#logo-title-other-small').html("." + data.logo_text_2);
//             $('#logo-text-small').html(data.logo_text_1 + "." + data.logo_text_2);
//             $('#change').html(data.des_title[0]);
//             $('#change1').html(data.des_title[1]);
//             localStorage.setItem('des_tip', data.des_title[0]);
//             localStorage.setItem('des_tip_change', data.des_title_change[0]);
//             localStorage.setItem('des_title', data.des_title[1]);
//             localStorage.setItem('des_title_change', data.des_title_change[1]);
//             /* 社交链接 */
//             $('#github').attr('href', "https://github.com/" + data.github);
//             $('#qq').attr('href', "https://wpa.qq.com/msgrd?v=3&uin=" + data.qq + "&site=qq&menu=yes");
//             $('#email').attr('href', "mailto:" + data.email);
//             $('#telegram').attr('href', "https://t.me/" + data.telegram);
//             $('#twitter').attr('href', "https://twitter.com/" + data.twitter);
//             /* 天气 API */
//             localStorage.setItem('weather_api', data.weather_api);
//             /* 快捷链接 */
//             $('#link-url-1').attr('href', data.link_1[0]);
//             $('#link-icon-1').attr('class', data.link_1[1]);
//             $('#link-name-1').html(data.link_1[2]);
//             $('#link-url-2').attr('href', data.link_2[0]);
//             $('#link-icon-2').attr('class', data.link_2[1]);
//             $('#link-name-2').html(data.link_2[2]);
//             $('#link-url-3').attr('href', data.link_3[0]);
//             $('#link-icon-3').attr('class', data.link_3[1]);
//             $('#link-name-3').html(data.link_3[2]);
//             $('#link-url-4').attr('href', data.link_4[0]);
//             $('#link-icon-4').attr('class', data.link_4[1]);
//             $('#link-name-4').html(data.link_4[2]);
//             $('#link-url-5').attr('href', data.link_5[0]);
//             $('#link-icon-5').attr('class', data.link_5[1]);
//             $('#link-name-5').html(data.link_5[2]);
//             $('#link-url-6').attr('href', data.link_6[0]);
//             $('#link-icon-6').attr('class', data.link_6[1]);
//             $('#link-name-6').html(data.link_6[2]);
//             //壁纸 API
//             $('#wallpaper_text1').html(data.wallpaper_api[0][0]);
//             localStorage.setItem('wallpaper_api_1', data.wallpaper_api[0][1]);
//             $('#wallpaper_text2').html(data.wallpaper_api[1][0]);
//             localStorage.setItem('wallpaper_api_2', data.wallpaper_api[1][1]);
//             $('#wallpaper_text3').html(data.wallpaper_api[2][0]);
//             localStorage.setItem('wallpaper_api_3', data.wallpaper_api[2][1]);
//             //页脚版权
//             $('#power-year').html(data.Copyright_year);
//             $('#power-text').html(data.Copyright_text);
//         }
//     )
// });

// 背景图片 Cookies 
function setBgImg(bg_img) {
    if (bg_img) {
        Cookies.set('bg_img', bg_img, {
            expires: 36500
        });
        return true;
    }
    return false;
};

// 获取背景图片 Cookies
function getBgImg() {
    var bg_img_local = Cookies.get('bg_img');
    if (bg_img_local && bg_img_local !== "{}") {
        return JSON.parse(bg_img_local);
    } else {
        setBgImg(bg_img_preinstall);
        return bg_img_preinstall;
    }
}

var bg_img_preinstall = {
    "type": "1", // 1:默认背景 2:每日一图 3:随机风景 4:随机动漫
};


// 更改背景图片
function setBgImgInit() {
    var bg_img = getBgImg();
    $("input[name='wallpaper-type'][value=" + bg_img["type"] + "]").click();

    switch (bg_img["type"]) {
        case "1":
            var pictures = new Array();
            pictures[0] = './img/background1.webp';
            pictures[1] = './img/background2.webp';
            pictures[2] = './img/background3.webp';
            pictures[3] = './img/background4.webp';
            pictures[4] = './img/background5.webp';
            pictures[5] = './img/background6.webp';
            pictures[6] = './img/background7.webp';
            pictures[7] = './img/background8.webp';
            pictures[8] = './img/background9.webp';
            pictures[9] = './img/background10.webp';
            var rd = Math.floor(Math.random() * 10);
            $('#bg').attr('src', pictures[rd]) //随机默认壁纸
            break;
        case "2":
            $('#bg').attr('src', localStorage.getItem('wallpaper_api_1')); //必应每日
            break;
        case "3":
            $('#bg').attr('src', localStorage.getItem('wallpaper_api_2')); //随机风景
            break;
        case "4":
            $('#bg').attr('src', localStorage.getItem('wallpaper_api_3')); //随机动漫
            break;
    }
};

$(document).ready(function () {
    // 壁纸数据加载
    setBgImgInit();
    // 设置背景图片
    $("#wallpaper").on("click", ".set-wallpaper", function () {
        var type = $(this).val();
        var bg_img = getBgImg();
        bg_img["type"] = type;

        if (type === "1") {
            setBgImg(bg_img);
            var pictures = new Array();
            pictures[0] = './img/background1.webp';
            pictures[1] = './img/background2.webp';
            pictures[2] = './img/background3.webp';
            pictures[3] = './img/background4.webp';
            pictures[4] = './img/background5.webp';
            pictures[5] = './img/background6.webp';
            pictures[6] = './img/background7.webp';
            pictures[7] = './img/background8.webp';
            pictures[8] = './img/background9.webp';
            pictures[9] = './img/background10.webp';
            var rd = Math.floor(Math.random() * 10);
            $('#bg').attr('src', pictures[rd]) //随机默认壁纸
            iziToast.show({
                icon: "fa-solid fa-image",
                timeout: 2500,
                message: '壁纸设置成功',
            });
        };

        if (type === "2") {
            setBgImg(bg_img);
            $('#bg').attr('src', localStorage.getItem('wallpaper_api_1')); //必应每日
            iziToast.show({
                icon: "fa-solid fa-image",
                timeout: 2500,
                message: '壁纸设置成功',
            });
        };

        if (type === "3") {
            setBgImg(bg_img);
            $('#bg').attr('src', localStorage.getItem('wallpaper_api_2')); //随机风景
            iziToast.show({
                icon: "fa-solid fa-image",
                timeout: 2500,
                message: '壁纸设置成功',
            });
        };

        if (type === "4") {
            setBgImg(bg_img);
            $('#bg').attr('src', localStorage.getItem('wallpaper_api_3')); //随机动漫
            iziToast.show({
                icon: "fa-solid fa-image",
                timeout: 2500,
                message: '壁纸设置成功',
            });
        };
    });
});