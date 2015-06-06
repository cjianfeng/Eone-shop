(function ($) {
	$.extend(context || {}, {
		lang: {
			messageBox: {
				alert: {
					title: "Warn",
					buttons: ["OK"]
				},
				info: {
					title: "Information",
					buttons: ["OK"]
				},
				error: {
					title: "Error",
					buttons: ["OK"]
				}
			},
			xwin: {
				select: {
					placeholder: "Please select..." // 请选择...
				},
				buttons: [
				    "Query", // 查询
				    "Reset"  // 重置
				]
			},
			block: {
				waitTitle: "Please Wait..."
			},
			chosen:{
				multiple_text: "Select Some Options",
				single_text: "Select an Option",
				no_result_text: "No results match"
			},
			grid: {
				displayColumn: "Display Column", // 显示列
				noRecordsFound: "No records found", // 没有数据
				indexText: "index", // 行号
				unDefineTitle: "Un define title", // 未命名
				// 表格ajax请求，后台返回不是对象
				ajaxErrMsg1: "Ajax request form, the background is not an object returned.",
				// 表格ajax请求，后台返回result为false,msg信息：
				ajaxErrMsg2: "Ajax request form, backstage return result is false, msg information.",
				// 表格ajax请求，后台返回的list不是数组
				ajaxErrMsg3: "Ajax request form, the background is not an array returned list.",
				// 表格ajax请求，后台报错或者网络中断了！
				ajaxErrMsg4: "Ajax request form, the background or network error interrupted!",
				loadMask: "Loading...", // 正在载入...
				pageIndex: "Page {0}", // 第{0}页
				nextPage: "Next" // 下一页
			}
		}
	});
})(jQuery);