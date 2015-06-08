package com.eone.xframework.pureui.view;

import com.eone.xframework.core.RowBounds;

public class PagingCondition extends Condition {
	protected int pageIndex;
	protected int pageSize;

	public int getPageIndex() {
		return this.pageIndex;
	}

	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

	public int getPageSize() {
		return this.pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public RowBounds buildBounds() {
		return new RowBounds(this.pageIndex, this.pageSize);
	}
}
