package com.eone.xframework.pureui.controller;

import com.eone.xframework.core.controller.ActionSupport;
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
