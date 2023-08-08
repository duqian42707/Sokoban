import {getData} from "../data2";
import {solve} from "../solve";

/**
 * 关卡
 */
export class Stage {

    constructor(level) {
        this.level = level;
        this.blocks = getData(level);
        this.solveSteps = solve(this.blocks);
    }


}
