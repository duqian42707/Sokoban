package com.dqv5.sokoban.config;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.dqv5.sokoban.utils.JwtTokenUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

/**
 * @author duqian
 * @date 2023/5/31
 */
public class TokenCheckHandlerInterceptor implements HandlerInterceptor {

    /**
     * 不需要验证token的请求前缀
     */
    private static final String IGNORE_PATH_PREFIXES = "/api/login";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String servletPath = request.getServletPath();
        boolean skipToken = servletPath.startsWith(IGNORE_PATH_PREFIXES);
        if (skipToken) {
            return true;
        }

        // 拦截请求，从请求头中获取token，解析出用户信息
        String tokenHeaderValue = request.getHeader(JwtTokenUtil.TOKEN_HEADER);
        String token = Optional.ofNullable(tokenHeaderValue)
                .filter(x -> x.toLowerCase().startsWith(JwtTokenUtil.TOKEN_PREFIX))
                .map(x -> x.substring(JwtTokenUtil.TOKEN_PREFIX.length()))
                .orElse(null);
        if (StringUtils.isBlank(token) || JwtTokenUtil.isExpiration(token)) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("message", "登录状态已过期，请重新登录");
            jsonObject.put("data", null);
            jsonObject.put("errorMessage", null);
            response.setContentType("application/json;charset=utf-8");
            response.setStatus(401);
            response.getWriter().write(JSON.toJSONString(jsonObject, SerializerFeature.WriteMapNullValue));
            return false;
        }
        return true;
    }


}
