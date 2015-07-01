package com.eone.xframework.core.ibatis.dialect;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.apache.ibatis.session.Configuration;

import com.eone.xframework.core.exception.FrameworkException;

public class DialectFactory {
	private static final String DIALECT_CONFIG = "dialect";
	private static final String DEFAULT_DIALECT = "mysql";
	private static final Map<String, Dialect> dialectMap = new HashMap();

	public static Dialect buildDialect(Configuration configuration) {
		Properties vars = configuration.getVariables();
		String dialectKey = vars == null ? null : vars.getProperty(DIALECT_CONFIG);

		if ((dialectKey == null) || (dialectKey.length() < 1)) {
			dialectKey = DEFAULT_DIALECT;
		}
		Dialect dialect = (Dialect) dialectMap.get(dialectKey);
		if (dialect == null) {
			throw new FrameworkException("not found the specified dialect.["
					+ dialect + "]");
		}
		return dialect;
	}

	static {
		dialectMap.put("mysql", new MySqlDialect());
		dialectMap.put("oracle", new OracleDialect());
		dialectMap.put("mssql", new MsSqlDialect());
	}
}