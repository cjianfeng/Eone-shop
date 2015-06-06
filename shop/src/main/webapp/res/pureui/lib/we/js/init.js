$(function () {
    //禁止#跳转
    $("a").live("click", function (event) {
        if ($(this).attr("href") == "#") {
            event.preventDefault(); //event.stopPropagation();
        }
    });
    //自定义控件
    $(".controls").live("click", function (e) {
        var jThis = $(this);
        var jI = jThis.find("i");
        switch (true) {
            case jThis.hasClass("date"):
            case jThis.hasClass("datetime"):
            case jThis.hasClass("time"):
            	var input = jThis.find("input").get(0);
	            var dataFormat = jI.attr("data-format");
	            var minDate = jI.attr("data-minDate");
	            var maxDate = jI.attr("data-maxDate");
	            var lang = $("html:first").attr("lang");
	            WdatePicker({ el: input, firstDayOfWeek: 1, dateFmt: dataFormat, lang: lang, minDate: minDate, maxDate: maxDate }); //maxDate: '%y-%M-%d', 
	            break;
            case jThis.hasClass("ref"):
                var dataRel = jI.attr("data-rel");
                $("#" + dataRel).popup();
                break;
            case jThis.hasClass("ddl"):
                break;
            case jThis.hasClass("mlt"):
                break;
            default:
                break;
        }
    });
    try {
        //兼容性
        if (client.browser.ie == 6 || client.browser.ie == 7) {
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
        //初始化第三方控件
        methodUtil.init();
    }
    catch (e) {

    }


});