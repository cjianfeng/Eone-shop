package com.eone.shop.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.eone.shop.model.UserModel;
import com.eone.shop.services.UserService;


@Controller
@RequestMapping("/user")
public class UserController {

	@Resource
    private UserService userService;
      
	@RequestMapping("/showUser")
	public String toIndex(HttpServletRequest request, Model model) {
		int userId = Integer.parseInt(request.getParameter("id"));
		UserModel user = this.userService.getUserById(userId);
		model.addAttribute("user", user);
		return "showUser";
	}
}
