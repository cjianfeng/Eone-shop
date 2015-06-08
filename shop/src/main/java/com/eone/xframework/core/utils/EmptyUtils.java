package com.eone.xframework.core.utils;

import java.util.Collection;
import java.util.Map;

public class EmptyUtils {
	public static boolean isNotEmpty(String str) {
		return !isEmpty(str);
	}

	public static boolean isEmpty(String str) {
		return (str == null) || (str.length() < 1);
	}

	public static boolean isAllEmpty(String[] args) {
		if (args == null)
			return true;
		for (int i = 0; i < args.length; i++) {
			if (!isEmpty(args[i]))
				return false;
		}
		return true;
	}

	public static boolean hasOneEmpty(String[] args) {
		if (args == null)
			return false;
		for (int i = 0; i < args.length; i++) {
			if (isEmpty(args[i]))
				return true;
		}
		return false;
	}

	public static boolean isTrimEmpty(String str) {
		return isEmpty(str);
	}

	public static boolean isNotEmpty(Object[] arrs) {
		return !isEmpty(arrs);
	}

	public static boolean isEmpty(Object[] arrs) {
		return (arrs == null) || (arrs.length < 1);
	}

	public static boolean isNotEmpty(Collection colls) {
		return !isEmpty(colls);
	}

	public static boolean isEmpty(Collection colls) {
		return (colls == null) || (colls.isEmpty());
	}

	public static boolean isNotEmpty(Map map) {
		return !isEmpty(map);
	}

	public static boolean isEmpty(Map map) {
		return (map == null) || (map.isEmpty());
	}

	public static boolean isEqual(Object obj1, Object obj2) {
		if ((obj1 == null) && (obj2 == null))
			return true;
		if ((obj1 == null) && (obj2 != null))
			return false;
		if ((obj2 == null) && (obj1 != null)) {
			return false;
		}
		return obj1.equals(obj2);
	}
}
