package com.eone.shop.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.eone.shop.model.EsUserModel;
import com.eone.shop.services.EsUserService;
import com.eone.xframework.core.Pagination;
import com.eone.xframework.core.controller.JSONActionSupport;
import com.eone.xframework.core.enhanced.spring.ParamPrefix;
import com.eone.xframework.pureui.utils.MessageUtils;
import com.eone.xframework.pureui.view.JSONMessage;


@Controller
@RequestMapping("/user")
public class EsUserController extends JSONActionSupport{
	
	@Resource
    private EsUserService esUserService;
      
	/**
	 * 页面列表查询
	 * @param condition
	 * @param bounds
	 * @return
	 */
	@RequestMapping("/page")
	public @ResponseBody
	JSONMessage page(@ParamPrefix(value = "condition") EsUserModel condition) {
		Pagination page = esUserService.getPage(condition,
				condition.buildBounds());
		JSONMessage jsonMessage = MessageUtils.createPageMsg(page);
		return jsonMessage;
	}
	
	/**
	 * 删除全部
	 * 
	 * @param models
	 * @return
	 */
	@RequestMapping(value = "/delete")
	public @ResponseBody
	JSONMessage delete(@ParamPrefix(value = "user") List<EsUserModel> models) {
		JSONMessage jsonMessage = new JSONMessage();
		this.esUserService.delete(models);
		return jsonMessage;
	}
	
	/**
	 * 保存
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/save")
	public @ResponseBody 
	JSONMessage save(@ParamPrefix(value = "userModel") EsUserModel model) {
		JSONMessage jsonMessage = new JSONMessage();
		this.esUserService.save(model);
		return jsonMessage;
	}
}
