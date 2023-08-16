package com.dqv5.sokoban;

import com.dqv5.sokoban.utils.SecurityUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.util.Optional;

@SpringBootApplication
@ServletComponentScan
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class SokobanServerApplication {

    @Bean(name = "auditorAware")
    public AuditorAware<String> auditorAware() {
        return () -> {
            try {
                String userId = SecurityUtils.getCurrentUserId();
                return Optional.of(userId);
            } catch (Exception e) {
                return Optional.empty();
            }
        };
    }


    public static void main(String[] args) {
        SpringApplication.run(SokobanServerApplication.class, args);
    }

}
