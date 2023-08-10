package com.dqv5.sokoban.repository;

import com.dqv5.sokoban.entity.BaseUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BaseUserRepository extends JpaRepository<BaseUser, String> {
    Optional<BaseUser> findByOpenid(String openid);
}
