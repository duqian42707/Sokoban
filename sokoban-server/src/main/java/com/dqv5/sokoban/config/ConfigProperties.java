package com.dqv5.sokoban.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * @author duqian
 * @date 2023/8/10
 */
@Configuration
@ConfigurationProperties(prefix = "sokoban")
@Data
public class ConfigProperties {
    private String appId;
    private String appSecret;
}
