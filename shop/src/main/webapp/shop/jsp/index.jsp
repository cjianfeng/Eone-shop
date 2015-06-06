<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>	
<!DOCTYPE html>
<html>
	<head>
		<%@ include file="/shop/common.jsp" %>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>首页</title>
  		<script src="shop/js/index.js" type="text/javascript"></script>
	</head>
	<body>
		<!-- 头部 -->
		<jsp:include page="/shop/top.jsp"></jsp:include>
		<div class="main-container container-fluid">
			<!-- menu菜单 -->
            <a href="#" id="menu-toggler" class="menu-toggler">
                <span class="menu-text"></span>
            </a>                
            <div id="sidebar" class="sidebar" style="">
            <%@ include file="/shop/menu.jsp" %>
            </div>
			<!-- 局刷区域：默认配送单跟踪 -->
			<div class="main-content">
				<div id="breadcrumbs" class="breadcrumbs">
					<ul class="breadcrumb">
						<li><i class="icon-home home-icon"></i><a href="#">首页</a> <span class="divider"><i class="icon-angle-right arrow-icon"></i></span></li>
						<li class="active"></li>
					</ul>
				</div>
				<div class="page-content" id="shopMainPanel">
				</div>
			</div>
		</div><!--/.main-container-->
		<!-- 底部 -->
		<jsp:include page="/shop/bottom.jsp"></jsp:include>
	</body>
</html>
