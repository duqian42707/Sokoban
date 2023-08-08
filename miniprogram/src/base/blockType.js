export class BlockType {
    static MAN = new BlockType('@', 'assets/man.png');
    static MAN_ON_GOAL = new BlockType('+', 'assets/man_on_goal.png');
    static BOX = new BlockType('$', 'assets/box.png');
    static BOX_ON_GOAL = new BlockType('*', 'assets/box_on_goal.png');
    static WALL = new BlockType('#', 'assets/wall.png');
    static GOAL = new BlockType('.', 'assets/goal.png');
    static FLOOR = new BlockType('-', 'assets/floor.png');

    static ALL_LIST = [
        this.MAN,
        this.MAN_ON_GOAL,
        this.BOX,
        this.BOX_ON_GOAL,
        this.WALL,
        this.GOAL,
        this.FLOOR
    ]

    constructor(text, imgSrc) {
        this.text = text
        this.imgSrc = imgSrc
        this.sourceX = 0
        this.sourceY = 0
        this.sourceWidth = 20
        this.sourceHeight = 20
    }

    static parse(text) {
        return this.ALL_LIST.find(x => x.text === text)
    }

}
