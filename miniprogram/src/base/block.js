// 字符     含义
// @   ==> 人 (man)
// +   ==> 人在目标点 (man on goal)
// $   ==> 箱子 (box)
// *   ==> 箱子在目标点 (box on goal)
// #   ==> 墙 (wall)
// .   ==> 目标点 (goal)
// -   ==> XSB格式空格代表“地板”，又因为连续多个空格在网页或即时通讯软件中偶尔显示有问题，
//         也用“-”或“_”代替空格。(floor, represented by ' ' or '-' or '_')
import Sprite from "./sprite";
import {BlockType} from "./blockType";

export class Block extends Sprite {
    constructor(type, x, y) {
        super('assets/borgar.png', type.sourceWidth, type.sourceHeight)
        this.type = type
        this.x = x;
        this.y = y;
    }

    /**
     * 与另外一个块合并，二者必须是相同位置才行
     * 目标 + 人   ==> 人在目标
     * 目标 + 箱子 ==> 箱子在目标
     * @param another
     * @returns {Block}
     */
    merge(another) {
        if (this.x === another.x && this.y === another.y && (this.type === BlockType.GOAL || another.type === BlockType.GOAL)) {
            if (this.type === BlockType.MAN || another.type === BlockType.MAN) {
                return new Block(BlockType.MAN_ON_GOAL, this.x, this.y);
            }
            if (this.type === BlockType.BOX || another.type === BlockType.BOX) {
                return new Block(BlockType.BOX_ON_GOAL, this.x, this.y);
            }
        }
        return this;
    }

}
