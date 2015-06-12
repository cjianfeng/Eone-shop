package com.eone.shop.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.eone.shop.security.SessionThreadControl;
import com.eone.shop.security.UserSession;

@Controller
@RequestMapping("/login")
public class LoginActionController {
	
	@RequestMapping(value = "/logineone")
	public ModelAndView  login(@RequestParam(value = "username") String username,
			@RequestParam(value = "password") String pwd) {
		Map msgMap = new HashMap();
		if("admin".equals(username)) {
			// TODO:先写死，后面采用读取数据库方式
			if("123456".equals(pwd)){
				// 放入缓存
				UserSession userSession = new UserSession();
				userSession.setUserId("1");
				userSession.setUserName(username);
				SessionThreadControl.saveUserToSession(userSession);
				return new ModelAndView("index");
			}
		}
		msgMap.put("errorMsg", "密码错误或用户名不存在！");
		return new ModelAndView("login",msgMap);
	}
}
