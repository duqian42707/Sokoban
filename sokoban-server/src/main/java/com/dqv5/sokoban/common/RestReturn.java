package com.dqv5.sokoban.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * @author duq
 * @date 2020/8/7
 */
public class RestReturn {

    private static final String SUCCESS = "操作成功";
    private static final String FAIL = "程序异常";

    public static <T> ResponseEntity<RestReturnEntity<T>> ok() {
        return ResponseEntity.ok(RestReturnEntity.<T>builder().msg(SUCCESS).build());
    }

    public static <T> ResponseEntity<RestReturnEntity<T>> ok(String message) {
        return ResponseEntity.ok(RestReturnEntity.<T>builder().msg(message).build());
    }

    public static <T> ResponseEntity<RestReturnEntity<T>> ok(T data) {
        return ResponseEntity.ok(RestReturnEntity.<T>builder().msg(SUCCESS).data(data).build());
    }

    public static <T> ResponseEntity<RestReturnEntity<T>> build(boolean isSuccess, String message) {
        if (isSuccess) {
            return ResponseEntity.ok().body(RestReturnEntity.<T>builder().msg(message).build());
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(RestReturnEntity.<T>builder().msg(message).build());
        }
    }

    public static <T> ResponseEntity<RestReturnEntity<T>> build(boolean isSuccess, String message, T data) {
        if (isSuccess) {
            return ResponseEntity.ok().body(RestReturnEntity.<T>builder().msg(message).data(data).build());
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(RestReturnEntity.<T>builder().msg(message).data(data).build());
        }
    }
}
