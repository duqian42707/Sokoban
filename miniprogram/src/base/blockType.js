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
