package com.dqv5.sokoban.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * @author duq
 */
public class JwtTokenUtil {
    /**
     * Token请求头
     */
    public static final String TOKEN_HEADER = "Authorization";
    /**
     * Token前缀
     */
    public static final String TOKEN_PREFIX = "bearer ";
    /**
     * 过期时间
     */
    public static final long EXPIRITION = 7 * 24 * 3600 * 1000;
    /**
     * 应用密钥
     */
    public static final String APP_SECRET_KEY = "sokoban_secret@123";


    private static final String USER_ID = "userId";
    private static final String ACCOUNT = "account";
    private static final String NICK_NAME = "nickName";
    private static final String OPENID = "openid";

    /**
     * 生成Token
     */
    public static String createToken(String userId, String account, String nickName, String openId) {
        Map<String, Object> map = new HashMap<>();
        map.put(USER_ID, userId);
        map.put(ACCOUNT, account);
        map.put(NICK_NAME, nickName);
        map.put(OPENID, openId);
        return Jwts
                .builder()
                .setSubject(account)
                .setClaims(map)
                .claim("username", account)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRITION))
                .signWith(SignatureAlgorithm.HS256, APP_SECRET_KEY).compact();
    }

    /**
     * 解析Token
     */
    public static Claims parseJWT(String token) {
        return Jwts.parser().setSigningKey(APP_SECRET_KEY).parseClaimsJws(token).getBody();
    }

    /**
     * 从Token中获取username（也就是account）
     */
    public static String getUsername(String token) {
        Claims claims = parseJWT(token);
        return claims.get("username").toString();
    }

    /**
     * 从Token中获取name
     */
    public static String getNickName(String token) {
        Claims claims = parseJWT(token);
        return claims.get(NICK_NAME).toString();
    }

    /**
     * 从Token中获取account
     */
    public static String getAccount(String token) {
        Claims claims = parseJWT(token);
        return claims.get(ACCOUNT).toString();
    }


    /**
     * 从Token中获取用户id
     */
    public static String getUserId(String token) {
        Claims claims = parseJWT(token);
        return claims.get(USER_ID).toString();
    }

    /**
     * 从Token中获取openid
     */
    public static String getOpenid(String token) {
        Claims claims = parseJWT(token);
        return claims.get(OPENID).toString();
    }

    /**
     * 校验Token是否过期
     *
     * @param token token
     * @return true: 已过期，false：没过期
     */
    public static boolean isExpiration(String token) {
        try {
            Claims claims = parseJWT(token);
            return claims.getExpiration().before(new Date());
        } catch (Exception e) {
            return true;
        }
    }
}
