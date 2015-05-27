package com.eone.shop.services.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.eone.shop.mapper.UserMapper;
import com.eone.shop.model.UserModel;
import com.eone.shop.services.UserService;

@Service("userService")
public class UserServiceImpl implements UserService {

	@Resource
    private UserMapper userMapper;  
	
	public UserModel getUserById(int userId) {
		return userMapper.selectByPrimaryKey(userId);
	}

}
