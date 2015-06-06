<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*" %>
<%@page import="java.util.Iterator"%>
<%@page import="java.util.Map.Entry"%>
<%@ include file="common_head.jsp" %>
<%@ include file="common_resource.jsp" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%
	response.setHeader("Pragma","No-cache");
	response.setHeader("Cache-Control","no-cache");
	response.setDateHeader("Expires", 0);
%>

<script type="text/javascript" src="<%=basePath %>res/pureui/lib/bootstrap.js"></script>

<script type="text/javascript" src="<%=basePath %>shop/js/util.js"></script>
