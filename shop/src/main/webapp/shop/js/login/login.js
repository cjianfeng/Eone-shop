$(function(){
	////初始化复选
  $(':checkbox').iCheck({
      checkboxClass: 'icheckbox_minimal',
      radioClass: 'iradio_minimal',		
      increaseArea: '20%' // optional
  });
  //错误提示
	var errorMsg=$.trim($("#errorMsg").val());
	if(errorMsg!=""){
		$("#alert_msg").empty().append("<div class='alert alert-error'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong></strong> "+errorMsg+"</div>");
	}
	
});

document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
//     if(e && e.keyCode==13){ // enter 键
//    	 Login.login();
//    }
}; 
var Login = function(){
	
	return{
		/**登录*/
		login : function(){
			if ($("#username").val() == ""){
					$("#alert_msg").empty().append("<div class='alert alert-error'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong></strong> 用户名不能为空</div>");
				return;
			} else if ($("#password").val() == ""){
					$("#alert_msg").empty().append("<div class='alert alert-error'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong></strong> 密码不能为空</div>");
				return;
			} else {
				/***设置cookie*/
				if ($("#remember-me").attr("checked")) {
					var account = $("#username").val();
					if (account && account.length > 0) {
						setCookie("userName", account, 4, "/");
						setCookie("userPassword", $("#password")
								.val(), 4, "/");
					}
				} else {
					var account = $("#username").val();
					setCookie("userName", account, 4, "/");
					deleteCookie("userPassword", "/");
				}
				$("#loginForm").submit();
			}
		}
	}
}();