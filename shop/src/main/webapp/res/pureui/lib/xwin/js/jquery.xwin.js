var xwin = function () {
	var template = null;
	return {
		init: function() {
			var program = '' +
			'<div id="x-win-template">' +
			  '<div id="x-win-{{id}}" class="win x-window">' +
				'<div class="win-header x-window-header">' +
					'<div class="x-window-header-body">' +
						'<div class="x-window-header-text">' +
							'<span>{{header}}</span>' +
						'</div>' +
						'<div id="x-win-btn-close-{{id}}" class="close x-win-close x-box-item">' +
							'<img class="x-tool-img" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<div class="x-frame-tl x-window-default-tl">' +
					'<div class="x-frame-tr x-window-default-tr">' +
						'<div class="x-frame-tc x-window-default-tc"></div>' +
					'</div>' +
				'</div>' +
				'<div class="x-frame-ml x-window-default-ml">' +
					'<div class="x-frame-mr x-window-default-mr">' +
						'<div class="x-frame-mc x-window-default-mc" style="width: 590px; height: 340px">' +
							'<div style="POSITION: relative"></div>' +
							'<div class="x-window-body">' +
								'<div class="x-box-item">' +
									'<form id="x-win-form-{{id}}" method="post" onSubmit="return false;">' +
										'<input type="hidden" name="condition.type" value="{{type}}">' +
										'<div class="row-fluid">' +
											'<div class="x-win-form-first-child">' +
												'<select class="chzn-select span12" name="condition.key" data-placeholder="' + context.lang.xwin.select.placeholder + '">' +
												    '{{#each options}}' +
												  		'<option value="{{this.value}}">{{this.key}}</option>' +
												  	'{{/each}}' +
												'</select>' +
											'</div>' +
											'<div class="x-win-form-second-child">' +
												'<input type="text" name="condition.value" value="">' +
											'</div>' +
											'<div class="x-win-form-third-child">' +
												'<input id="x-win-btn-query-{{id}}" class="btn btn-primary x-win-btn" type="button" value="' + context.lang.xwin.buttons[0] + '">' +
												'<input id="x-win-btn-reset-{{id}}" class="btn btn-primary x-win-btn" type="button" value="' + context.lang.xwin.buttons[1] + '" style="margin-left: 2px;">' +
											'</div>' +
										'</div>' +
									'</form>' +
									'<table id="x-win-mmg-{{id}}" class="mmg">' +
									    '<tr>' +
									        '<th rowspan="" colspan=""></th>' +
									    '</tr>' +
									'</table>' +
									'<div id="x-win-pg-{{id}}" style="text-align: right;"></div>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<div class="x-frame-bl x-window-default-bl">' +
					'<div class="x-frame-br x-window-default-br">' +
						'<div class="x-frame-bc x-window-default-bc"></div>' +
					'</div>' +
				'</div>' +
		      '</div>' +
			'</div>';
			template  = Handlebars.compile(program);
			
			$.fn.xwin = function () {
				$(this).each(function() {
					$(this).find("input:visible").not("[readonly], [disabled]").each(function() {
						var params = $(this).attr("data-xwin-params");
						try {
							params = eval("(" + params + ")");
						} catch (e) {
							e = null;
						}
						if (null != params && params != "") {
							var me = $(this);
							
							me.css({"cursor": "pointer"});
							
							me.bind("click", function() {
								if (!me.is("[readonly]") && !me.is("[disabled]")) {
									xwin.load(params);
								}
							});
							
							me.next("i").bind("click", function() {
								if (!me.is("[readonly]") && !me.is("[disabled]")) {
									xwin.load(params);
								}
							});
							
							me.on("change", function() {
								if (!me.is("[readonly]") && !me.is("[disabled]")) {
									xwin.cleanup(params, me);
								}
							});
							
							xwin.cleanup(params, me);
						}
					});
				});
			};
		},
		load: function(params, selector) {
			// edit by hugo 20140424  解决ie8 上多次点击的问题
			if ($("#x-win-template").length > 0) {
				return false;
			}
			if (null == template) {
				return;
			}
			var id =  new Date().getTime() + '-' + parseInt(Math.random() * 100000);
			var data = {
                id: id
			};
			if (typeof params === 'string') {
				params = $.extend(data, {type: params});
			}
			data = $.extend(data, xwinconfig(params.type));
			data = $.extend(data, params);
			var html = template(data);
			if ($("div.page-content:first").length != 0) {
				$("div.page-content:first").append(html);
			} else {
				$("body").append(html);
			}
			$("div#x-win-template .chzn-select").chosen({
				width : "100%",
				disable_search_threshold : 5,
				allow_single_deselect : true
			});
			$('div#x-win-template .chzn-container > .chzn-single, [class*="chzn-container"] > .chzn-single').css({'height': '22px', 'line-height': '22px'});
			var x_cols = data.columns;
			var x_mmg = $("#x-win-mmg-" + id).mmGrid({
		     	height : 241,
		     	cols : x_cols,
		     	url : data.url,
		     	params : $.extend(data.params || {}, {"condition.type" : params.type}),
		     	method : 'post',
		     	autoLoad : true,
		     	fullWidthRows : true,
		     	cache : false,
		     	multiSelect: false,
		     	nowrap: true,
		     	plugins : [$('#x-win-pg-' + id).mmPaginator({})]
			});
			$("#x-win-" + id).popup({md: false});
			
			var close = $("#x-win-btn-close-" + id);
			close.css("opacity", "1");
			close.bind("click", function() {
				setTimeout(function () {
					$("#x-win-template").remove();
				}, 200);
			});
			
			var form = $("#x-win-form-" + id);
			$("#x-win-btn-query-" + id).bind("click", function() {
				var key = form.find("select[name='condition.key']").val();
				var value = form.find("input[name='condition.value']").val();
				var type = form.find("input[name='condition.type']").val();
				var _params = {};
				_params = $.extend(_params, data.params || {});
				_params = $.extend(_params, eval("(" + "{'condition." + key + "':'" + value + "', 'condition.type': '" + type + "'}" + ")"));
				x_mmg.load(_params);
			});
			$("#x-win-btn-reset-" + id).bind("click", function() {
				form.trigger("reset");
				form.find(".chzn-select").trigger("liszt:updated");
			});
			form.bind("keydown", function(event){
		    	if (event.keyCode == 13) {
		    		$("#x-win-btn-query-" + id).trigger("click");
		    	}
		    });
			
			x_mmg.on("itemdblclick", function(e,item,rowIndex){
				if (data.returnValue instanceof Array) {
					for (var i = 0; i < data.returnValue.length; i++) {
						var val = data.returnValue[i];
						$(val.targetSelector).val(item[val.sourceColumn]);
						$(val.targetSelector).trigger("change");
					}
				}
				$("#x-win-"+ id).hide();
				$("#x-win-template").remove();
	     	});
		},
		cleanup: function(params, selector) {
			var value = selector.val();
			if (null != value && $.trim(value) != "" && !selector.is("[readonly]") && !selector.is("[disabled]")) {
				if (selector.nextAll("abbr").length != 0) {
					return;
				}
				var abbr = $("<abbr><div></div></abbr>");
				abbr.appendTo(selector.parent());
				
				abbr.bind("click", function() {
					var data = {};
					if (typeof params === 'string') {
						params = $.extend(data, {type: params});
					}
					data = $.extend(data, xwinconfig(params.type));
					data = $.extend(data, params);
					if (data.returnValue instanceof Array) {
						for (var i = 0; i < data.returnValue.length; i++) {
							var val = data.returnValue[i];
							$(val.targetSelector).val('');
						}
					}
					selector.nextAll("abbr").remove();
				});
				
				abbr.hover(
					function() {
						$(this).children("div").addClass("hover");
	            	},
	            	function() {
	            		$(this).children("div").removeClass("hover");
	            	}
	            );
			} else {
				selector.nextAll("abbr").remove();
			}
		}
	};
}();
xwin.init();