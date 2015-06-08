package com.eone.xframework.core.utils;

import java.util.HashSet;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.springframework.context.ApplicationContext;

import com.eone.xframework.core.context.ContextManager;
import com.eone.xframework.core.exception.ContextNotFoundException;

public class ContextUtils {
	private static final Set<String> reservedWords = new HashSet() {
	};

	public static ApplicationContext getContextWithoutException(
			HttpServletRequest namespace) {
		try {
			return getContext(namespace);
		} catch (ContextNotFoundException e) {
		}
		return null;
	}

	public static ApplicationContext getContextWithoutException(String request) {
		try {
			return getContext(request);
		} catch (ContextNotFoundException e) {
		}
		return null;
	}

	public static ApplicationContext getContext(HttpServletRequest request) {
		String path = request.getServletPath();

		path = path.substring(1);
		int begin = path.indexOf("/");
		if (begin == -1) {
			return ContextManager.getRootContext();
		}
		String module = path.substring(0, begin);

		if (reservedWords.contains(module)) {
			return ContextManager.getRootContext();
		}
		return ContextManager.getModuleContext(module);
	}

	public static ApplicationContext getContext(String namespace) {
		if ((namespace.equals("")) || (namespace.equals("/"))
				|| (namespace.equals("root"))) {
			return ContextManager.getRootContext();
		}
		int begin = -1;
		int end = -1;
		begin = namespace.startsWith("/") ? 1 : 0;
		end = namespace.indexOf("/", begin);

		end = end == -1 ? namespace.length() - begin + 1 : end;

		String module = namespace.substring(begin, end);
		return ContextManager.getModuleContext(module);
	}
}
