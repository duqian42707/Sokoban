import {Block} from "../base/block";
import {BlockType} from "../base/blockType";
import {solve} from "./solve";

/**
 * 行列转置
 * @param blocks
 */
export function transposition(blocks) {
    return blocks.map(item => new Block(item.type, item.row, item.col));
}

/**
 * 将解答转置
 * @param direction
 * @returns {string}
 */
export function transpositionSolve(direction) {
    if (direction === 'left') {
        return 'up';
    }
    if (direction === 'right') {
        return 'down';
    }
    if (direction === 'up') {
        return 'left';
    }
    if (direction === 'down') {
        return 'right';
    }
}


export function autoTransposition(blocks) {
    const maxXY = getMaxXY(blocks);
    const maxX = maxXY.maxX;
    const maxY = maxXY.maxY;
    if (maxX > maxY) {
        blocks.forEach(item => {
            const {col, row} = item;
            item.col = row;
            item.row = col;
        });
        return true;
    }
    return false
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

export function sortBlocks(blocks) {
    blocks.sort((a, b) => a.row !== b.row ? (a.row - b.row) : (a.col - b.col));
}


/**
 * 将xsb格式的文本转为block数组
 * @param xsbText
 * @returns {*[]}
 */
export function xsbToBlocks(xsbText) {
    const blocks = [];
    const rows = xsbText.split('\n');
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const chars = row.split('');
        for (let j = 0; j < chars.length; j++) {
            const blockType = BlockType.parse(chars[j]);
            blocks.push(new Block(blockType, j, i));
        }
    }
    return blocks;
}


/**
 * 将block数组转为xsbText
 * @param blocks
 */
export function blockToXSB(blocks) {
    sortBlocks(blocks);
    let str = '';
    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        if (i > 0 && block.col === 0) {
            str += '\n';
        }
        str += block.type.text
    }
    return str;
}


export function countNum(xsbStr) {
    const result = {};
    const chars = xsbStr.replace('\n', '').split('')
    for (const char of chars) {
        if (result[char] == null) {
            result[char] = 0;
        }
        result[char] = result[char] + 1;
    }
    return result;
}


export async function solveAll(stageList) {
    for (let i = 0; i < stageList.length; i++) {
        const stage = stageList[i];
        if (stage.solve || stage.skip || stage.xsb.length > 110) {
            continue;
        }
        const blocks = xsbToBlocks(stage.xsb);
        console.log('solving:' + stage.level);
        const steps = await solve(blocks);
        if (steps && steps.length > 0) {
            console.log('solved:' + stage.level);
            stageList[i].solve = steps;
        } else {
            console.log('skip:' + stage.level);
            stageList[i].skip = true;
        }
        console.log('export const DATA_LIST = ' + JSON.stringify(stageList));
    }
    return stageList;
}
