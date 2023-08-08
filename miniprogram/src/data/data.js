import {BlockType} from "./base/blockType";
import {Block} from "./base/block";
import {blockToXSB, deleteColumns, deleteRows, getMaxXY, transposition} from "./utils/blockUtils";

export function getData(gameData, level) {
    const {tree, box, goal, boy} = gameData[level - 1];
    const dataArray = [];
    let blocks = [];
    tree.split('|').forEach(t => {
        const position = t.split(',').map(Number);
        dataArray.push(new Block(BlockType.WALL, position[0] - 1, position[1] - 1))
    })
    box.split('|').forEach(t => {
        const position = t.split(',').map(Number);
        dataArray.push(new Block(BlockType.BOX, position[0] - 1, position[1] - 1))
    })
    goal.split('|').forEach(t => {
        const position = t.split(',').map(Number);
        dataArray.push(new Block(BlockType.GOAL, position[0] - 1, position[1] - 1))
    })
    boy.split('|').forEach(t => {
        const position = t.split(',').map(Number);
        dataArray.push(new Block(BlockType.MAN, position[0] - 1, position[1] - 1))
    })

    let maxXY = getMaxXY(dataArray);

    for (let row = 0; row <= maxXY.maxY; row++) {
        for (let col = 0; col <= maxXY.maxX; col++) {
            const target = dataArray.filter(item => item.col === col && item.row === row);
            if (target.length === 0) {
                blocks.push(new Block(BlockType.FLOOR, col, row))
            } else if (target.length === 1) {
                blocks.push(target[0]);
            } else {
                blocks.push(target[0].merge(target[1]));
            }
        }
    }

    // 如果某行或某列都是空白，则删除这一行/列
    const rowsToDelete = [];
    for (let y = 0; y <= maxXY.maxY; y++) {
        let allFloor = true;
        for (let x = 0; x <= maxXY.maxX; x++) {
            const block = blocks[y * (maxXY.maxX + 1) + x];
            if (block.type !== BlockType.FLOOR) {
                allFloor = false;
                break;
            }
        }
        if (allFloor) {
            rowsToDelete.push(y);
        }
    }

    const columnsToDelete = [];
    for (let x = 0; x <= maxXY.maxX; x++) {
        let allFloor = true;
        for (let y = 0; y <= maxXY.maxY; y++) {
            const block = blocks[y * (maxXY.maxX + 1) + x];
            if (block.type !== BlockType.FLOOR) {
                allFloor = false;
                break;
            }
        }
        if (allFloor) {
            columnsToDelete.push(x);
        }
    }

    blocks = deleteRows(blocks, rowsToDelete);
    blocks = deleteColumns(blocks, columnsToDelete);

    maxXY = getMaxXY(blocks);
    if (maxXY.maxX > maxXY.maxY) {
        // 如果宽比高大，进行行列转换，方便竖屏显示
        blocks = transposition(blocks);
    }
    return blocks;
}


export function printXSBs() {
    let result = [];
    for (let i = 100; i < 113; i++) {
        const blocks = getData(i + 1);
        const str = blockToXSB(blocks);
        result.push(str);
    }
    console.log(JSON.stringify(result));
}
