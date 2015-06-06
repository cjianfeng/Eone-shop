var PuiUpload = function () {
	var defaults = {
		widthClass: "span5",
		title: '上传',
		url: '',
		extraData: null,
		beforeShow: function(form) {
			return true;
		},
		beforeSend: function(form) {
			return true;
		},
		success: function() {
			PUI.MessageBox.info('上传成功', null, {autoClose: true, timeOut: 997, afterClose: function() {
			}});
		},
		error: function() {
			PUI.MessageBox.error('上传失败');
		}
	};
	var template = null;
	return {
		init: function() {
			
			var scripts = document.getElementsByTagName('script'),
				path, i, ln, scriptSrc, match;
			var src = null;
			for (i = 0, ln = scripts.length; i < ln; i++) {
		        scriptSrc = scripts[i].src;
		
		        match = scriptSrc.match(/js\/jquery.upload\.js$/);
		
		        if (match) {
		            path = scriptSrc.substring(0, scriptSrc.length - match[0].length);
		            break;
		        }
		    }
			
			var html = '';
			html += '<div id="pui-upload-temple">';
			html += '<div class="win {{widthClass}}" id="pui-upload-{{id}}">';
			html += '    <div class="win-header">';
			html += '        <span>{{title}}</span> <i class="close">&times;</i>';
			html += '	 </div>';
			html += '	 <div class="win-content">';
			html += '        <div class="form-search">';
			html += '            <form id="pui-form-{{id}}" style="margin-bottom: 0px;" action="{{url}}" method="post" enctype ="multipart/form-data" target="upload-iframe-{{id}}">';
			html += '            {{#each extraData}}';
			html += '                <input type="hidden" name="{{this.name}}" value="{{this.value}}">';
			html += '            {{/each}}';
			html += '                <div class="row-fluid" style="height:30px; overflow: hidden;">';
			html += '                    <div class="input-append customfile">';
			html += '                        <div class="customfile-feedback" style="float: left;">选择文件...</div>';
			html += '                        <div class="add-on customfile-button customfile-input-color" style="float: left;">浏览</div>';
			html += '                        <input type="file" id="file" name="file" class="customfile-input span12" style="cursor: pointer;">';
			html += '                    </div>';
			html += '                </div>';
			html += '            </form>';
			html += '            <div class="form-search-btn">';
			html += '                <a id="pui-btn-upload-{{id}}" class="btn btn-info" href="javascript:void(0)"><i class="icon-cloud-upload"></i>上传</a>';
			html += '                <a id="pui-btn-cancel-{{id}}" class="btn btn-warning" href="javascript:void(0)"><i class="icon-undo"></i>取消</a>';
			html += '            </div>';
			html += '        </div>';
			html += '    </div>';
			html += '</div>';
			html += '<iframe id="upload-iframe-{{id}}" name="upload-iframe-{{id}}" style="width:0px; height: 0px;" src="">';
			html += '</iframe>';
			html += '</div>';
			
			template  = Handlebars.compile(html);
			
			$.fn.upload = function(options) {
				var me = $(this);
				me.bind("click", function() {
					if (!me.is("[readonly]") && !me.is("[disabled]")) {
						PuiUpload.load(options, me);
					}
				});
				return me;
			};
		},
		load: function(options, selector) {
			$("#pui-upload-temple").remove();
			if (null == template) {
				return;
			}
			var id =  new Date().getTime() + '-' + parseInt(Math.random() * 100000);
			var data = {};
			data = $.extend(data, defaults);
			data = $.extend(data, {id: id}, options);
			var html = template(data);
			$(html).appendTo("body");
			var _upload = $("#pui-upload-" + id);
			var _form = $("#pui-form-" + id);
			var _feedback = _upload.find(".customfile-feedback");
			var _button = _upload.find(".customfile-button");
			var _input = _form.find(".customfile-input");
			
			/*_button.bind("click", function() {
				_input.trigger("click");
		    });
			
			_feedback.bind("click", function() {
				_input.trigger("click");
		    });*/
		    
			_input.bind("change", function() {
		        if (null != $(this).val() && $.trim($(this).val()) != '') {
		        	_feedback.text($(this).val());
		            if (!_feedback.is(".customfile-feedback-populated")) {
		            	_feedback.addClass("customfile-feedback-populated");
		            }
		        }
		    });
			
			if (!data.beforeShow.call(this, _form)) {
				return;
			}
			
			_upload.popup({md: false});
			
			_button.hover(
		    	function() {
		    	    $(this).removeClass("customfile-input-color");
		        },
		        function() {
		            $(this).addClass("customfile-input-color");
		        }
		    );
		    
		    var addHandler = function (element, type, handler) {
		        if (element.addEventListener) {
		            element.addEventListener(type, handler, false);
		        } else if (element.attachEvent) {
		            element.attachEvent("on" + type, handler);
		        } else {
		            element["on" + type] = handler;
		        }
		    };
		    
		    // ------------------------------------监听表单重置事件 Start------------------------------------
		    _form.each(function() {
		        var oForm = this;
		        addHandler(oForm, "reset", function (e) {
		        	_feedback.removeClass("customfile-feedback-populated");
		        	_feedback.text(i18n('info.wmsportal.register.noFileSelected'));
		        });
            });
		    // ------------------------------------监听表单重置事件 End------------------------------------
		   
		    _feedback.css("width", _form.width() - _button.width() - 39);
		    _upload.resize(function() {
		    	_feedback.css("width", _form.width() - _button.width() - 39);
		    });
			
		    // 上传
			$("#pui-btn-upload-" + id).bind("click", function() {
				try {
					
					if (_input.val() == '') {
						return;
					}
					
					if (!data.beforeSend.call(this, _form)) {
						return;
					}
					
					block();
					
					
					var callback = function() {
						var io = document.getElementById("upload-iframe-" + id);
						var iframeDoc = io.contentWindow ? io.contentWindow.document : io.contentDocument;
						if ($(iframeDoc).find("form").length == 0) {
							var responseText = $(iframeDoc.body).text();
							if (null != responseText && responseText != "") {
								unblock();
								responseText = eval("(" + responseText + ")");
								if (responseText.result) {
									data.success.call(this,responseText);
									$("#pui-btn-cancel-" + id).trigger("click");
								} else {
									data.error.call(this,responseText);
								}
								$(iframeDoc.body).empty();
								return;
							}
						}
						setTimeout(function() {
							callback();
						}, 500);
					};

					_form.submit();
					
					callback();
				} catch(e) {
					data.error.call(this);
					unblock();
				}
			});
			
			// 取消
			$("#pui-btn-cancel-" + id).bind("click", function() {
				_upload.hide();
				$("#pui-upload-temple").remove();
			});
		}
	};
}();
PuiUpload.init();