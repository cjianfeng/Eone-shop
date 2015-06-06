$(function () {
    //ie7需要,浏览器支持
    if (!!client && !!client.browser && (client.browser.ie == 6 || client.browser.ie == 7)) {
        var jDiv = $('<div class="alert" style="position: absolute;top:-50px;left:190px;z-index:9999;">' +
                        '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                        '<strong>警告! </strong>' +
                        '由于您正在使用IE' + client.browser.ie + '浏览器，系统正在遭遇严重安全风险，建议你立即升级最新版本保护系统安全，以获得更好的体验。<a href="http://windows.microsoft.com/zh-cn/internet-explorer/download-ie" target="_blank">下载IE最新版本</a>' +
                      '</div>');
        $("body").append(jDiv);
        jDiv.animate({
            top: "0px"
        }, 1500);
        setTimeout(function () {
            jDiv.animate({
                top: "-50px"
            }, 1500);
        }, 5000);
    }
    //ie7,ie8需要内容撑满
    //if (!!client && !!client.browser && (client.browser.ie == 7 || client.browser.ie == 8)) {
    setPageContent();
    //}
    function setPageContent() {
        var hBody = $("body").height();
        var hWindow = $(window).height();
        //alert(hBody + "  " + hWindow);
        if (hBody < hWindow) {
            $(".page-content").css({ height: hWindow - 45 - 41 - 8 - 8 });
        }
    }
    //    $(window).resize(function () {

    //    });
    //    $(window).scroll(function () {

    //    });
});