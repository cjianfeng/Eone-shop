package com.eone.shop.mapper;


import java.util.List;

import com.eone.shop.model.EsUserModel;

public interface EsUserMapper {
	// 按主键查询
	EsUserModel selectByPrimaryKey(Long id);
	// 按主键删除
	int deleteByPrimaryKey(Long id);
	// 插入
    int insert(EsUserModel record);
    // 选择性插入部分内容
//    int insertSelective(EsUserModel record);
    // 更新部分内容
//    int updateByPrimaryKeySelective(EsUserModel record);
    // 更新
    int updateByPrimaryKey(EsUserModel record);
    // 获取页面数据条数
    public int getPageCount(EsUserModel model);
	// 获取页面数据
	public List<EsUserModel> getPage(EsUserModel model);
}
