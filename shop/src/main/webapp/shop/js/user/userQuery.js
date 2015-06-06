var userQuery = function(){
	var _mmg = null;
	return {
		init : function() {
			PUI.plugin.init({}, $("#conditionForm"));
			//初始化表格
			var _cols = [{ title :'代码',name:'code', width : 90, align : 'center',sortable : true, type : 'string'},
			            { title :'名称',name:'name', width : 90, align : 'center',sortable : true, type : 'string'},
						{ title :'排序',name:'sequenceNo', width : 90, align : 'center',sortable : true, type : 'string'},
						{ title :'描述',name:'description', width : 90, align : 'center',sortable : true, type : 'string'},
						{ title :'id',name:'id', width : 50, align : 'center',sortable : true, type : 'int',hidden:true}];
				_mmg = $("#mmg").mmGrid({
				height : getAutoHeightByMmGrid($(".page-content")),
				width : 'auto',
				cols : _cols,
				url : 'shop/user/page.shtml',
			 	params : $("#conditionForm").serialize(),
				method : 'post',
				nowrap : true,
				checkCol : true,
				autoLoad : true,
				sortStatus : 'desc',
				fullWidthRows : true,
				cache : false,
				multiSelect : true,
				plugins : [$('#pg').mmPaginator({})]
			});
		},
		query : function() {
			  _mmg.load($("#conditionForm").serialize());
		},
		reset : function() {
			 PUI.util.resetForm($("#conditionForm"));
		},
		add : function() {
			userEdit.index = null;
			$("#user_content").html(PUI.String.format($("#module-type-template").html(), {}));
			userEdit.init();
			$("#userPop").popup();

		},
		edit :function() {
			if (_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请先选中一条记录");
				return;
			}
			userEdit.index = _mmg.selectedRowsIndex()[0];
			var item = _mmg.selectedRows()[0];
			$("#user_content").html(PUI.String.format($("#module-type-template").html(), item));
			userEdit.init();
			$("#userPop").popup();
		},
		del : function() {
			if (_mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			var item = _mmg.selectedRows();
			var param = "";
			for(var i=0;i<item.length;i++) {
				var row = item[i];
				if(undefined == row || null == row) {
					continue;
				}
				param = param + "user["+i+"].id="+row.id;
				if(i < item.length-1){
					param = param + "&";
				}
			}
			$.post("shop/user/delete.shtml",param,function(data){
				userQuery.query();
				PUI.MessageBox.alert("删除成功");
			});
		}
	}
}();

$().ready(function(){
	userQuery.init();
});