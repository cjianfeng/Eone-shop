package com.eone.xframework.core;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

import com.eone.xframework.core.i18n.LocaleHolder;

public class AbstractSupport implements ApplicationContextAware{
	protected Logger logger = LoggerFactory.getLogger(getClass());
	protected ApplicationContext appContext;

	public void setApplicationContext(ApplicationContext context)
			throws BeansException {
		this.appContext = context;
	}

	protected String getText(String message, Object[] args) {
		return this.appContext.getMessage(message, args,
				LocaleHolder.getLocale());
	}

	protected String getText(String message) {
		return this.appContext.getMessage(message, null,
				LocaleHolder.getLocale());
	}
}
