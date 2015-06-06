(function($){
	
	$.fn.extend({
		serialize: function() {
			return $.param( this.serializeArray() );
		},
		serializeArray: function() {
			var rCRLF = /\r?\n/g;
			var rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i;
			var rsubmittable = /^(?:input|select|textarea|keygen)/i;
			var manipulation_rcheckableType = /^(?:checkbox|radio)$/i;
			var i = {};
			var h = function(elem) {
				if (elem.name.indexOf('.') == -1) {
					return { name: elem.name, value: $( elem ).val().replace( rCRLF, "\r\n" ) };
				}
				var o = elem.name.substring(0, elem.name.indexOf('.'));
				var p = elem.name.substring(elem.name.indexOf('.') + 1);
				var v = $( elem ).val().replace( rCRLF, "\r\n" );
				var u = $(elem).attr("data-unique-serialize-rowId");
				if (i[p] == undefined) {
					i[p] = {};
					i[p][u] = 0;
					i[p]["jquery-current-array-max-index"] = 0;
				}
				if (i[p][u] == undefined) {
					i[p]["jquery-current-array-max-index"]++;
					i[p][u] = i[p]["jquery-current-array-max-index"];
				}
				return eval("(" + "{name:'" + o + "[" + i[p][u] +"]." + p + "', value:'" + v + "'}" + ")");
			};
			return this.map(function(){
				// Can add propHook for "elements" to filter or add form elements
				var elements = $.prop( this, "elements" );
				return elements ? $.makeArray( elements ) : this;
			})
			.filter(function(){
				var type = this.type;
				// Use .is(":disabled") so that fieldset[disabled] works
				return this.name && !$( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !manipulation_rcheckableType.test( type ) );
			})
			.map(function( i, elem ){
				var val = $( this ).val();
				return val == null ?
					null :
					$.isArray( val ) ?
						$.map( val, function( val ){
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						}) : $( this ).attr("data-unique-serialize-rowId") != undefined ? h(this) : 
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			}).get();
		},
		attr: function( name, value ) {
			var o = jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
			if (name == "disabled" && $(this).is("select") && $(this).hasClass("chzn-select")) {
				$(this).trigger("chosen:refresh");
			}
			return o;
		},
		removeAttr: function( name ) {
			var o = this.each(function() {
				jQuery.removeAttr( this, name );
			});
			if (name == "disabled" && $(this).is("select") && $(this).hasClass("chzn-select")) {
				$(this).trigger("chosen:refresh");
			}
			return o;
		}
	});
	
	// 遮罩
	$(document).ready(function(){
		var scripts = document.getElementsByTagName('script'),
			path=null, i, ln, scriptSrc, match;
//		var src = null;
		for (i = 0, ln = scripts.length; i < ln; i++) {
	        scriptSrc = scripts[i].src;
	
	        match = scriptSrc.match(/js\/jquery.pui\.js$/);
	
	        if (match) {
	            path = scriptSrc.substring(0, scriptSrc.length - match[0].length);
	            break;
	        }
	    }
		
		var lyr1 = $('<div class="PUI-ajax-block" style="z-index: 1000; border: medium none; margin: 0px; padding: 0px; ' +
			'width: 100%; height: 100%; top: 0px; left: 0px; background-color: rgb(0, 0, 0);' +
			'cursor: wait; position: fixed;"> ' +
			'</div>');
		lyr1.css('opacity', '0.3');
		var lyr2 = $('<div class="PUI-ajax-block" style="z-index: 1011; position: fixed; padding: 5px; margin: 0px; display: none;' +
			'width: 150px; top: 40%; left:' + ($(window).width() - 166) / 2 + 'px; text-align: center; color: rgb(0, 0, 0); ' +
			'border: 3px solid #777777; ' +
			'background-color: rgb(255, 255, 255); cursor: wait;">' +
			'<img style="margin-right: 3px; margin-top: -5px; vertical-align: middle;" src="' + path + '/img/busy.gif"> ' + context.lang.block.waitTitle +
			'</div>');
		
		var f = true;
		var block = function() {
			lyr1.css({"cursor": "wait"});
			if ($(".PUI-ajax-block").length == 0 || $(".PUI-ajax-block:eq(0):hidden").length == 1) {
				lyr1.appendTo("body");
				lyr2.appendTo("body");
				$(".PUI-ajax-block").fadeIn(context.isAnimate ? 200 : 0);
			} else {
				f = false;
			}
		};
		window.block = block;
		var unblock = function() {
			f = true;
			setTimeout(function() {
				if (f) {
					lyr1.css({"cursor": "default"});
					$(".PUI-ajax-block").fadeOut(context.isAnimate ? 400 : 0);
				}
			}, context.isAnimate ? 400 : 0);
		};
		window.unblock = unblock;
		$(document).ajaxStart(block).ajaxStop(unblock);
		$(window).resize(function () {
			if ($(".PUI-ajax-block").length != 0) {
				$(".PUI-ajax-block:eq(1)").css({
					top: '40%',
					left: ($(window).width() - 166) / 2
		        });
			}
	    });
	});
})(jQuery);