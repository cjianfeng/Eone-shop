<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<div class="form-search">
	<div class="form-toolbar">
		<a id="userBtnSave" class="btn btn-info save" href="javascript:void(0)"><i class="icon-save"></i>保存</a>
		<a id="userBtnCancel" class="btn btn-warning cancel" href="javascript:void(0)"><i class="icon-undo"></i>取消</a>
	</div>
	<div id="userEdit_content" class="widget-form">
		<form class="form-horizontal" id="userEditForm">
			<input id="userId" type="hidden" name="userModel.id" value="{{id}}">
			<div class="row-fluid ">
				<div class="span12 control-group full">
					<label class="control-label">名称</label>
					<div class="controls txt">
						<input type="text" name="userModel.name" value="{{name}}" max="100" data-required="此项必填" />
					</div>
				</div>
			</div>
			<div class="row-fluid ">
				<div class="span6 control-group full">
					<label class="control-label">代码</label>
					<div class="controls txt">
						<input type="text" name="userModel.code" value="{{code}}" max="100" data-required="此项必填" />
					</div>
				</div>
				<div class="span6 control-group full">
					<label class="control-label">排序</label>
					<div class="controls txt">
						<input type="text" name="userModel.sequenceNo" value="{{sequenceNo}}" max="10" >
					</div>
				</div>
			</div>
			<div class="row-fluid ">
				<div class="span12 control-group full">
					<label class="control-label">描述</label>
					<div class="controls txt">
						<input type="text" name="userModel.description" value="{{description}}" max="1000" />
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
<script type="text/javascript" src="shop/js/user/userEdit.js"></script>