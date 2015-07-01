package com.eone.xframework.core.ibatis.dialect;

public class MySqlDialect extends Dialect {
	public String getLimitString(String sql, int offset, int limit) {
		sql = sql.trim();
		StringBuffer pagingSelect = new StringBuffer(sql.length() + 100);

		pagingSelect.append("select * from (  ");

		pagingSelect.append(sql);

		pagingSelect.append(" ) _t LIMIT ").append(offset).append(" ,")
				.append(limit);

		return pagingSelect.toString();
	}
}