package com.eone.xframework.core.security;

public abstract interface UserContextFactory {
	public abstract boolean isLoggedIn();

	public abstract void login(UserContext paramUserContext);

	public abstract UserContext getLoggedInUser() throws UnLoginException;

	public abstract void logout();
}
