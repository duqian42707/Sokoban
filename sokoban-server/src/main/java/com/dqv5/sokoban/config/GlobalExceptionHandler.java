package com.dqv5.sokoban.config;

import com.dqv5.sokoban.common.RestReturn;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * @author duqian
 * @date 2020/10/22
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<?> exceptionHandler(Exception ex) {
        log.error("未知异常", ex);
        return RestReturn.build(HttpStatus.INTERNAL_SERVER_ERROR, "程序异常", ex);
    }

    @ExceptionHandler(value = RuntimeException.class)
    public ResponseEntity<?> exceptionHandler(RuntimeException ex) {
        log.error("出现异常: {}", ex.getMessage());
        return RestReturn.build(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
    }

}
