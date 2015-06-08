package com.eone.xframework.core.security;

import com.eone.xframework.core.exception.UnifiedHandlingException;

public class UnLoginException extends UnifiedHandlingException{
	public static final String LOGIN_ERROR_CODE = "unlogin";

	public UnLoginException() {
		super("unlogin");
	}
}
