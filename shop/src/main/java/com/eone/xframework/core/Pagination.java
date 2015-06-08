package com.eone.xframework.core;

import java.io.Serializable;
import java.util.List;

import com.eone.xframework.core.exception.FrameworkException;

public class Pagination implements Serializable{
	private int total = 0;
	private List<Object> data;
	private RowBounds rowBounds;

	public Pagination(RowBounds rowBounds, int total) {
		this.rowBounds = new RowBounds(rowBounds.getPageNumber(),
				rowBounds.getLimit());
		this.total = total;
	}

	public Pagination(RowBounds rowBounds, int total, List<Object> data) {
		this.rowBounds = new RowBounds(rowBounds.getPageNumber(),
				rowBounds.getLimit());
		this.total = total;
		setData(data);
	}

	public RowBounds getRowBounds() {
		return new RowBounds(this.rowBounds.getPageNumber(),
				this.rowBounds.getLimit());
	}

	public List<Object> getData() {
		return this.data;
	}

	public void setData(List<Object> data) {
		this.data = data;
		if ((data != null) && (data.size() > this.total))
			throw new FrameworkException("data.size>total.please check total.");
	}

	public int getTotal() {
		return this.total;
	}

	public int getPageTotal() {
		int size = this.rowBounds.getLimit();
		return (int) Math.ceil(this.total * 1.0D / size);
	}
}
