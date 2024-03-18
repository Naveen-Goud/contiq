package com.contiq.notificationservice.constants;

public enum ServiceUrls {
    USER_SERVICE("https://bc114be.bootcamp64.tk/users");

    private final String url;

    ServiceUrls(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }
}
