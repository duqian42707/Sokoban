package com.dqv5.sokoban;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@ServletComponentScan
public class SokobanServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(SokobanServerApplication.class, args);
    }

}
