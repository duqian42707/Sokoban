package com.dqv5.sokoban.controller;

import com.dqv5.sokoban.common.RestReturn;
import com.dqv5.sokoban.common.RestReturnEntity;
import com.dqv5.sokoban.pojo.UserDataVO;
import com.dqv5.sokoban.service.UserDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @author duqian
 * @date 2023/8/8
 */
@RestController
@RequestMapping("/api/userData")
public class UserDataController {

    @Resource
    private UserDataService userDataService;

    @GetMapping
    public ResponseEntity<RestReturnEntity<UserDataVO>> getUserData() {
        UserDataVO userDataVO = userDataService.getUserData();
        return RestReturn.build(true, "查询成功", userDataVO);
    }

    @PostMapping
    public ResponseEntity<RestReturnEntity<Object>> saveUserData(@RequestBody UserDataVO userDataVO) {
        userDataService.saveUserData(userDataVO);
        return RestReturn.build(true, "保存成功");
    }
}
