package com.dqv5.sokoban.controller;

import com.alibaba.fastjson.JSONObject;
import com.dqv5.sokoban.common.RestReturn;
import com.dqv5.sokoban.common.RestReturnEntity;
import com.dqv5.sokoban.service.LoginService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author duqian
 * @date 2023/8/8
 */
@RestController
@RequestMapping("/api/login")
public class LoginController {

    @Resource
    private LoginService loginService;

    @PostMapping
    public ResponseEntity<RestReturnEntity<String>> login(@RequestBody JSONObject jsonObject) {
        String code = jsonObject.getString("code");
        String token = loginService.login(code);
        return RestReturn.build(true, "登录成功", token);
    }
}
