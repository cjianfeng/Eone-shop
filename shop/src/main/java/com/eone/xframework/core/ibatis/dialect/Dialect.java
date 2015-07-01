package com.eone.xframework.core.ibatis.dialect;

public abstract class Dialect {
	public abstract String getLimitString(String paramString, int paramInt1,
			int paramInt2);
}
