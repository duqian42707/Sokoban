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
    return blocks.map(item => ({type: item.type, x: item.y, y: item.x}));

}


/**
 * 删除若干行，后面的行往前补充
 * @param blocks
 */
export function deleteRows(blocks, rowNums) {
    return blocks.filter(item => rowNums.indexOf(item.y) === -1)
        .map(item => {
            let minus = 0;
            rowNums.forEach(rowNum => item.y > rowNum && minus++);
            return {type: item.type, x: item.x, y: item.y - minus};
        })
}

/**
 * 删除若干列，后面的列往前补充
 * @param blocks
 */
export function deleteColumns(blocks, columnNums) {
    return blocks.filter(item => columnNums.indexOf(item.x) === -1)
        .map(item => {
            let minus = 0;
            columnNums.forEach(rowNum => item.x > rowNum && minus++);
            return {type: item.type, x: item.x - minus, y: item.y};
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
        maxX = Math.max(maxX, item.x);
        maxY = Math.max(maxY, item.y);
    }
    return {maxX, maxY};
}
