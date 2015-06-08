package com.eone.xframework.pureui.view;

import java.util.List;

import com.eone.xframework.core.model.BaseView;

public class PageData extends BaseView {
	private PagingInfo page;
	private List<Object> list;

	public PagingInfo getPage() {
		return this.page;
	}

	public void setPage(PagingInfo page) {
		this.page = page;
	}

	public List<Object> getList() {
		return this.list;
	}

	public void setList(List<Object> list) {
		this.list = list;
	}
}
