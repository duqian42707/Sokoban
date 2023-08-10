package com.dqv5.sokoban.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class RestReturn {
    public static <T> ResponseEntity<RestReturnEntity<T>> build(boolean isSuccess, String message) {
        if (isSuccess) {
            return ResponseEntity.ok().headers(UTF8ContentTypeHeader.build()).body(RestReturnEntity.<T>builder().message(message).build());
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(UTF8ContentTypeHeader.build()).body(RestReturnEntity.<T>builder().message(message).build());
        }
    }


    public static <T>ResponseEntity<RestReturnEntity<T>> build(boolean isSuccess, String message, T data) {
        if (isSuccess) {
            return ResponseEntity.ok().headers(UTF8ContentTypeHeader.build()).body(RestReturnEntity.<T>builder().message(message).data(data).build());
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).headers(UTF8ContentTypeHeader.build()).body(RestReturnEntity.<T>builder().message(message).data(data).build());
        }
    }

    public static <T>ResponseEntity<RestReturnEntity<T>> build(HttpStatus status, String message) {
        return ResponseEntity.status(status).headers(UTF8ContentTypeHeader.build()).body(RestReturnEntity.<T>builder().message(message).build());
    }

    public static <T>ResponseEntity<RestReturnEntity<T>> build(HttpStatus status, String message, T data) {
        return ResponseEntity.status(status).headers(UTF8ContentTypeHeader.build()).body(RestReturnEntity.<T>builder().message(message).data(data).build());
    }

    public static <T>ResponseEntity<RestReturnEntity<T>> build(HttpStatus status, String message, T data, Exception ex) {
        return ResponseEntity.status(status).headers(UTF8ContentTypeHeader.build()).body(RestReturnEntity.<T>builder().message(message).data(data).errorMessage(ex.getMessage()).build());
    }

    public static <T>ResponseEntity<RestReturnEntity<T>> build(HttpStatus status, String message, Exception ex) {
        return ResponseEntity.status(status).headers(UTF8ContentTypeHeader.build()).body(RestReturnEntity.<T>builder().message(message).errorMessage(ex.getMessage()).build());
    }


    public static <T>ResponseEntity<RestReturnEntity<T>> build(int status, String message) {
        return ResponseEntity.status(status).headers(UTF8ContentTypeHeader.build()).body(RestReturnEntity.<T>builder().message(message).build());
    }

    public static <T>ResponseEntity<RestReturnEntity<T>> build(int status, String message, T data) {
        return ResponseEntity.status(status).headers(UTF8ContentTypeHeader.build()).body(RestReturnEntity.<T>builder().message(message).data(data).build());
    }

    public static <T>ResponseEntity<RestReturnEntity<T>> build(int status, String message, T data, Exception ex) {
        return ResponseEntity.status(status).headers(UTF8ContentTypeHeader.build()).body(RestReturnEntity.<T>builder().message(message).data(data).errorMessage(ex.getMessage()).build());
    }

    public static <T>ResponseEntity<RestReturnEntity<T>> build(int status, String message, Exception ex) {
        return ResponseEntity.status(status).headers(UTF8ContentTypeHeader.build()).body(RestReturnEntity.<T>builder().message(message).errorMessage(ex.getMessage()).build());
    }
}
