package com.dqv5.sokoban.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author duqian
 * @date 2023/8/8
 */
@RestController
public class LoginController {
    @PostMapping("/login")
    public ResponseEntity<Object> login() {
        return ResponseEntity.ok("");
    }
}
