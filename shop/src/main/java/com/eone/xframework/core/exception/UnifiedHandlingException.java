package com.eone.xframework.core.exception;

public class UnifiedHandlingException extends Exception{
	public UnifiedHandlingException() {
	}

	public UnifiedHandlingException(String message) {
		super(message);
	}

	public UnifiedHandlingException(Throwable cause) {
		super(cause);
	}

	public UnifiedHandlingException(String message, Throwable cause) {
		super(message, cause);
	}
}
