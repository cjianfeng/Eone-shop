package com.eone.xframework.core.ibatis.dialect;

public class OracleDialect extends Dialect {
	public String getLimitString(String sql, int offset, int limit) {
		sql = sql.trim();
		StringBuffer pagingSelect = new StringBuffer(sql.length() + 100);

		pagingSelect
				.append("select * from ( select row_.*, rownum rownum_ from ( ");
		pagingSelect.append(sql);

		pagingSelect.append(" ) row_ ) where rownum_ <= ")
				.append(offset + limit).append(" and rownum_ > ")
				.append(offset);

		return pagingSelect.toString();
	}
}
