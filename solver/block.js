// 字符     含义
// @   ==> 人 (man)
// +   ==> 人在目标点 (man on goal)
// $   ==> 箱子 (box)
// *   ==> 箱子在目标点 (box on goal)
// #   ==> 墙 (wall)
// .   ==> 目标点 (goal)
// -   ==> XSB格式空格代表“地板”，又因为连续多个空格在网页或即时通讯软件中偶尔显示有问题，
//         也用“-”或“_”代替空格。(floor, represented by ' ' or '-' or '_')
class Block {
    constructor(type, col, row) {
        this.type = type
        this.col = col;
        this.row = row;
    }
}

exports.Block = Block;
