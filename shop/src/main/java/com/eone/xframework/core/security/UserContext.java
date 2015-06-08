package com.eone.xframework.core.security;

import java.io.Serializable;

public abstract interface UserContext extends Serializable {
	public abstract String uid();

	public abstract String getUserCode();

	public abstract String getUserName();

	public abstract String getEnterpriseCode();

	public abstract String getEnterpriseName();
}
