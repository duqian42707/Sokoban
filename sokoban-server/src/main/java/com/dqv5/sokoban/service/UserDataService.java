package com.dqv5.sokoban.service;

import com.dqv5.sokoban.pojo.UserDataVO;

public interface UserDataService {
    UserDataVO getUserData();

    void saveUserData(UserDataVO userDataVO);

}
