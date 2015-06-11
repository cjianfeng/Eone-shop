<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<!DOCTYPE html>
<html>
    <head>
        <%@ include file="/shop/common.jsp" %>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>商城登录</title>
        <link rel="shortcut icon" href="shop/img/favicon.ico"/>
		<link rel="Bookmark" href="shop/img/favicon.ico"/>
        <style type="text/css">
        body {
            background-color: #f5f5f5;
        }
        
        .container {
            padding-top: 40px;
            padding-bottom: 40px;
        }
        
        .form-signin {
            max-width: 300px;
            padding: 19px 29px 29px;
            margin: 0 auto 20px;
            background-color: #fff;
            border: 1px solid #e5e5e5;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, .05);
            -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, .05);
            box-shadow: 0 1px 2px rgba(0, 0, 0, .05);
        }
        
        .form-signin .form-signin-heading,.form-signin .checkbox {
            margin-bottom: 10px;
        }
        
        .form-signin input[type="text"],.form-signin input[type="password"] {
            font-size: 16px;
            height: auto;
            margin-bottom: 15px;
            padding: 7px 9px;
        }
        
        #remember-me-label {
            padding-left: 0px;
        }
        
        #remember-me-label>div {
            display: inline-block !important;
        }
        
        .icheckbox_minimal {
            top: 4px;
        }
        
        .controls i {
            top: 11px;
        }
        
        .clearfix a {
            margin-top: 5px;
        }
        .lgFont{
        	font-weight:400;
        	color:black;
        	font-family:'微软雅黑';
        	text-align:right;
        	height:26px;
        }
        .bottombtn{
        		text-align:right;
        		font-weight:bold;
        }
        .napas{
        		text-align:right;
        		height:20px;
        		line-height:20px;
        }
        </style>
        <script type="text/javascript" src="shop/js/login/cookieUtil.js"></script>
        <script type="text/javascript" src="shop/js/login/login.js"></script>
    </head>
    <body>
    <div style="width:100%;height:100px; background:#FFCC00;">
    	<img src="shop/img/Eone.png" style="margin-left:40px;margin-top:10px;">
    </div>
        <div class="container">
            <form id="loginForm" class="form-signin" action="login/logineone.shtml" method="post">
                <span style="font-faimly:'微软雅黑';font-size:14px;color:#B9C1CF">登录</span>
				<hr style="margin-top:0px;width:298px;color:#B9C1CF;border:1px solid"/>
                    <label>
                        <span class="block" id="alert_msg">
                        </span>
                    </label>
                    <label>
                        <span class="block input-icon input-icon-right">
                            <input type="hidden" id="errorMsg" class="input-block-level" value="${errorMsg}">
                        </span>
                    </label>
                   <!--  <div class="controls">
	                     <span class="lgFont" style="margin-left:9px;">Login Id</span>
	                     <input type="text" style="width:200px;height:10px;margin-left:0px;"/>
                    </div>
                    <div class="controls">
                        <span class="lgFont">Password</span>
                        <input type="text" style="width:200px;height:10px;"/>
                    </div> -->
                    <table cellpadding="5">
                    	<tr>
                    		<td class="napas">
                    		<label class="lgFont">用户名</label>
                    		</td>
                    		<td>
                    		<input id="username" name="username" type="text" style="width:200px;height:10px;"/>
                    		</td>
                    	</tr>
                    	<tr>
                    		<td class="napas">
                    		<label class="lgFont">密码</label>
                    		</td>
                    		<td>
                    		<input id="password" type="password" name="password" style="width:200px;height:10px;"/>
                    		</td>
                    	</tr>
                    	<tr>
                    		<td>
                    		
                    		</td>
                    		<td class="bottombtn">
                    		 <input type="button"  class="btn btn-info btn-small" style="background-color:#FFCC00" onclick="Login.login()" value="登录"/>
                          	 <input type="reset"  class="btn btn-info btn-small" style="background-color:#FFCC00" onclick="" value="重置"/>
                    		</td>
                    	</tr>
                    </table>
                  
                      <!-- <div class="space" style="height:10px;"></div>

                 <div class="clearfix">
                         <label id="remember-me-label" class="checkbox inline">
                            <input type="checkbox" id="remember-me" value="remember-me"> 记住密码
                        </label> 
						
                        <a onclick="Login.login()">
                          Login
                        </a>
                        <a onclick="">
                          Reset
                        </a>
                    </div>
                    <div class="space-4" style="height:20px;"></div>-->
               
            </form>
            </div>
    </body>
</html>