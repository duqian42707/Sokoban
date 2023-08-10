package com.dqv5.sokoban.utils;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;
import java.util.Optional;


/**
 * 获取当前的应聘者用户
 *
 * @author duqian
 * @date 2023/06/01
 */
public class SecurityUtils implements Serializable {

    public static String getToken() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String tokenHeaderValue = request.getHeader(JwtTokenUtil.TOKEN_HEADER);
        return Optional.ofNullable(tokenHeaderValue)
                .filter(x -> x.toLowerCase().startsWith(JwtTokenUtil.TOKEN_PREFIX))
                .map(x -> x.substring(JwtTokenUtil.TOKEN_PREFIX.length()))
                .orElse(null);
    }

    public static String getCurrentUserId() {
        String token = getToken();
        if (StringUtils.isBlank(token)) {
            throw new RuntimeException("未获取到token!");
        }
        return JwtTokenUtil.getUserId(token);
    }

    public static String getCurrentUsername() {
        String token = getToken();
        if (StringUtils.isBlank(token)) {
            throw new RuntimeException("未获取到token!");
        }
        return JwtTokenUtil.getUsername(token);
    }

    public static String getCurrentOpenid() {
        String token = getToken();
        if (StringUtils.isBlank(token)) {
            throw new RuntimeException("未获取到token!");
        }
        return JwtTokenUtil.getOpenid(token);
    }

    public static String getCurrentNickName() {
        String token = getToken();
        if (StringUtils.isBlank(token)) {
            throw new RuntimeException("未获取到token!");
        }
        return JwtTokenUtil.getNickName(token);
    }


}
