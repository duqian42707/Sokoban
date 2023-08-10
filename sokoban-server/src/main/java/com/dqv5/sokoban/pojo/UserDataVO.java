package com.dqv5.sokoban.pojo;

import lombok.Data;

import java.util.List;

/**
 * @author duqian
 * @date 2023/8/10
 */
@Data
public class UserDataVO {
    private String userId;
    private List<Integer> completeLevels;
}
