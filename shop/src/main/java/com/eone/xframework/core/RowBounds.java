package com.eone.xframework.core;

import java.io.Serializable;

public class RowBounds extends org.apache.ibatis.session.RowBounds implements
		Serializable {
	private int offset = 0;

	private int limit = 2147483647;

	private int pageNumber = 0;

	public RowBounds() {
	}

	public RowBounds(int pageNumber, int pageSize) {
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
