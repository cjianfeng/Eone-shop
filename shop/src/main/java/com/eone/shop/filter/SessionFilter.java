package com.eone.shop.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.eone.shop.security.SessionThreadControl;
import com.eone.shop.security.UserSession;
import com.eone.xframework.core.web.HttpRequestHolder;

/**
 * Session过滤器
 *
 */
public class SessionFilter implements Filter{
	
	private final String loginUrl = "/shop/jsp/login.jsp";
	private final String errorUrl = "/jsp/error/systemError.jsp";

	public void destroy() {
		
	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		if (!(request instanceof HttpServletRequest) || !(response instanceof HttpServletResponse)) {
			throw new ServletException("OncePerRequestFilter just supports HTTP requests");
		}
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpRequestHolder.register(httpRequest);
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		
		String contextPath = httpRequest.getContextPath();
		String servletPath = httpRequest.getServletPath();
		System.out.println("servletPath is " + servletPath);
		if (null == servletPath) {
			httpResponse.sendRedirect(contextPath + errorUrl);
			return;
		} else if (servletPath.startsWith(loginUrl) || servletPath.startsWith("/login/logineone.shtml")){
			// 用户登录操作
		} else{
			// 用户session
			UserSession userSession = SessionThreadControl.getUserSession(httpRequest.getSession());
			if (null == userSession) {// 用户未登陆
				httpResponse.sendRedirect(contextPath + loginUrl);
				return;
			}
		}
		// 继续响应请求
		chain.doFilter(request, response);
	}

	public void init(FilterConfig arg0) throws ServletException {
		
	}

}
