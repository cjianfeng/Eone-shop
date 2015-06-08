package com.eone.shop.services.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.eone.shop.mapper.EsUserMapper;
import com.eone.shop.model.EsUserModel;
import com.eone.shop.services.EsUserService;
import com.eone.xframework.core.Pagination;
import com.eone.xframework.core.RowBounds;

@Service
public class EsUserServiceImpl implements EsUserService {

	@Resource
    private EsUserMapper esUserMapper;
	
	/**
	 * 页面列表查询
	 * @param condition
	 * @param bounds
	 * @return
	 */
	public Pagination getPage(EsUserModel condition, RowBounds bounds) {
		Integer count = esUserMapper.getPageCount(condition);
		Pagination page = new Pagination(bounds, count);
		List list = esUserMapper.getPage(condition);
		page.setData(list);
		return page;
	}
	
	/**
	 * 删除
	 * @param models
	 */
	public void delete(List<EsUserModel> models) {
		for (EsUserModel model : models) {
			esUserMapper.deleteByPrimaryKey(model.getId());
		}
		
	}
	
	/**
	 * 保存
	 */
	public EsUserModel save(EsUserModel model) {
		if (model == null) {
			return model;
		} else {
			if (model.getId() == null ) {
				model = this.insert(model);
			} else {
				model = this.update(model);
			}
			if (model == null) {
				return model;
			}
			return model;
		}
	}
	
	/**
	 * 新增一笔数据
	 */
	private EsUserModel insert(EsUserModel model) {
		int count = esUserMapper.insert(model);
		if (count == 1) {
			return model;
		}
		return null;
	}
	
	/**
	 * 更新数据
	 */
	private EsUserModel update(EsUserModel model) {
		int count = esUserMapper.updateByPrimaryKey(model);
		if (count == 1) {
			return model;
		}
		return null;
	}

}
