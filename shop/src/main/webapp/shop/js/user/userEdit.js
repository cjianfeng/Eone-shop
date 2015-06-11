var userEdit = function() {
	var index = null;
	return {
		init : function() {
			//初始化
			sns.valid.init($("#userEditForm form"));
			PUI.plugin.init({}, $("#userEditForm form"));
			userEdit.initEvent();
		},
		initEvent : function() {
			// 绑定保存按钮点击事件
			$("#userBtnSave").on("click", function() {
				userEdit.save();
			});
			// 绑定取消按钮点击事件
			$("#userBtnCancel").on("click", function() {
				userEdit.cancel();
			});
		},
		save : function() {
			//栏位非空检验
			var editorForm = $("#userEdit_content form");
			if(editorForm.isValid()) {
				var param = $("#userEditForm").serialize();
				$.post("user/save.shtml",param,function(data){
					PUI.MessageBox.info("保存成功");
					$("#userPop").popup({display:false});
					userQuery.query();
				});
			}
		},
		cancel: function() {
			$("#userPop").popup({display:false});
		}
	}
}();
