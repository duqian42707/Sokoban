package com.dqv5.sokoban.config;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(urlPatterns = "/api/*", filterName = "decryptRequestFilter")
public class DecryptRequestFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        // 用自己实现HttpServletRequestWrapper类，替换servletRequest
        filterChain.doFilter(
                new DecryptHttpServletRequestWrapper((HttpServletRequest) servletRequest),
                new DecryptHttpServletResponseWrapper((HttpServletResponse) servletResponse)
        );
    }
}
