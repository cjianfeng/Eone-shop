package com.eone.xframework.core.i18n;

import java.util.Locale;

public class LocaleHolder {
	private static final ThreadLocal<Locale> catchLocale = new ThreadLocal();

	private static Locale defaultLoadle = Locale.CHINESE;

	public static Locale getLocale() {
		Locale locale = (Locale) catchLocale.get();
		return locale == null ? defaultLoadle : locale;
	}

	public static void setLocale(Locale locale) {
		catchLocale.set(locale);
	}
}
