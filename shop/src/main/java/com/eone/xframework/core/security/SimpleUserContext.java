package com.eone.xframework.core.security;

public class SimpleUserContext implements UserContext {
	private static final long serialVersionUID = -5226645667134263738L;
	private String userCode;
	private String enterpriseCode;
	private String userName;
	private String enterpriseName;

	public String uid() {
		return this.userCode;
	}

	public String getUserCode() {
		return this.userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}

	public String getEnterpriseCode() {
		return this.enterpriseCode;
	}

	public void setEnterpriseCode(String enterpriseCode) {
		this.enterpriseCode = enterpriseCode;
	}

	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getEnterpriseName() {
		return this.enterpriseName;
	}

	public void setEnterpriseName(String enterpriseName) {
		this.enterpriseName = enterpriseName;
	}
}