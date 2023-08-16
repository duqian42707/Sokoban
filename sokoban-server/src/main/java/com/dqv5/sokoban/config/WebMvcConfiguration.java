package com.dqv5.sokoban.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {
    TokenCheckHandlerInterceptor tokenCheckHandlerInterceptor = new TokenCheckHandlerInterceptor();

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(tokenCheckHandlerInterceptor).addPathPatterns("/api/userData/**");
    }
}
