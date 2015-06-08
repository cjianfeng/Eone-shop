package com.eone.xframework.core.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;

import com.eone.xframework.core.AbstractSupport;
import com.eone.xframework.core.exception.FrameworkException;
import com.eone.xframework.core.model.Recordable;
import com.eone.xframework.core.security.UnLoginException;
import com.eone.xframework.core.security.UserContext;
import com.eone.xframework.core.security.UserContextFactory;

public class ActionSupport extends AbstractSupport{
	public static final String SUCCESS = "success";
	public static final String FAILURE = "failure";
	public static final String NONE = "none";
	public static final String ERROR = "error";
	public static final String INPUT = "input";
	public static final String LOGIN = "login";

	@Autowired
	protected UserContextFactory userContextFactory;

	@Deprecated
	protected void setSessionAttribute(String key, Object value) {
		throw new FrameworkException("prohibit operation");
	}

	@Deprecated
	protected Object getSessionAttribute(String key) {
		throw new FrameworkException("prohibit operation");
	}

	public UserContextFactory getUserContextFactory() {
		return this.userContextFactory;
	}

	public void setUserContextFactory(UserContextFactory userContextFactory) {
		this.userContextFactory = userContextFactory;
	}

	public UserContext getUserContext() throws UnLoginException {
		return this.userContextFactory.getLoggedInUser();
	}

	public void setUserContext(UserContext context) {
		throw new FrameworkException("prohibit operation");
	}

	public void fillModifyReccordInfo(Recordable rec) throws UnLoginException {
		Date current = new Date(System.currentTimeMillis());
		String user = getUserContextFactory().getLoggedInUser().getUserCode();
		rec.setModifier(user);
		rec.setModifyTime(current);
	}

	public void fillNewReccordInfo(Recordable rec) throws UnLoginException {
		Date current = new Date(System.currentTimeMillis());
		String user = getUserContextFactory().getLoggedInUser().getUserCode();
		rec.setCreateTime(current);
		rec.setCreator(user);
		rec.setModifier(user);
		rec.setModifyTime(current);
	}

	public String execute() throws Exception {
		return "success";
	}
}
