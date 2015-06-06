<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script type="text/javascript" src="shop/js/menu.js"></script>   
<div id="sidebar-shortcuts" class="sidebar-shortcuts">
    <div id="sidebar-shortcuts-large" class="sidebar-shortcuts-large">
        <button class="btn btn-small btn-success">
            <i class="icon-signal"></i>
        </button>

        <button class="btn btn-small btn-info">
            <i class="icon-pencil"></i>
        </button>

        <button class="btn btn-small btn-warning">
            <i class="icon-group"></i>
        </button>

        <button class="btn btn-small btn-danger">
            <i class="icon-cogs"></i>
        </button>
    </div>

    <div id="sidebar-shortcuts-mini" class="sidebar-shortcuts-mini">
        <span class="btn btn-success"></span>

        <span class="btn btn-info"></span>

        <span class="btn btn-warning"></span>

        <span class="btn btn-danger"></span>
    </div>
</div>
<ul class="nav nav-list">
    <li class="">
        <a class="" href="javascript:void(0)">
            <i class="icon-cogs"></i><span class="menu-text">用户管理</span><b class="arrow icon-angle-down"></b>
        </a>
        <ul class="submenu">
            <li class="">
                <a href="javascript:void(0)" onclick="Menu.forward('shop/jsp/user/userQuery.jsp');">
                    <i class="icon-double-angle-right"></i>用户信息
                </a>
            </li>
        </ul>
    </li>
</ul>
<div id="sidebar-collapse" class="sidebar-collapse">
    <i class="icon-double-angle-left"></i>
</div>