package com.dqv5.sokoban.common;

import java.util.Arrays;

public enum BlockType {
    MAN("@"),
    MAN_ON_GOAL("+"),
    BOX("$"),
    BOX_ON_GOAL("*"),
    WALL("#"),
    GOAL("."),
    FLOOR("-");

    private final String text;

    BlockType(String text) {
        this.text = text;
    }

    public static BlockType fromText(String aChar) {
        return Arrays.stream(values()).filter(x -> x.text.equals(aChar)).findFirst().orElseThrow(() -> new RuntimeException("参数错误"));
    }


    public String getText() {
        return text;
    }
}
