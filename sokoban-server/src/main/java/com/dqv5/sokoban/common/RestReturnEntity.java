package com.dqv5.sokoban.common;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class RestReturnEntity<T> implements Serializable {
    private static final long serialVersionUID = 1;
    private String message;
    private T data;
    private String errorMessage;
}
