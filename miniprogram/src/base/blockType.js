import ImageMgmt from "../runtime/image";

const imageMgmt = new ImageMgmt();

export class BlockType {
    static MAN = new BlockType('@', imageMgmt.man);
    static MAN_ON_GOAL = new BlockType('+', imageMgmt.manOnGoal);
    static BOX = new BlockType('$', imageMgmt.box);
    static BOX_ON_GOAL = new BlockType('*', imageMgmt.boxOnGoal);
    static WALL = new BlockType('#', imageMgmt.wall);
    static GOAL = new BlockType('.', imageMgmt.goal);
    static FLOOR = new BlockType('-', imageMgmt.floor);

    static ALL_LIST = [
        this.MAN,
        this.MAN_ON_GOAL,
        this.BOX,
        this.BOX_ON_GOAL,
        this.WALL,
        this.GOAL,
        this.FLOOR
    ]

    constructor(text, img) {
        this.text = text
        this.img = img
        this.sourceX = 0
        this.sourceY = 0
        this.sourceWidth = 20
        this.sourceHeight = 20
    }

    static parse(text) {
        return this.ALL_LIST.find(x => x.text === text)
    }

}
