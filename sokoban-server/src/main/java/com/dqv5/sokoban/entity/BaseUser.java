package com.dqv5.sokoban.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

/**
 * @author duqian
 * @date 2023/8/8
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "base_user")
public class BaseUser extends BaseEntity implements Serializable {
    @Id
    @GenericGenerator(name = "uuid", strategy = "uuid")
    @GeneratedValue(generator = "uuid")
    private String userId;
    private String account;
    private String password;
    private String nickName;
    private String avatarUrl;
    private String gender;
    private String phone;
    private String email;
    private String status = "1";
    private String openid;
    private Date lastLoginTime;
    private Date lastPasswordResetTime;

}
