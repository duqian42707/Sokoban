import {Block} from "./Block";
import {getMaxXY, xsbToBlocks} from "../utils/blockUtils";

/**
 * 关卡
 */
export class Stage {

    constructor(level, xsb, solve) {
        this.level = level;
        this.xsb = xsb;
        this.solve = solve;
        this.blocks = xsbToBlocks(this.xsb);

        this.autoTransposition();
    }


    autoTransposition() {
        const maxXY = getMaxXY(this.blocks);
        if (maxXY.maxX > maxXY.maxY) {
            this.blocks = this.blocks.map(item => new Block(item.type, item.row, item.col));
        }
    }


}
