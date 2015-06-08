package com.eone.xframework.pureui.utils;


import com.eone.xframework.core.Pagination;
import com.eone.xframework.pureui.view.JSONMessage;
import com.eone.xframework.pureui.view.PageData;
import com.eone.xframework.pureui.view.PagingInfo;

public class MessageUtils {
	public static JSONMessage createPageMsg(Pagination page) {
		return createPageMsg(page, Boolean.valueOf(true), "");
	}

	public static JSONMessage createPageMsg(Pagination page, Boolean result,
			String msg) {
		JSONMessage messageView = new JSONMessage();

		PageData dataView = new PageData();
		dataView.setList(page.getData());

		PagingInfo pageView = new PagingInfo();
		pageView.setCurrentPage(page.getRowBounds().getPageNumber());
		pageView.setTotalPage(page.getPageTotal());
		pageView.setCurrentCount(page.getData().size());
		pageView.setLimitCount(page.getRowBounds().getLimit());
		pageView.setTotalCount(page.getTotal());
		dataView.setPage(pageView);

		messageView.setData(dataView);
		messageView.setMsg(msg);
		messageView.setResult(result);
		return messageView;
	}
}
