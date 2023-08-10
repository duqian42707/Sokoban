package com.dqv5.sokoban.repository;

import com.dqv5.sokoban.entity.UserData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDataRepository extends JpaRepository<UserData, String> {
}
