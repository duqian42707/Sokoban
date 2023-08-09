import {blockToXSB, deleteColumns, deleteRows, getMaxXY, xsbToBlocks} from "../utils/blockUtils";
import {BlockType} from "./blockType";
import CommonUtils from "../utils/commonUtils";

/**
 * 关卡
 */
export class Stage {

    constructor(level, xsb, solve) {
        this.level = level;
        this.xsb = xsb;
        this.solve = solve;
        this.blocks = xsbToBlocks(this.xsb);
        const maxXY = getMaxXY(this.blocks);
        this.maxX = maxXY.maxX;
        this.maxY = maxXY.maxY;

        this.autoDeleteRowCols();
        this.autoTransposition();
    }


    /**
     * 如果某行或某列都是空白，则删除这一行/列
     */
    autoDeleteRowCols() {
        const rowsToDelete = [];
        for (let y = 0; y <= this.maxY; y++) {
            let allFloor = true;
            for (let x = 0; x <= this.maxX; x++) {
                const block = this.blocks[y * (this.maxX + 1) + x];
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
        for (let x = 0; x <= this.maxX; x++) {
            let allFloor = true;
            for (let y = 0; y <= this.maxY; y++) {
                const block = this.blocks[y * (this.maxX + 1) + x];
                if (block.type !== BlockType.FLOOR) {
                    allFloor = false;
                    break;
                }
            }
            if (allFloor) {
                columnsToDelete.push(x);
            }
        }

        this.blocks = deleteRows(this.blocks, rowsToDelete);
        this.blocks = deleteColumns(this.blocks, columnsToDelete);

        const maxXY = getMaxXY(this.blocks);
        this.maxX = maxXY.maxX;
        this.maxY = maxXY.maxY;
        this.xsb = blockToXSB(this.blocks);
    }


    /**
     * 隐藏墙外多余的空地，使其变为透明，提升显示效果
     */
    autoHideEmptyBlocks() {
        // 1.每一列从上到下
        for (let i = 0; i <= this.maxX; i++) {
            const toHide = [];
            for (let j = 0; j <= this.maxY; j++) {
                const item = this.blocks[j * (this.maxX + 1) + i];
                if (item.type === BlockType.FLOOR) {
                    toHide.push(item);
                } else {
                    break;
                }
            }
            toHide.forEach(item => item.visible = false);
        }
        // 2.每一列从下到上
        for (let i = 0; i <= this.maxX; i++) {
            const toHide = [];
            for (let j = this.maxY; j >= 0; j--) {
                const item = this.blocks[j * (this.maxX + 1) + i];
                if (item.type === BlockType.FLOOR) {
                    toHide.push(item);
                } else {
                    break;
                }
            }
            toHide.forEach(item => item.visible = false);
        }
        // 3.每一行从左到右
        for (let j = 0; j <= this.maxY; j++) {
            const toHide = [];
            for (let i = 0; i <= this.maxX; i++) {
                const item = this.blocks[j * (this.maxX + 1) + i];
                if (item.type === BlockType.FLOOR) {
                    toHide.push(item);
                } else {
                    break;
                }
            }
            toHide.forEach(item => item.visible = false);
        }
        // 4.每一行从右到左
        for (let j = 0; j <= this.maxY; j++) {
            const toHide = [];
            for (let i = this.maxX; i >= 0; i--) {
                const item = this.blocks[j * (this.maxX + 1) + i];
                if (item.type === BlockType.FLOOR) {
                    toHide.push(item);
                } else {
                    break;
                }
            }
            toHide.forEach(item => item.visible = false);
        }
    }


    /**
     * 如果宽比高大，进行行列转换，方便竖屏显示
     */
    autoTransposition() {
        if (this.maxX > this.maxY) {
            this.blocks.forEach(item => {
                const {col, row} = item;
                item.col = row;
                item.row = col;
            });
            this.xsb = blockToXSB(this.blocks);
        }
    }


    /**
     * 给地图四周添加空白，以保持显示大小基本不变
     * @param xsbStr
     * @param targetCols
     * @param targetRows
     */
    adjustToArea(targetCols, targetRows) {
        const rows = this.xsb.split('\n');
        const rowsNum = rows.length;
        const colsNum = rows[0].length;

        const addRows = (targetRows + 1 - rowsNum) / 2;
        const addCols = (targetCols + 1 - colsNum) / 2;

        for (let i = 0; i < addRows; i++) {
            rows.splice(0, 0, CommonUtils.stringOfNum('-', colsNum));
            rows.push(CommonUtils.stringOfNum('-', colsNum));
        }

        for (let i = 0; i < rows.length; i++) {
            rows[i] = CommonUtils.stringOfNum('-', addCols) + rows[i] + CommonUtils.stringOfNum('-', addCols);
        }

        this.xsb = rows.join('\n');
        this.blocks = xsbToBlocks(this.xsb);
        const maxXY = getMaxXY(this.blocks);
        this.maxX = maxXY.maxX;
        this.maxY = maxXY.maxY;

        this.autoHideEmptyBlocks();
    }

}
