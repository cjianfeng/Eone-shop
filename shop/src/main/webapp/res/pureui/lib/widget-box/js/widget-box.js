$(function () {
    $("div[class='widget-toolbar']").live("click",function (event) {
    	
        var jA = $(event.currentTarget).children("a");
        var jI = jA.children("i");
        var action = jA.attr("data-action");
        switch (action) {
            case "collapse": //折叠展开
                var jBody = $(this).closest(".widget-box").find(".widget-body");
                if (jI.hasClass("icon-chevron-up")) {
                    jI.attr({ "class": "icon-chevron-down" });
                    if($.browser.msie){
                    	if($.browser.version=="7.0"){
                    		jA.empty().append("<i class='icon-chevron-down'></i>");
                    		jBody.hide();
                    	}else{
                    		jBody.hide();
                    	}
                    }else{
	                    jBody.slideUp("normal", function () { });
                    }
                }
                else {
                    jI.attr({ "class": "icon-chevron-up" });
                    if($.browser.msie){
                    	if($.browser.version=="7.0"){
                    		jA.empty().append("<i class='icon-chevron-up'></i>");
                  			jBody.show();
                    	}else{
                    		jBody.show();
                    	}
                    }else{
	                    jBody.slideDown("normal", function () { });
                    }
                }
                break;
            case "close": //关闭

                break;
            default:
                break;
        }
    });
});