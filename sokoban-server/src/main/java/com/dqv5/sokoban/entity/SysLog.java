package com.dqv5.sokoban.entity;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

/**
 * @author duqian
 * @date 2019/10/10
 */
@Data
@Builder
@Entity
@Table(name = "sys_log")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
@AllArgsConstructor
public class SysLog {
    @Id
    @GenericGenerator(name = "uuid", strategy = "uuid")
    @GeneratedValue(generator = "uuid")
    private String logId;
    private String userId;
    private String username;
    private String nickName;
    private String ip;
    private String address;
    private String className;
    private String methodName;
    private String methodDesc;
    @Column(columnDefinition = "TEXT")
    private String args;
    @Column(length = 2000)
    private String requestUrl;
    private String requestType;
    private Integer status;
    @Column(columnDefinition = "TEXT")
    private String errorInfo;
    private Long runTime;
    @CreatedDate
    @Column(name = "created_time", updatable = false)
    private Date createdTime;
}
