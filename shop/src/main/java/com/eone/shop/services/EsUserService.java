package com.eone.shop.services;

import java.util.List;

import com.eone.shop.model.EsUserModel;
import com.eone.xframework.core.Pagination;
import com.eone.xframework.core.RowBounds;

public interface EsUserService {
	
	Pagination getPage(EsUserModel condition, RowBounds bounds);
	
	void delete(List<EsUserModel> models);
	
	EsUserModel save(EsUserModel model);
}
