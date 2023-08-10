package com.dqv5.sokoban.common;


import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

public class UTF8ContentTypeHeader {
    public static HttpHeaders build(){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.valueOf("application/json;charset=UTF-8"));
        return headers;
    }
}
