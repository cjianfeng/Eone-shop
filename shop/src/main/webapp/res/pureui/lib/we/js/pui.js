var PUI = PUI || {};

PUI.plugin = new function() {
	var defaults = {
		select: {
			width : "100%",
			disable_search_threshold : 5,
			allow_single_deselect : true
		},
		radio: {
	        checkboxClass: 'icheckbox_minimal',
	        radioClass: 'iradio_minimal',
	        increaseArea: '20%' // optional
		},
		checkbox: {
	        checkboxClass: 'icheckbox_minimal',
	        radioClass: 'iradio_minimal',
	        increaseArea: '20%' // optional
		}
	};
	return {
		init: function(options, selector) {
			
			if (null == selector) {
				selector = $("body");
			}
			
			var opts = $.extend(defaults, options);
			
			// 下拉框
			if (selector.find(".chzn-select").length != 0) {
				selector.find(".chzn-select").each(function() {
					var $this = $(this);
					$this.chosen(opts.select);
					var chosen =  $this.data('chosen');
					chosen.form_field_jq.bind("liszt:updated", function(evt) {
						$this.trigger("chosen:updated.chosen");
				    });
					
					chosen.form_field_jq.bind("chosen:refresh", function(evt) {
						$this.chosen('destroy');
						$this.chosen(chosen.options);
				    });
				});
			}
		    
		    // 弹出查询
			if (selector.find(".controls.xwin").length != 0) {
				selector.find(".controls.xwin").xwin();
			}
			
			// 初始化复选
			if (selector.find('input[type=checkbox]').length != 0) {
				selector.find('input[type=checkbox]').iCheck(opts.checkbox);
			}
			
			// 初始化单选
			if (selector.find('input[type=radio]').length != 0) {
				selector.find('input[type=radio]').iCheck(opts.radio);
			}
			
			//box展开折叠
	        try {
	            if (client.browser.ie == 6 || client.browser.ie == 7) {
	                $(selector).find(".widget-toolbar").hide();
	            }
	        }
	        catch (e) {

	        }
		}
	};
};

PUI.MessageBox = new function() {
	return {
		alert: function() {
			var content = arguments[0];
			var title = arguments[1];
			var options = arguments[2];
			if (null == title) {
				title = context.lang.messageBox.alert.title;
			}
			$.msgBox($.extend({
				title : title,
				content : content,
				type : "alert",
				buttons : [{value : context.lang.messageBox.alert.buttons[0]}]
			}, options));
		},
		info: function() {
			var content = arguments[0];
			var title = arguments[1];
			var options = arguments[2];
			if (null == title) {
				title = context.lang.messageBox.info.title;
			}
			$.msgBox($.extend({
				title : title,
				content : content,
				type : "info",
				buttons : [{value : context.lang.messageBox.info.buttons[0]}]
			}, options));
		},
		error: function() {
			var content = arguments[0];
			var title = arguments[1];
			var options = arguments[2];
			if (null == title) {
				title = context.lang.messageBox.error.title;
			}
			$.msgBox($.extend({
				title : title,
				content : content,
				type : "error",
				buttons : [{value : context.lang.messageBox.error.buttons[0]}]
			}, options));
		},
		show: function(cfg) {
			$.msgBox(cfg);
		}
	};
};

PUI.util = new function() {
	return {
		/**
		 * 重置表单
		 */
		resetForm: function(form, isValid) {
			form.trigger("reset"); 
			form.find("select").each(function() {
				$(this).trigger("liszt:updated");
				if (null != $(this).attr("data-default-value")) {
					$(this).val($(this).attr("data-default-value")).trigger("liszt:updated");
				}
			});
			if ($.fn.iCheck instanceof Function) {
				form.find("input[type=radio], input[type=checkbox]").each(function() {
					if (this.checked) {
						$(this).iCheck('uncheck');
						$(this).iCheck('check');
					} else {
						$(this).iCheck('check');
						$(this).iCheck('uncheck');
					}
				});
			}
			if (isValid && ($.fn.isValid instanceof Function)) {
				$(this).isValid();
			}
		},
		
		/**
		 * 清空表单
		 */
		clearForm: function(form, isValid) {
			form.each(function() {
				var oForm = this;
				var elements = oForm.elements;
				//oForm.reset();
				for (var i = 0; i < elements.length; i++) {
					if($(elements[i]).attr("data-lock")!="true"){
						field_type = elements[i].type.toLowerCase();
						switch (field_type) {
							case "text" :
							case "password" :
							case "textarea" :
							case "hidden" :
								elements[i].value = "";
								break;
							case "radio" :
							case "checkbox" :
								if (elements[i].checked) {
									elements[i].checked = false;
								}
								break;
							case "select-one" :
							case "select-multi" :
								elements[i].selectedIndex = -1;
								break;
							default :
								break;
						}
					}
				}
				form.find("select").each(function() {
					$(this).trigger("liszt:updated");
				});
				if ($.fn.iCheck instanceof Function) {
					form.find("input[type=radio], input[type=checkbox]").each(function() {
						$(this).iCheck('check');
						$(this).iCheck('uncheck');
					});
				}
				if (isValid && ($.fn.isValid instanceof Function)) {
					$(this).isValid();
				}
			});
		},
		/**
		 * 将JSON对象填充至表单控件
		 * 给所有匹配元素集合赋值, 跟据元素的property从data中取值
		 * @param form: 表单
		 * @param data: JSON对象
		 * @param attr: 可选参数; 元素的属性(例如id, name等); 默认为name属性; 元素的该属性值要和data中的property对应
         */
		dataToForm: function(form, data, attr) {
			if (null == attr) {
				attr = "name";
			}
			for (var property in data) {
				if (data.hasOwnProperty(property)) {
					form.find("[" + attr + "='" + property + "']").each(function() {
		                if ((/radio/i).test($(this).attr("type"))) {
		                    if ($(this).val() == data[property]) {
		                    	$(this).attr("checked", "checked");
		                    }
		                } else if ((/checkbox/i).test($(this).attr("type"))) {
		                	if ($.isArray(data[property])) {
		                		for (var i = 0;i < data[property].length; i++) {
		                			if ($(this).val() == data[property][i]) {
				                    	$(this).attr("checked", "checked");
				                    }
		                		}
		                	} else {
		                		if ($(this).val() == data[property]) {
			                    	$(this).attr("checked", "checked");
			                    }
		                	}
		                } else if ($(this).is("select")) {
		                	$(this).val(data[property]).trigger("liszt:updated");
		                } else {
		                	$(this).val(data[property]);
		                }
					});
				}
			}
		},
		/**
		 * 将表单控件值填充至JSON对象
		 * 给所有匹配元素集合赋值, 跟据元素的property从form中取值
		 * @param form: 表单
		 * @param properties: 属性名称数据
		 * @param attr: 可选参数; 元素的属性(例如id, name等); 默认为name属性; 元素的该属性值要和properties中值对应
		 */
		formToData: function(form, properties, attr) {
			if (null == attr) {
				attr = "name";
			}
			var data = {};
			for (var i = 0; i < properties.length; i++) {
				var property = properties[i];
				form.find("[" + attr + "='" + property + "']").each(function() {
	                if ((/radio/i).test($(this).attr("type"))) {
	                    if ($(this).is("checked") == data[property]) {
	                    	data[property] = $(this).val();
	                    }
	                } else if ((/checkbox/i).test($(this).attr("type"))) {
	                	if (null == data[property]) {
	                		data[property] = new Array();
	                	}
	                    if ($(this).is("checked") == data[property]) {
	                    	data[property].push((this).val());
	                    }
	                } else {
	                	data[property] = $(this).val();
	                }
				});
			}
			return data;
		}
	};
};

PUI.Date = new function() {
	return {
		/**
		 * Formats the passed date using the specified format pattern.
		 */
		format: function(date, format) {
		  var o = {
		    "M+" : date.getMonth()+1, //month
		    "d+" : date.getDate(),    //day
		    "h+" : date.getHours(),   //hour
		    "m+" : date.getMinutes(), //minute
		    "s+" : date.getSeconds(), //second
		    "q+" : Math.floor((date.getMonth()+3)/3),  //quarter
		    "S" : date.getMilliseconds() //millisecond
		  };

		  if(/(y+)/.test(format)) {
			  format=format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
		  }
		  for(var k in o) {
			  if(new RegExp("("+ k +")").test(format)) {
				  format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
			  }
		  }
		  return format;
		}
	};
};

PUI.String = new function() {
	return {
		format: function(string, data) {
			var template = Handlebars.compile(string);
			return template(data || {});
		}
	};
};