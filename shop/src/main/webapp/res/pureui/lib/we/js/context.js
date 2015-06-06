(function ($) {
	window.context = {
	    isAnimate: false
	};
	
	var scripts = document.getElementsByTagName("script"),
	    path=null, i, ln, scriptSrc, match;
	
	for (i = 0, ln = scripts.length; i < ln; i++) {
	    scriptSrc = scripts[i].src;
	
	    match = scriptSrc.match(/js\/context\.js$/);
	
	    if (match) {
	        path = scriptSrc.substring(0, scriptSrc.length - match[0].length);
	        break;
	    }
	}
	
	var lang = $("html").attr("lang");
	lang = (null == lang || lang == "") ? "zh-cn" : lang;
	$.ajax({
		type: "GET",
		url: path + "lang/" + lang + ".js",
		dataType: "script",
		async: false
	});
})(jQuery);
