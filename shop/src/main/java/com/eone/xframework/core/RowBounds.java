package com.eone.xframework.core;

import java.io.Serializable;

public class RowBounds extends org.apache.ibatis.session.RowBounds implements
		Serializable {
	private int offset = NO_ROW_OFFSET;

	private int limit = NO_ROW_LIMIT;

	private int pageNumber = 0;

	public RowBounds() {
	}

	public RowBounds(int pageNumber, int pageSize) {
		// TODO:分页断点bug入口2：用不用super，父类的RowBounds的offset和limit参数都不会改变
		//super((pageNumber - 1) * pageSize, pageSize);
		this.limit = pageSize;
		this.pageNumber = pageNumber;
		this.offset = ((pageNumber - 1) * pageSize);
	}

	public int getLimit() {
		return this.limit;
	}

	public int getOffset() {
		return this.offset;
	}

	public int getPageNumber() {
		return this.pageNumber;
	}
}
