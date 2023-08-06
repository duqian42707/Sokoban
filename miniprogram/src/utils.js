import {Block} from "./base/block";

export function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

/**
 * 行列转置
 * @param blocks
 */
export function transposition(blocks) {
    return blocks.map(item => new Block(item.type, item.row, item.col));
}


/**
 * 删除若干行，后面的行往前补充
 * @param blocks
 */
export function deleteRows(blocks, rowNums) {
    return blocks.filter(item => rowNums.indexOf(item.row) === -1)
        .map(item => {
            let minus = 0;
            rowNums.forEach(rowNum => item.row > rowNum && minus++);
            return new Block(item.type, item.col, item.row - minus);
        })
}

/**
 * 删除若干列，后面的列往前补充
 * @param blocks
 */
export function deleteColumns(blocks, columnNums) {
    return blocks.filter(item => columnNums.indexOf(item.col) === -1)
        .map(item => {
            let minus = 0;
            columnNums.forEach(rowNum => item.col > rowNum && minus++);
            return new Block(item.type, item.col - minus, item.row);
        })
}

/**
 * 获取最大行列数
 * @param blocks
 */
export function getMaxXY(blocks) {
    let maxX = 0, maxY = 0;
    for (let i = 0; i < blocks.length; i++) {
        const item = blocks[i];
        maxX = Math.max(maxX, item.col);
        maxY = Math.max(maxY, item.row);
    }
    return {maxX, maxY};
}


/**
 * 计算block的x，y坐标
 * @param blocks
 */
export function setXYOfBlocks(blocks, width, marginTop, marginLeft) {
    blocks.forEach(item => {
        item.width = width;
        item.height = width;
        item.setMarginTop(marginTop)
        item.setMarginLeft(marginLeft)
    })
}
