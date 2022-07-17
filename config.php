<?php
/*
homepage config
author: XYZ-dragon
默认应该是不支持短标签的,所以就没写那种
@TODO
内联样式实现艺术字
全站中文字体替换
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

    /**
     * @return key|value
     **/
    function get_kv(string $name, int $index, string $type): string
    {
        switch ($type) {
            case 'name':
                return array_keys($this->$name)[$index];
            case 'url':
                if (gettype($this->$name[array_keys($this->$name)[$index]]) == 'string') {
                    return $this->$name[array_keys($this->$name)[$index]];
                }
                return $this->$name[array_keys($this->$name)[$index]][0];
            case 'icon':
                // 如果不存在直接报错
                return $this->$name[array_keys($this->$name)[$index]][1];
        }
    }
}

// 值可以重复,键不能重复!
$setting = [
    'domain' => 'http://localhost',
    'title' => 'Welcome to my site!',
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
        'Oops !', '哎呀，这都被你发现了 ( 再次点击可切换 )'
    ],
    'social_contact' => [
        'github' => 'https://github.com/XYZ-dragon',
        'qq' => 'https://wpa.qq.com/msgrd?v=3&uin=964832091&site=qq&menu=yes',
        'email' => '',
        'telegram' => '',
        'twitter' => 'https://twitter.com/zuotun0226'
    ],
    'link_list' => [
        '博客' => ['https://blueeyeswhitedragon.xyz/', 'fa-solid fa-blog'],
        '兰空图床' => ['http://lsky.localhost/', 'fa-solid fa-images'],
        '网盘' => ['http://assets.localhost/', 'fa-solid fa-cloud'],
        '导航站' => ['', 'fa-solid fa-compass'],
        '网址集' => ['https://ionego.net/', 'fa-solid fa-bookmark'],
        'Lab' => ['', 'fa-solid fa-code']
    ],
    'z7z8' => [
        'Python 文档' => '/python-3.9.5-文档',
        'Err' => '/ErrorDocument/404.html',
        '调试' => '/config.php',
        '版本:' => '#',
        'v0.1' => '#'
    ],
    'weather_api' => 'https://www.yiketianqi.com/free/day?appid=43656176&appsecret=I42og6Lm&unescape=1',
    'wallpaper_api' => [
        '游戏王' => 'https://blueeyeswhitedragon.xyz/api/ygo/',
        'Bing' => 'https://blueeyeswhitedragon.xyz/api/bing/',
        '随机风景' => 'https://api.ixiaowai.cn/gqapi/gqapi.php',
        '随机动漫' => 'https://api.ixiaowai.cn/api/api.php'
    ],
    'copyright' => ['2020', '酢豚'],
];

$site = new Site($setting);
// for ($i = 0; $i <= 3; $i++) echo ',\'' . $site->get_kv('wallpaper_api', $i, 'url') . '\'';
