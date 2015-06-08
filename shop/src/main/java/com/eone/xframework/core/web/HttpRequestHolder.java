package com.eone.xframework.core.web;

import javax.servlet.http.HttpServletRequest;

import org.springframework.core.NamedThreadLocal;

public class HttpRequestHolder {
	private static NamedThreadLocal<HttpServletRequest> registry = new NamedThreadLocal(
			"http-request");

	public static void register(HttpServletRequest request) {
		registry.set(request);
	}

	public static HttpServletRequest getRequest() {
		return (HttpServletRequest) registry.get();
	}

	public static void release() {
		registry.remove();
	}
}
