package com.eone.xframework.core.exception;

public class ContextNotFoundException extends FrameworkException {
	public ContextNotFoundException(String module) {
		super(module);
	}

	public ContextNotFoundException(String module, Throwable cause) {
		super(module, cause);
	}
}
