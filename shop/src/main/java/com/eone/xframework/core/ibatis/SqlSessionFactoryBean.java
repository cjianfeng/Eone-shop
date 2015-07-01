package com.eone.xframework.core.ibatis;

import java.io.IOException;

import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.type.JdbcType;

public class SqlSessionFactoryBean extends
		org.mybatis.spring.SqlSessionFactoryBean {
	private Interceptor interceptor = new PaginationInterceptor();

	protected SqlSessionFactory buildSqlSessionFactory() throws IOException {
		SqlSessionFactory factory = super.buildSqlSessionFactory();

		factory.getConfiguration().setJdbcTypeForNull(JdbcType.NULL);
		factory.getConfiguration().addInterceptor(this.interceptor);
		return factory;
	}
}
