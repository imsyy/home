// simple error report by baidu tongji

var _hmt = _hmt || [];

var er3eport = {};
er3eport.start = (new Date().getTime()); 
er3eport.codetime = function () {
    return (new Date().getTime()) - er3eport.start;
};
er3eport.dodnt = function () {
    window.dnt = 1; if (typeof window.dodnt === 'function') window.dodnt();
};
er3eport.jqdefined = function () {
    _hmt.push(['_setCustomVar', 2, 'JSERROR', 'jQueryDefined' + ' # ' + er3eport.codetime(), 3]);
    er3eport.dodnt();
};
er3eport.listener = function (msg) {
    
    var logstr = false;
    var errtype = 'JSERROR';
    if (typeof msg === 'string') {
        logstr = msg;
        
    } else {
        if (msg.error) logstr = msg.error.stack;
        else if (msg.message) logstr = msg.message;

        var src;
        if (msg.srcElement && msg.srcElement.src) src = msg.srcElement.src;
        else if (msg.target && msg.target.src) src = msg.target.src;
        
        if (! logstr) {
            if (src) {
                logstr = 'FileError: ' + src;
                errtype = 'FILEERROR';
            } else if (msg.type) {
                logstr = msg.type;
            }
        }
    }
    
    if (typeof logstr !== 'string') {
        logstr = 'empty_error_string'
    } else {
        logstr = logstr.replace(/\n/g, '').replace(/\s+/g, ' ');
    }

    _hmt.push(['_trackEvent', errtype, window.location.pathname, logstr + ' #UA# ' + navigator.userAgent + ' # ' + er3eport.codetime()]);

    return true;
}

if (typeof jQuery === 'function') er3eport.jqdefined();
if (Object.defineProperty) Object.defineProperty(window, 'jQuery', {set: er3eport.jqdefined});

if (window.addEventListener) {
    window.addEventListener('error', er3eport.listener, true);
} else if (window.attachEvent) {
    window.attachEvent('onerror', er3eport.listener);
}