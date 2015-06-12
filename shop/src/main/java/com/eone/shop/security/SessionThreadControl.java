package com.eone.shop.security;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.eone.xframework.core.web.HttpRequestHolder;

/**
 * session control
 * 
 */
public class SessionThreadControl {
	/**
	 * 用户的Session标志
	 */
	private final static String USER_SESSION = "USER_SESSION";

	/**
	 * 已登录的用户
	 */
	private final static Map<String, UserSession> LOGIN_USERS = new HashMap<String, UserSession>();

	/**
	 * 获取当前登录用户
	 * 
	 * @return
	 */
	public static UserSession getUserSession() {
		return (UserSession) getSession().getAttribute(USER_SESSION);
	}

	/**
	 * 获取当前登录的用户
	 * 
	 * @param session
	 * @return
	 */
	public static UserSession getUserSession(HttpSession session) {
		Object sessionUser = session.getAttribute(USER_SESSION);
		if (sessionUser == null) {
			return null;
		}
		UserSession userSession = (UserSession) sessionUser;
		return userSession;
	}

	/**
	 * 保存用户信息到Session
	 * 
	 * @param userSession
	 */
	public static void saveUserToSession(UserSession userSession) {
		getSession().setAttribute(USER_SESSION, userSession);
	}

	/**
	 * 保存用户信息到Session
	 * 
	 * @param userSession
	 */
	public static void saveUserToSession(HttpSession session,
			UserSession userSession) {
		session.setAttribute(USER_SESSION, userSession);
		LOGIN_USERS.put(userSession.getUserName(), userSession);
	}

	/**
	 * 从Session中移除用户
	 */
	public static void removeUserFromSession() {
		getSession().removeAttribute(USER_SESSION);
	}

	private static HttpSession getSession() {
		return HttpRequestHolder.getRequest().getSession();
	}
}
