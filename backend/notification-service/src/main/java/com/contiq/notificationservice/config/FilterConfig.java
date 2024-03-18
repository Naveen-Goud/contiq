package com.contiq.notificationservice.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {
    @Bean
    public FilterRegistrationBean<JwtFilter> jwtFilter() {
        FilterRegistrationBean<JwtFilter> filter = new FilterRegistrationBean<>();
        filter.setFilter(new JwtFilter());
        filter.addUrlPatterns("/api/*");
        filter.addInitParameter("exclusions", "/api/*");
        return filter;
    }

}
