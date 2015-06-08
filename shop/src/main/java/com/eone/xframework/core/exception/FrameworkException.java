package com.eone.xframework.core.exception;

public class FrameworkException extends RuntimeException{
	private static final long serialVersionUID = -4401507743528660409L;
	public static final String MSG_KEY_PREFIX = "error.";

	public FrameworkException(String message) {
		super(message);
	}

	public FrameworkException(String message, Throwable cause) {
		super(message, cause);
	}
}
