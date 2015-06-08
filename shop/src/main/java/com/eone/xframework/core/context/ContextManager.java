package com.eone.xframework.core.context;

import java.util.HashSet;
import java.util.Hashtable;
import java.util.Map;
import java.util.Set;

import org.springframework.context.ApplicationContext;

import com.eone.xframework.core.exception.ContextNotFoundException;

public class ContextManager {
	public static final String ROOT_MODULE_NAME = "root";
	private static ApplicationContext rootContext;
	private static Map<String, ApplicationContext> modules = new Hashtable();

	private static Object lock = new Object();

	public static ApplicationContext getRootContext() {
		return rootContext;
	}

	public static ApplicationContext getModuleContext(String module) {
		ApplicationContext ctx = (ApplicationContext) modules.get(module);
		if (ctx == null) {
			throw new ContextNotFoundException(module);
		}
		return ctx;
	}

	public static Set<String> getModuleNames() {
		Set names = modules.keySet();
		Set snapshoot = new HashSet(names);
		return snapshoot;
	}

	static void setRootContext(ApplicationContext context) {
		rootContext = context;
	}

	public static int getModulesSize() {
		return modules.size();
	}

	public static boolean hasModule(String moduleName) {
		return modules.containsKey(moduleName);
	}

	static ApplicationContext removeModule(String moduleName) {
		synchronized (lock) {
			return (ApplicationContext) modules.remove(moduleName);
		}
	}

	public static void addModule(String moduleName, ApplicationContext context) {
		synchronized (lock) {
			modules.put(moduleName, context);
		}
	}
}
