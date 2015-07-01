(function($, window, undefined) {
	var elems = $([]), 
		jq_resize = $.resize = $.extend($.resize, {}),
		timeout_id,
		str_setTimeout = 'setTimeout',
		str_resize = 'resize',
		str_data = str_resize + '-special-event',
		str_delay = 'delay',
		str_throttle = 'throttleWindow';

	jq_resize[str_delay] = 250;
	jq_resize[str_throttle] = true;

	$.event.special[str_resize] = {
		setup : function() {
			if (!jq_resize[str_throttle] && this[str_setTimeout]) {
				return false;
			}
			var elem = $(this);
			elems = elems.add(elem);
			$.data(this, str_data, {
				w : elem.width(),
				h : elem.height()
			});
			if (elems.length === 1) {
				loopy();
			}
		},

		teardown : function() {
			if (!jq_resize[str_throttle] && this[str_setTimeout]) {
				return false;
			}
			var elem = $(this);
			elems = elems.not(elem);
			elem.removeData(str_data);
			if (!elems.length) {
				clearTimeout(timeout_id);
			}
		},

		add : function(handleObj) {
			if (!jq_resize[str_throttle] && this[str_setTimeout]) {
				return false;
			}
			var old_handler;
			function new_handler(e, w, h) {
				var elem = $(this), data = $.data(this, str_data);
				data.w = w !== undefined ? w : elem.width();
				data.h = h !== undefined ? h : elem.height();
				old_handler.apply(this, arguments);
			}
			if ($.isFunction(handleObj)) {
				old_handler = handleObj;
				return new_handler;
			} else {
				old_handler = handleObj.handler;
				handleObj.handler = new_handler;
			}
		}
	};

	function loopy() {
		timeout_id = window[str_setTimeout](function() {
			elems.each(function() {
				var elem = $(this),
					width = elem.width(),
					height = elem.height(),
					data = $.data(this, str_data);

				if (width !== data.w || height !== data.h) {
					elem.trigger(str_resize, [ data.w = width, data.h = height ]);
				}

			});
			loopy();
		}, jq_resize[str_delay]);
	}
})(jQuery, this);

// 权限控制
$(document).ready(function() {
	var scripts = document.getElementsByTagName('script'),
	path = "", i, ln, scriptSrc, match;
	for (i = 0, ln = scripts.length; i < ln; i++) {
        scriptSrc = scripts[i].src;

        match = scriptSrc.match(/wxportal\/js\/util\.js$/);

        if (match) {
            path = scriptSrc.substring(0, scriptSrc.length - match[0].length);
            break;
        }
    }
	var validateSecurityAccess = function(event, request, settings) {
		if (request.status == 403) {
			window.location.href = path + 'shop/jsp/login.jsp';
		}
	};
	$(document).ajaxComplete(validateSecurityAccess).ajaxError(validateSecurityAccess);
	
	$(".page-content").css("padding-bottom", "0px");
	$(".page-content").css({ height: $(window).height() - 45 - 41 - 10});
	$(".page-content").resize(function () {
		$(".page-content").css({ height: $(window).height() - 45 - 41 - 10});
	});
});

function getAutoHeightByMmGrid(container, notPg) {
	var mmgHeight = container.height();
	if (container.has(".widget-box").length != 0) {
		container.find(".widget-box:last").css("margin-bottom", "0px");
		container.find(".widget-box").each(function() {
			mmgHeight -= $(this).height();
			mmgHeight -= parseInt($(this).css("margin-bottom").replace("px", "")) || 0;
			mmgHeight -= parseInt($(this).css("border-top-width").replace("px", "")) || 0;
			mmgHeight -= parseInt($(this).css("border-bottom-width").replace("px", "")) || 0;
		});
	}
	if (!notPg) {
		mmgHeight -= 38;
	}
	return mmgHeight < 200 ? 200 : mmgHeight;
}

function mmGridResizeListener (mmg, container) {
	
	container.find(".widget-box").each(function() {
		if ($(this).find(".mmGrid").length != 0) {
			return true;
		}
		
		$(this).find(".widget-toolbar").each(function() {
			$(this).bind("click", function(event) {
				var jA = $(event.currentTarget).children("a");
				var jI = jA.children("i");
		        var action = jA.attr("data-action");
		        switch (action) {
		            case "collapse": // 折叠展开
		            	var jBody = $(this).closest(".widget-box").find(".widget-body");
		            	// 折叠
		            	if (jI.hasClass("icon-chevron-up")) {
		            		if (null == $(this).data("bodyHeight")) {
		            			$(this).data("bodyHeight", jBody.height() - 2);
		            		}
		            		mmg.opts.height += (parseInt($(this).data("bodyHeight")) || 0);
		            		setTimeout(function() {
		            			mmg.resize();
		            		}, 500);
		            	} else {
		            		mmg.opts.height -= (parseInt($(this).data("bodyHeight")) || 0);
		            		mmg.resize();
		            	}
		                break;
		            case "close": //关闭

		                break;
		            default:
		                break;
		        }
			});
		});
	});
	
	container.resize(function () {
		mmgAutoResize(mmg, container);
	});
}

function mmgAutoResize(mmg, container) {
	var mmgHeight = container.height();
	if (container.has(".widget-box:visible").length != 0) {
		container.find(".widget-box:visible").filter(function(index) {
			return $(this).parents("div.win").length == 0;
		}).each(function() {
			mmgHeight -= $(this).height();
			mmgHeight -= parseInt($(this).css("margin-bottom").replace("px", "")) || 0;
			mmgHeight -= parseInt($(this).css("border-top-width").replace("px", "")) || 0;
			mmgHeight -= parseInt($(this).css("border-bottom-width").replace("px", "")) || 0;
		});
	}
	if (mmgHeight == 0) {
		return;
	}
	if (mmg.opts.height + mmgHeight > 200) {
		mmg.opts.height += mmgHeight;
	} else {
		mmg.opts.height = 200;
	}
	mmg.resize();
};

function download(url) {
	if (!$.browser.chrome) {
		block();
	}
	if ($("#download-iframe").length != 0) {
		$("#download-iframe").remove();
	}
	var iframe = document.createElement("iframe");
	iframe = document.createElement("iframe");
	iframe.id = "download-iframe";
	iframe.style.display = "none";
	iframe.style.visibility = "hidden";
	iframe.style.height = "0px";
	if (!$.browser.chrome) {
		if (navigator.userAgent.indexOf("MSIE") > -1 && !window.opera) {
			iframe.onreadystatechange = function() {
				unblock();
				/*if (iframe.readyState == "complete") {
					unblock();
				}*/
			};
		} else {
			iframe.onload = function() {
				unblock();
			};
		}
	}
	iframe.src = url;
	document.body.appendChild(iframe);
}	
