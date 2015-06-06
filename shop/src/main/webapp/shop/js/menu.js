/** 菜单 */
var Menu = function() {
	return {
		forward: function(url) {
			$.post(url, {}, function(data) {
				$("#shopMainPanel").html(data);
			});
		}
	};
}();