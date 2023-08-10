package com.dqv5.sokoban.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * @author duqian
 * @date 2023/8/8
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "user_data")
public class UserData extends BaseEntity implements Serializable {
    @Id
    private String userId;
    @Lob
    private String completeLevels;

}
