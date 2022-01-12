/*!
 * china-lantern v1.6.0
 * (c) 2020-2021 fz6m
 * Released under the MIT License.
 */
! function (t) {
    "function" == typeof define && define.amd ? define(t) : t()
}((function () {
    "use strict";
    ! function (t, e) {
        void 0 === e && (e = {});
        var n = e.insertAt;
        if (t && "undefined" != typeof document) {
            var r = document.head || document.getElementsByTagName("head")[0],
                a = document.createElement("style");
            a.type = "text/css", "top" === n && r.firstChild ? r.insertBefore(a, r.firstChild) : r.appendChild(a), a.styleSheet ? a.styleSheet.cssText = t : a.appendChild(document.createTextNode(t))
        }
    };
    var t;
    (t = document.createElement("div")).className = "j-china-lantern", t.innerHTML = '<div class="lantern__warpper"><div class="lantern__box"><div class="lantern__line"></div><div class="lantern__circle"><div class="lantern__ellipse"><div class="lantern__text">新</div></div></div><div class="lantern__tail"><div class="lantern__rect"></div><div class="lantern__junction"></div></div></div></div><div class="lantern__warpper lantern__secondary"><div class="lantern__box"><div class="lantern__line"></div><div class="lantern__circle"><div class="lantern__ellipse"><div class="lantern__text">年</div></div></div><div class="lantern__tail"><div class="lantern__rect"></div><div class="lantern__junction"></div></div></div></div>', document.body.appendChild(t)
}));