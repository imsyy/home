setTimeout(function() {
        
    var realPathname = window.location.pathname;
    // ie 兼容
    if (realPathname.indexOf('/') !== 0) {
        realPathname = '/' + realPathname;
    }
    var isUPPage = realPathname === '/upgrade-your-browser.html';
    var isSpHost = window.location.hostname === 'support.dmeng.net';
    window.dodnt = function() {
        var now = new Date(); var time = now.getTime(); time += 600 * 1000; now.setTime(time);
        document.cookie = 'dnt=1' + '; expires=' + now.toUTCString() + '; path=/';
    }; var doTrack = typeof window.dnt === 'undefined';
    if (doTrack === false && document.cookie.match(/dnt=1/) === null) window.dodnt();
    
    window._hmt = window._hmt || [];
    var _hmt_id = '6ddc2cf73e10ed480880c454b957e809';
    if (isSpHost) {

        if (doTrack) {

            _hmt_id = '3546503052812606f053b8bb63ef0e99';
                
            // 统计需要升级的IE版本
            if (isUPPage) {

                var iever = "none";
                
                var _jsver = 0;
                /*@cc_on
                    _jsver = @_jscript_version;
                @*/
                if (_jsver === 0) {
                    // IE11 或者不是 IE
                    
                    if (!!window.MSInputMethodContext && !!document.documentMode) {
                        iever = 11;
                    }
                } else {
                    var docmode = document.documentMode;
                    if (!! docmode && docmode > 5) {
                        iever = docmode;
                    } else if (_jsver === 5.7 && window.XMLHttpRequest) {
                        iever = 7;
                    } else if (_jsver === 5.6 || (_jsver === 5.7 && !window.XMLHttpRequest)) {
                        iever = 6;
                    } else {
                        iever = 5;
                    }
                    iever += "";
                }
                
                var winver = 'other';
                var ua = navigator.userAgent;

                if (ua.indexOf("Windows NT 5") !== -1) {
                    winver = 'winXP';
                } else if (ua.indexOf("Windows NT 6.1") !== -1) {
                    winver = 'win7';
                } else if (ua.indexOf("Windows NT 6.2") !== -1) {
                    winver = 'win8';
                } else if (ua.indexOf("Windows NT 6.3") !== -1) {
                    winver = 'win8.1';
                } else if (ua.indexOf("Windows NT 10") !== -1) {
                    winver = 'win10';
                }
                
                _hmt.push(['_setCustomVar', 1, 'ClientVer', winver + "_IE" + iever, 3]);
            }
            
        } else {
            _hmt_id = 'b5afc37c04e670dc17f68727f92ea21c';
        }
    }

    _hmt.unshift(['_setAccount', _hmt_id]);

    var helloWorldJS = document.getElementById('hello-world-js');
    var hm = document.createElement('script');
    hm.src = '//hm.baidu.com/hm.js?' + _hmt_id;
    helloWorldJS.parentNode.insertBefore(hm, helloWorldJS);

}, 1500);
