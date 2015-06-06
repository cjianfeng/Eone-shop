<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-search"></i>查询条件</span> 
		<span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-form">
			<div class="form-toolbar">
				<a class="btn btn-info" href="javascript:userQuery.query();">
					<i class="icon-search"></i>查询
				</a> 
				<a class="btn btn-danger" href="javascript:userQuery.reset();">
					<i class="icon-repeat"></i>重置
				</a>
				<a class="btn btn-info" href="javascript:userQuery.add();">
					<i class="icon-plus"></i>新增
				</a>
				<a class="btn btn-info" href="javascript:userQuery.edit();">
					<i class="icon-edit"></i>编辑
				</a>
				<a class="btn btn-danger" href="javascript:userQuery.del();">
					<i class="icon-remove"></i>删除
				</a>
			</div>
			<form class="form-horizontal" id="conditionForm">
				<div class="row-fluid ">
					<div class="span4 control-group full">
						<label class="control-label" for="">名称</label>
						<div class="controls txt">
							<input id="name" type="text" name="condition.name" >
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

<div class="widget-box">
	<div class="widget-header">
		<span class="widget-title"><i class="icon-list"></i>类型列表</span> <span class="widget-toolbar"><a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a></span>
	</div>
	<div class="widget-body">
		<div class="widget-grid">
			<!-- mmGrid -->
			<table id="mmg" class="mmg">
				<tr>
					<th rowspan="" colspan=""></th>
				</tr>
			</table>
			<div id="pg" style="text-align: right;"></div>
		</div>
	</div>
</div>

<!-- 弹出框  用户信息-->
<div class="row-fluid ">
	<div id="userPop" class="win span6">
		<div class="win-header">
             <span>组件类型</span> <i class="close">&times;</i>
        </div>
        <div class="win-content" id="user_content">
        </div>
	</div>
</div>

<div id="module-type-template" style="display: none;">
    <%@ include file="userEdit.jsp" %>
</div>

<script type="text/javascript" src="shop/js/user/userQuery.js"></script>