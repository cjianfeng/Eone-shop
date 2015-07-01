package com.eone.xframework.core.ibatis;

import java.util.Properties;

import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.factory.DefaultObjectFactory;
import org.apache.ibatis.reflection.wrapper.DefaultObjectWrapperFactory;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.eone.xframework.core.ibatis.dialect.Dialect;
import com.eone.xframework.core.ibatis.dialect.DialectFactory;
/**
 * MyBatis分页拦截器
 *
 */
@Intercepts({ @org.apache.ibatis.plugin.Signature(type = StatementHandler.class, method = "prepare", args = { java.sql.Connection.class }) })
public class PaginationInterceptor implements Interceptor {
	private Logger logger = LoggerFactory.getLogger(getClass());

	public Object intercept(Invocation invocation) throws Throwable {
		StatementHandler statementHandler = (StatementHandler) invocation
				.getTarget();
		MetaObject metaObject = MetaObject.forObject(statementHandler,new DefaultObjectFactory(),new DefaultObjectWrapperFactory());

		RowBounds rowBounds = (RowBounds) metaObject
				.getValue("delegate.rowBounds");

		// TODO:分页断点bug入口3：RowBound的limit取值永远都是2147483647，永远不会走进if循环体里面
		if ((rowBounds != null) && (rowBounds.getLimit() > 0)
				&& (rowBounds.getLimit() < RowBounds.NO_ROW_LIMIT)) {
			String originalSql = (String) metaObject
					.getValue("delegate.boundSql.sql");

			Configuration configuration = (Configuration) metaObject
					.getValue("delegate.configuration");
			Dialect dialect = DialectFactory.buildDialect(configuration);

			int offset = rowBounds.getOffset();
			int limit = rowBounds.getLimit();
			try {
				metaObject.setValue("delegate.boundSql.sql",
						dialect.getLimitString(originalSql, offset, limit));
				metaObject.setValue("delegate.rowBounds.offset",
						Integer.valueOf(RowBounds.NO_ROW_OFFSET));
				metaObject.setValue("delegate.rowBounds.limit",
						Integer.valueOf(RowBounds.NO_ROW_LIMIT));

				BoundSql boundSql = statementHandler.getBoundSql();
				this.logger.debug("paging sql: {}", boundSql.getSql());
				Object localObject1 = invocation.proceed();
				return localObject1;
			} finally {
			}
		}

		return invocation.proceed();
	}

	public Object plugin(Object target) {
		return Plugin.wrap(target, this);
	}

	public void setProperties(Properties arg0) {
	}
}
