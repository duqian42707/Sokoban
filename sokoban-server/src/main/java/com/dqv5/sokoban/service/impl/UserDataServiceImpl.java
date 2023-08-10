package com.dqv5.sokoban.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.dqv5.sokoban.entity.UserData;
import com.dqv5.sokoban.pojo.UserDataVO;
import com.dqv5.sokoban.repository.UserDataRepository;
import com.dqv5.sokoban.service.UserDataService;
import com.dqv5.sokoban.utils.SecurityUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @author duqian
 * @date 2023/8/10
 */
@Service
public class UserDataServiceImpl implements UserDataService {
    @Resource
    private UserDataRepository userDataRepository;

    @Override
    public UserDataVO getUserData() {
        String userId = SecurityUtils.getCurrentUserId();
        UserData userData = userDataRepository.findById(userId).orElse(new UserData());
        UserDataVO userDataVO = new UserDataVO();
        userDataVO.setUserId(userId);
        String completeLevelsStr = userData.getCompleteLevels();
        List<Integer> completeLevels = new ArrayList<>();
        if (StringUtils.isNotBlank(completeLevelsStr)) {
            JSONArray jsonArray = JSON.parseArray(completeLevelsStr);
            for (int i = 0; i < jsonArray.size(); i++) {
                completeLevels.add(jsonArray.getInteger(i));
            }
        }
        userDataVO.setCompleteLevels(completeLevels);
        return userDataVO;
    }

    @Override
    public void saveUserData(UserDataVO userDataVO) {
        String userId = SecurityUtils.getCurrentUserId();
        UserData userData = userDataRepository.findById(userId).orElse(new UserData());
        List<Integer> completeLevels = userDataVO.getCompleteLevels();
        userData.setUserId(userId);
        userData.setCompleteLevels(JSON.toJSONString(completeLevels));
        userDataRepository.save(userData);
    }
}
