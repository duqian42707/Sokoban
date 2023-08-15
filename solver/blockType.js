class BlockType {
    static MAN = '@';
    static MAN_ON_GOAL = '+';
    static BOX = '$';
    static BOX_ON_GOAL = '*';
    static WALL = '#';
    static GOAL = '.';
    static FLOOR = '-';

    static ALL_LIST = [
        this.MAN,
        this.MAN_ON_GOAL,
        this.BOX,
        this.BOX_ON_GOAL,
        this.WALL,
        this.GOAL,
        this.FLOOR
    ]


    static parse(text) {
        return this.ALL_LIST.find(x => x === text)
    }

}

exports.BlockType = BlockType
