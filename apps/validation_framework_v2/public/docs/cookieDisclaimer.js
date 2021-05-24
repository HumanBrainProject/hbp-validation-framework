var now = new Date();
var cookieTimeout = new Date(
    now.getFullYear() + 10,
    now.getMonth(),
    now.getDate()
);

var cookieLaw =
    "cookielaw_ebrainskg_accepted=true; expires=" + cookieTimeout.toUTCString();

function acceptCookie() {
    document.cookie = cookieLaw;
    document.body.removeChild(document.getElementById("cookieDisclaimer"));
}

function hasCookie() {
    return document.cookie.indexOf("cookielaw_ebrainskg_accepted=") > -1;
}

if (!hasCookie()) {
    var disclaimer = document.createElement("div");
    disclaimer.id = "cookieDisclaimer";
    disclaimer.innerHTML =
        '<h6>Cookies disclaimer</h6><p><a id="cookieAgreeButton" class="btn btn-primary" onclick="javascript:acceptCookie();">I agree</a>Our site saves small pieces of text information (cookies) on your device in order to deliver better content and for statistical purposes. You can disable the usage of cookies by changing the settings of your browser. By browsing our website without changing the browser settings you grant us permission to store that information on your device.</p>\n';
    document.body.appendChild(disclaimer);
}
