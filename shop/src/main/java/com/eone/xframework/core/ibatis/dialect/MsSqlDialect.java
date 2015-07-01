package com.eone.xframework.core.ibatis.dialect;

import com.eone.xframework.core.exception.FrameworkException;

public class MsSqlDialect extends Dialect {
	public String getLimitString(String sql, int offset, int limit) {
		sql = sql.trim();
		String orderby = getOrderByPart(sql);
		String distinctStr = "";
		String sqlPartString = null;
		String loweredString = sql.toLowerCase();
		if (loweredString.trim().startsWith("select")) {
			int index = 6;
			if (loweredString.startsWith("select distinct")) {
				distinctStr = " DISTINCT ";
				index = 15;
			}
			sqlPartString = sql.substring(index);
		}
		StringBuffer result = new StringBuffer();
		result.append("WITH query AS (SELECT ").append(distinctStr)
				.append(" TOP 100 PERCENT ROW_NUMBER() OVER (").append(orderby)
				.append(") AS __mybatis_row_nr__, ").append(sqlPartString)
				.append(") SELECT * FROM query WHERE __mybatis_row_nr__ > ")
				.append(offset).append(" AND __mybatis_row_nr__ <= ")
				.append(offset + limit).append(" ORDER BY __mybatis_row_nr__");

		return result.toString();
	}

	private static String getOrderByPart(String sql) {
		String loweredString = sql.toLowerCase();
		int orderByIndex = loweredString.lastIndexOf("order by");
		if (orderByIndex != -1) {
			return sql.substring(orderByIndex);
		}
		throw new FrameworkException(
				"'order by' is required.Database: MS SQLServer.");
	}
}