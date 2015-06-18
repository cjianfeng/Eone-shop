package com.eone.xframework.core.controller;

import com.eone.xframework.pureui.view.JSONMessage;

public class JSONActionSupport extends ActionSupport{
	protected JSONMessage jsonMessage;

	public JSONMessage getJsonMessage() {
		return this.jsonMessage;
	}

	public void setJsonMessage(JSONMessage jsonMessage) {
		this.jsonMessage = jsonMessage;
	}
}
