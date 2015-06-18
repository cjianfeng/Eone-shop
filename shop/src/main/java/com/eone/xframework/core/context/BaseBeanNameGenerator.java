package com.eone.xframework.core.context;

import java.net.ProxySelector;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.context.annotation.AnnotationBeanNameGenerator;

public class BaseBeanNameGenerator extends AnnotationBeanNameGenerator {
	public String generateBeanName(BeanDefinition definition,
			BeanDefinitionRegistry registry) {
		try {
			ProxySelector.setDefault(null);
		} catch (Exception e) {
		}
		String beanName = super.generateBeanName(definition, registry);
		if (beanName.endsWith("Impl")) {
			beanName = beanName.substring(0, beanName.length() - 4);
		}
		return beanName;
	}
}
