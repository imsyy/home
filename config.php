<?php
/*
homepage config
author: XYZ-dragon
*/

class Site
{
    // 构造函数赋初始值
    function __construct(array $setting)
    {
        foreach ($setting as $key => $value) {
            $this->$key = $value;
        }
    }
    function get_linklist(int $index, string $type)
    {
        /* 键名不确定 */
        switch ($type) {
            case 'url':
                return $this->link_list[array_keys($this->link_list)[$index]][0];
            case 'icon':
                return $this->link_list[array_keys($this->link_list)[$index]][1];
            case 'name':
                return array_keys($this->link_list)[$index];
        }
    }
    function get_linklist_without_icon(int $index, string $type)
    {
        switch ($type) {
            case 'url':
                return $this->z7z8[array_keys($this->z7z8)[$index]];
            case 'name':
                return array_keys($this->z7z8)[$index];
        }
    }
    function get_wallpaperapi(int $index, string $type)
    {
        switch ($type) {
            case 'url':
                return $this->wallpaper_api[array_keys($this->wallpaper_api)[$index]];
            case 'name':
                return array_keys($this->wallpaper_api)[$index];
        }
    }
}

$setting = [
    'domain' => 'http://localhost',
    'title' => 'BLUEEYESWHITEDRAGON.XYZ', // 用了两次
    'description' => '万千个人站点中的一个',
    'keywords' => '酢豚的小破站',
    'author' => '酢豚',
    'logo_path' => '/favicon.png',
    'logo_text' => ['zuotun', 'xyz'],
    'font_path' => '/font/MIDDST__.TTF', // default_font: Pacifico-Regular 没用上
    'des_title' => [
        'Hello world!', 'System.out.print("Hello world!");'
    ],
    'des_title_change' => [
        'Oops !', '哎呀，这都被你发现了 ( 再次点击可切换 )' // 还没用上
    ],
    'social_contact' => [
        'github' => 'https://github.com/XYZ-dragon',
        'qq' => 'https://wpa.qq.com/msgrd?v=3&uin=964832091&site=qq&menu=yes',
        'email' => '',
        'telegram' => '',
        'twitter' => 'https://twitter.com/zuotun0226'
    ],
    'link_list' => [
        '博客' => ['https://blueeyeswhitedragon.xyz/', 'fa-solid fa-blog',],
        '兰空图床' => ['http://localhost:8080/', 'fa-solid fa-cloud'],
        'Null' => ['', 'fa-solid fa-music'],
        '导航站' => ['', 'fa-solid fa-compass'],
        '网址集' => ['https://ionego.net/', 'fa-solid fa-book-bookmark'],
        'Lab' => ['', 'fa-solid fa-flask']
    ],
    'z7z8' => ['站点监控' => '1', '2' => '2', '3' => '3', '4' => '4', '5' => '5'],
    'weather_api' => 'https://www.yiketianqi.com/free/day?appid=43656176&appsecret=I42og6Lm&unescape=1', // 没用上
    'wallpaper_api' => [
        '游戏王' => 'https://blueeyeswhitedragon.xyz/api/ygo/',
        'Bing' => 'https://blueeyeswhitedragon.xyz/api/bing/',
        '随机风景' => 'https://api.ixiaowai.cn/gqapi/gqapi.php',
        '随机动漫' => 'https://api.ixiaowai.cn/api/api.php'
    ],
    'Copyright_year' => '2020',
    'Copyright_text' => '酢豚'
];
$site = new Site($setting);
// echo $site->des_title[0];
