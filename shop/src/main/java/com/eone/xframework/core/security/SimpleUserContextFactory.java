package com.eone.xframework.core.security;

import com.eone.xframework.core.web.HttpRequestHolder;

public class SimpleUserContextFactory implements UserContextFactory {
	public static final String LOGGEDIN_USER_SESSION_KEY = "loggedin.user.session.id";

	public UserContext getLoggedInUser() throws UnLoginException {
		UserContext user = (UserContext) (UserContext) getSessionAttribute("loggedin.user.session.id");
		if (user == null) {
			throw new UnLoginException();
		}
		return user;
	}

	public boolean isLoggedIn() {
		return getSessionAttribute("loggedin.user.session.id") != null;
	}

	public void login(UserContext user) {
		setSessionAttribute("loggedin.user.session.id", user);
	}

	protected void setSessionAttribute(String key, Object value) {
		HttpRequestHolder.getRequest().getSession().setAttribute(key, value);
	}

	protected Object getSessionAttribute(String key) {
		return HttpRequestHolder.getRequest().getSession().getAttribute(key);
	}

	public void logout() {
		setSessionAttribute("loggedin.user.session.id", null);
	}
}