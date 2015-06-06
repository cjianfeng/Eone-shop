(function ($) {
	$.extend(context || {}, {
		lang: {
			messageBox: {
				alert: {
					title: "\u8b66\u544a", // 警告
					buttons: ["\u786e\u5b9a"] // 确定
				},
				info: {
					title: "\u4fe1\u606f", // 信息
					buttons: ["\u786e\u5b9a"] // 确定
				},
				error: {
					title: "\u9519\u8bef", // 错误
					buttons: ["\u786e\u5b9a"] // 确定
				}
			},
			xwin: {
				select: {
					placeholder: "\u8bf7\u9009\u62e9..." // 请选择...
				},
				buttons: [
				    "\u67e5\u8be2", // 查询
				    "\u91cd\u7f6e"  // 重置
				]
			},
			block: {
				waitTitle: "\u5904\u7406\u4e2d\uff0c\u8bf7\u7a0d\u540e..."
			},
			chosen:{
				multiple_text: "\u9009\u62e9\u4e00\u4e9b\u9009\u9879", // 选择一些选项
				single_text: "\u9009\u62e9\u4e00\u4e2a\u9009\u9879", // 选择一个选项
				no_result_text: "\u6ca1\u6709\u5339\u914d\u7684\u7ed3\u679c" // 没有匹配的结果
			},
			grid: {
				displayColumn: "\u663e\u793a\u5217", // 显示列
				noRecordsFound: "\u6ca1\u6709\u6570\u636e", // 没有数据
				indexText: "\u884c\u53f7", // 行号
				unDefineTitle: "\u672a\u547d\u540d", // 未命名
				// 表格ajax请求，后台返回不是对象
				ajaxErrMsg1: "\u8868\u683cajax\u8bf7\u6c42\uff0c\u540e\u53f0\u8fd4\u56de\u4e0d\u662f\u5bf9\u8c61",
				// 表格ajax请求，后台返回result为false,msg信息：
				ajaxErrMsg2: "\u8868\u683cajax\u8bf7\u6c42\uff0c\u540e\u53f0\u8fd4\u56deresult\u4e3afalse,msg\u4fe1\u606f\uff1a",
				// 表格ajax请求，后台返回的list不是数组
				ajaxErrMsg3: "\u8868\u683cajax\u8bf7\u6c42\uff0c\u540e\u53f0\u8fd4\u56de\u7684list\u4e0d\u662f\u6570\u7ec4",
				// 表格ajax请求，后台报错或者网络中断了！
				ajaxErrMsg4: "\u8868\u683cajax\u8bf7\u6c42\uff0c\u540e\u53f0\u62a5\u9519\u6216\u8005\u7f51\u7edc\u4e2d\u65ad\u4e86\uff01",
				loadMask: "\u6b63\u5728\u8f7d\u5165...", // 正在载入...
				pageIndex: "\u7b2c{0}\u9875", // 第{0}页
				nextPage: "\u4e0b\u4e00\u9875" // 下一页
			}
		}
	});
})(jQuery);