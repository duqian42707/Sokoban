package com.dqv5.sokoban.pojo;

import com.dqv5.sokoban.common.BlockType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BlockEntity {
    private BlockType type;
    private int col;
    private int row;
}
