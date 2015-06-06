/*
时间: 2013年10月12日 14:26:25
修改人:林斌
功能:
1.拖动，上，左，右固定范围
*/
(function ($) {
    var Popup = function (opts) {
        this.opts = opts;
        this._initEvent();
    };
    Popup.prototype.show = function () {
        if (this.opts.md === true) {
            var jBody = $("body");
            var jHyaline = jBody.find(".hyaline");
            /**
             * 20141014 by Hugo 滚动条下遮罩过短
             */
            var wHeight = $(document).height();
            if (jHyaline.length == 0) {
                jBody.append("<div class='hyaline'></div>");
                $("body > .hyaline").css({ height: wHeight });
            } else {
                jHyaline.css({ height: wHeight }).show();
            }
        }
        this._set("show");
    };
    Popup.prototype.hide = function () {
        if (this.opts.md === true) {
            $("body > .hyaline").hide();
        }
        this._set("hide");
    };
    Popup.prototype._initEvent = function () {
        var that = this;
        var jWin = that.opts.jWin;
        jWin.find(".close").click(function () {
            that.hide();
        });
        jWin.find(".win-header li").click(function () {
            that._select($(this));
        });
        jWin.click(function () {
            jWin.css({
                "z-index": that._zindex()
            });
        });
        $(window).resize(function () {
            that._set("resize");
        });
        if (that.opts.md !== true) {
            that._drag();
        }
    };
    Popup.prototype._select = function (jLi) {
        jLi.addClass("active").siblings().removeClass("active");
        var rel = jLi.attr("data-rel");
        $("#" + rel).addClass("active").siblings().removeClass("active");
    };
    Popup.prototype._drag = function () {
        var isdrag = false, innerX = 0, innerY = 0;
        var that = this;
        var jWin = that.opts.jWin;
        var jHeader = jWin.find(".win-header");
        var pWidth = jWin.width();
        var wWidth = $(window).width();
        $(document).mouseup(function (e) {
            isdrag = false;
        });
        jHeader.mousedown(function (e) {
            isdrag = true;
            var offset = jWin.offset();
            innerX = e.pageX - offset.left;
            innerY = e.pageY - offset.top;
        });
        $(document).mousemove(function (e) {
            if (isdrag) {
                var offset = jWin.offset();
                if (offset.top < 0) {
                    jWin.css({
                        top: 5
                    });
                }
                if (offset.left < 0) {
                    jWin.css({
                        left: 5
                    });
                } else if (offset.left + pWidth > wWidth) {
                    jWin.css({
                        left: wWidth - pWidth - 5
                    });
                }
                if (offset.top >= 0 && offset.left >= 0 && offset.left + pWidth <= wWidth) {
                    jWin.css({
                        left: e.pageX - innerX + "px",
                        top: e.pageY - innerY + "px"
                    });
                }
                else {
                    isdrag = false;
                }
            }
        });
    };
    Popup.prototype._set = function (action) {
        var that = this;
        var jWin = that.opts.jWin;
        var jWinContent = jWin.find(".win-content");
        var wHeight = $(window).height();
        var wWidth = $(window).width();
        var bHeight = $("body").height();
        var bWidth = $("body").width();
        var pHeight = jWin.height() + 2;
        var pWidth = jWin.width() + 2;
        var offset = jWin.offset();
        var offsetLeft = offset.left;
        var offsetTop = offset.top;
        var offsetLeftAvg = (wWidth - pWidth) / 2;
        var offsetTopAvg = (wHeight - pHeight) / 2;
        var scrollTop = $(document).scrollTop();
        var left = offsetLeftAvg > 0 ? offsetLeftAvg : 0;
        var top = scrollTop + offsetTopAvg > 0 ? scrollTop + offsetTopAvg : 0;
        switch (action) {
            case "show":
                if (wHeight < pHeight) {
                    top = 20;
                    jWinContent.css({ "height": wHeight - top * 2 - 31, "overflow": "auto" });
                } else {
                    jWinContent.css({ "height": "auto" });
                }
                //if (wWidth < pWidth) {
                //    jWinContent.css({ "width": pWidth });
                //} else {
                //    jWinContent.css({ "width": "95%" });
                //}
                jWin.css({
                    left: left,
                    top: -pHeight
                });
                setTimeout(function() {
                	var z_index = that._zindex();
                    jWin.css({"z-index": z_index + 1 });
                    jWin.animate({
                        left: left,
                        top: top
                    }, context.isAnimate ? 500 : 0, function () {
                        //console.log("hide complated");
                    });
                    if (that.opts.md === true) {
                    	/**
                    	 * 20141014 by Hugo 滚动条下遮罩过短
                    	 */
                        $("body > .hyaline").css({ "height": $(document).height(), "z-index": z_index });
                    }
                }, 10);
                break;
            case "hide":
                jWinContent.css({ "height": "auto" });
                pHeight = jWin.height() + 2;
                jWin.animate({
                    top: -pHeight
                }, context.isAnimate ? 200 : 0, function () {
                    //console.log("hide complated");
                });
                break;
            case "resize":
                if (offsetTop > 0) {
                    jWin.css({
                        left: left,
                        top: top
                    });
                    if (that.opts.md === true) {
                        $("body > .hyaline").css({ height: bHeight });
                    }
                }
                break;
            default:
                throw new Error("action参数必需传");
                break;
        }
    };
    Popup.prototype._zindex = function () {
        var max = 0;
        $(".win").each(function (i, item) {
            var zindex = parseInt($(item).css("z-index"));
            if (max < zindex) {
                max = zindex;
            }
        });
        return max + 1;
    };
    //参数: 空 或者 {display:是否显示true/false,md:模态窗口true/false}
    $.fn.popup = function (opts) {
        if (!!opts) {
            if (!$.isPlainObject(opts)) {
                alert("参数必须为object对象");
                return;
            }
        } else {
            opts = {};
        }
        opts.selector = this.selector;
        opts.jWin = $(this.selector);
        var popup = this.data("win_" + this.selector);
        switch (opts.display) {
            case false:
            	if (!popup) {
            		popup = new Popup(opts);
            		this.data("win_" + this.selector, popup);
            	}
            	popup.hide();
                break;
            case true:
            default:
                if (!popup) {
                    popup = new Popup(opts);
                    this.data("win_" + this.selector, popup);
                }
                popup.show();
                break;
        }
    };
})(jQuery)