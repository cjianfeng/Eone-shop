1.清空内容
$(".chzn-select option").removeAttr("selected");
$(".chzn-select").trigger("liszt:updated");
2.属性
$(".chzn-select").chosen({
	disable_search_threshold: 10, //小于10个option时,隐藏搜索
	no_results_text: "Oops, nothing found!",//未搜索到,提示信息
	width: "95%",//宽度
	max_selected_options: 5,//最多只能选择5个
	search_contains:"*"//value和text双重过滤
});
3.输入前的提示信息
<select data-placeholder="请选择城市..." class="chzn-select">
...
</select>