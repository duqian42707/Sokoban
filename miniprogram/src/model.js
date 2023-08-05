// 字符     含义
// @   ==> 人 (man)
// +   ==> 人在目标点 (man on goal)
// $   ==> 箱子 (box)
// *   ==> 箱子在目标点 (box on goal)
// #   ==> 墙 (wall)
// .   ==> 目标点 (goal)
// -   ==> XSB格式空格代表“地板”，又因为连续多个空格在网页或即时通讯软件中偶尔显示有问题，
//         也用“-”或“_”代替空格。(floor, represented by ' ' or '-' or '_')


export class BlockType {

    static MAN = new BlockType('@', 20, 0, 20, 20);
    static MAN_ON_GOAL = new BlockType('+', 20, 20, 20, 20);
    static BOX = new BlockType('$', 40, 0, 20, 20);
    static BOX_ON_GOAL = new BlockType('*', 60, 20, 20, 20);
    static WALL = new BlockType('#', 0, 40, 20, 20);
    static GOAL = new BlockType('.', 0, 20, 20, 20);
    static FLOOR = new BlockType('-', 0, 0, 20, 20);

    static ALL_LIST = [
        this.MAN,
        this.MAN_ON_GOAL,
        this.BOX,
        this.BOX_ON_GOAL,
        this.WALL,
        this.GOAL,
        this.FLOOR
    ]

    constructor(text, sourceX, sourceY, sourceWidth, sourceHeight) {
        this.text = text
        this.sourceX = sourceX
        this.sourceY = sourceY
        this.sourceWidth = sourceWidth
        this.sourceHeight = sourceHeight
    }

    static parse(text) {
        return this.ALL_LIST.find(x => x.text === text)
    }

}

export class Block {
    constructor(type, x, y) {
        this.type = type
        this.x = x;
        this.y = y;
    }

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
