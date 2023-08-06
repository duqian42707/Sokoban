import {Block, BlockType} from "./model";
import {deleteColumns, deleteRows, getMaxXY, transposition} from "./utils";

const gameData = [{
    tree: '4,7|5,7|6,7|7,7|8,7|9,7|10,7|4,6|10,6|4,5|10,5|4,4|10,4|4,3|5,3|6,3|7,3|8,3|9,3|10,3',
    box: '8,6|6,5|8,5|6,4',
    goal: '5,6|9,6|5,4|9,4',
    boy: '7,5'
}, {
    tree: '3,2|4,2|5,2|6,2|7,2|8,2|9,2|10,2|3,3|7,3|10,3|3,4|10,4|3,5|7,5|10,5|3,6|4,6|5,6|6,6|7,6|8,6|9,6|10,6',
    box: '7,4',
    goal: '9,4',
    boy: '8,4'
}, {
    tree: '6,2|7,2|8,2|9,2|4,3|5,3|6,3|9,3|4,4|9,4|10,4|4,5|10,5|4,6|6,6|10,6|4,7|5,7|6,7|7,7|8,7|9,7|10,7',
    box: '6,4|6,5',
    goal: '8,4|7,6',
    boy: '5,6'
}, {
    tree: '5,1|6,1|7,1|8,1|9,1|10,1|4,2|5,2|10,2|4,3|8,3|10,3|4,4|10,4|4,5|7,5|9,5|10,5|4,6|5,6|9,6|5,7|6,7|7,7|8,7|9,7',
    box: '6,3|7,4|8,5',
    goal: '8,2|6,3|6,4',
    boy: '7,6'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|9,1|10,1|4,2|10,2|4,3|6,3|8,3|10,3|4,4|10,4|4,5|9,5|10,5|4,6|7,6|8,6|9,6|4,7|5,7|6,7|7,7',
    box: '8,4|6,5|7,5',
    goal: '7,2|7,3|5,5',
    boy: '8,2'
}, {
    tree: '7,1|8,1|9,1|10,1|4,2|5,2|6,2|7,2|10,2|4,3|10,3|4,4|10,4|4,5|5,5|8,5|9,5|10,5|5,6|8,6|5,7|8,7|5,8|6,8|7,8|8,8',
    box: '7,3|8,3|6,6',
    goal: '7,3|7,5|7,7',
    boy: '9,2'
}, {
    tree: '4,1|5,1|6,1|8,1|9,1|10,1|4,2|6,2|7,2|8,2|10,2|4,3|6,3|10,3|4,4|10,4|4,5|10,5|4,6|7,6|10,6|4,7|7,7|8,7|9,7|10,7|4,8|5,8|6,8|7,8',
    box: '6,4|7,4|7,5',
    goal: '5,2|9,2|9,3',
    boy: '9,4'
}, {
    tree: '6,1|7,1|8,1|9,1|6,2|9,2|10,2|3,3|4,3|5,3|6,3|10,3|3,4|6,4|10,4|3,5|9,5|10,5|3,6|8,6|9,6|3,7|4,7|8,7|4,8|5,8|6,8|7,8|8,8',
    box: '7,4|8,4|7,6',
    goal: '4,4|4,6|5,7',
    boy: '8,2'
}, {
    tree: '3,2|4,2|5,2|6,2|7,2|3,3|7,3|8,3|9,3|10,3|3,4|10,4|3,5|6,5|8,5|10,5|3,6|10,6|3,7|4,7|5,7|6,7|7,7|8,7|9,7|10,7',
    box: '5,4|7,5|8,6',
    goal: '5,3|6,3|7,6',
    boy: '5,6'
}, {
    tree: '6,1|7,1|8,1|9,1|10,1|4,2|5,2|6,2|10,2|4,3|8,3|10,3|4,4|10,4|4,5|7,5|10,5|4,6|9,6|10,6|4,7|8,7|9,7|4,8|5,8|6,8|7,8|8,8',
    box: '6,3|6,4|7,4',
    goal: '9,2|6,4|6,5',
    boy: '8,5'
}, {
    tree: '3,1|4,1|5,1|6,1|7,1|8,1|9,1|3,2|9,2|3,3|7,3|9,3|10,3|3,4|5,4|10,4|3,5|8,5|10,5|3,6|4,6|5,6|6,6|10,6|6,7|7,7|8,7|9,7|10,7',
    box: '6,3|7,4|7,5',
    goal: '4,2|8,2|8,4',
    boy: '7,2'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|4,2|8,2|9,2|10,2|4,3|6,3|10,3|4,4|10,4|4,5|7,5|10,5|4,6|5,6|9,6|10,6|5,7|6,7|7,7|8,7|9,7',
    box: '7,3|8,3|6,5',
    goal: '5,2|7,2|5,3',
    boy: '8,4'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|4,2|8,2|9,2|10,2|4,3|6,3|10,3|4,4|8,4|10,4|4,5|10,5|4,6|5,6|8,6|9,6|10,6|5,7|8,7|5,8|6,8|7,8|8,8',
    box: '6,5|7,5|8,5',
    goal: '5,2|6,4|7,5',
    boy: '6,6'
}, {
    tree: '3,1|4,1|5,1|6,1|7,1|8,1|9,1|10,1|3,2|10,2|3,3|5,3|7,3|10,3|3,4|10,4|3,5|4,5|5,5|6,5|7,5|10,5|7,6|10,6|7,7|8,7|9,7|10,7',
    box: '5,4|8,4|9,5',
    goal: '4,2|8,2|9,4',
    boy: '4,4'
}, {
    tree: '3,1|4,1|5,1|6,1|3,2|6,2|3,3|6,3|7,3|8,3|9,3|10,3|3,4|10,4|3,5|4,5|10,5|4,6|6,6|8,6|9,6|10,6|4,7|8,7|4,8|5,8|6,8|7,8|8,8',
    box: '6,4|5,5|7,6',
    goal: '5,4|6,4|5,7',
    boy: '7,7'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|4,2|8,2|9,2|10,2|3,3|4,3|10,3|3,4|10,4|3,5|4,5|6,5|8,5|9,5|10,5|4,6|8,6|4,7|5,7|6,7|7,7|8,7',
    box: '6,4|8,4|5,5',
    goal: '6,3|4,4|7,4',
    boy: '6,2'
}, {
    tree: '5,1|6,1|7,1|8,1|9,1|4,2|5,2|9,2|4,3|7,3|9,3|4,4|9,4|10,4|4,5|10,5|4,6|5,6|7,6|10,6|5,7|9,7|10,7|5,8|6,8|7,8|8,8|9,8',
    box: '6,3|6,5|8,6',
    goal: '6,4|6,5|6,7',
    boy: '8,4'
}, {
    tree: '4,1|5,1|6,1|7,1|3,2|4,2|7,2|8,2|9,2|10,2|3,3|10,3|3,4|5,4|10,4|3,5|7,5|10,5|3,6|4,6|5,6|6,6|7,6|10,6|7,7|8,7|9,7|10,7',
    box: '6,3|6,4|8,4',
    goal: '4,3|5,3|9,3',
    boy: '4,5'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|9,1|4,2|9,2|10,2|4,3|10,3|4,4|5,4|6,4|8,4|10,4|3,5|4,5|10,5|3,6|9,6|10,6|3,7|7,7|8,7|9,7|3,8|4,8|5,8|6,8|7,8',
    box: '8,3|7,4|6,6',
    goal: '7,2|9,3|7,4',
    boy: '8,2'
}, {
    tree: '4,1|5,1|6,1|7,1|4,2|7,2|4,3|7,3|3,4|4,4|7,4|8,4|9,4|10,4|3,5|10,5|3,6|8,6|9,6|10,6|3,7|4,7|5,7|8,7|5,8|6,8|7,8|8,8',
    box: '5,5|6,5|6,6',
    goal: '5,4|7,5|9,5',
    boy: '5,2'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|4,2|8,2|4,3|6,3|8,3|9,3|10,3|4,4|10,4|4,5|10,5|4,6|8,6|9,6|10,6|4,7|5,7|6,7|7,7|8,7',
    box: '6,4|7,4|7,5',
    goal: '5,2|6,4|8,5',
    boy: '7,6'
}, {
    tree: '6,1|7,1|8,1|9,1|10,1|6,2|10,2|6,3|8,3|10,3|4,4|5,4|6,4|10,4|4,5|10,5|4,6|10,6|4,7|5,7|6,7|7,7|8,7|9,7|10,7',
    box: '7,5|8,5|8,6',
    goal: '9,3|9,4|7,6',
    boy: '5,5'
}, {
    tree: '3,1|4,1|5,1|6,1|7,1|8,1|3,2|8,2|3,3|6,3|8,3|9,3|10,3|3,4|10,4|3,5|7,5|8,5|10,5|3,6|4,6|10,6|4,7|5,7|9,7|10,7|5,8|6,8|7,8|8,8|9,8',
    box: '5,3|5,4|7,4',
    goal: '5,4|5,6|8,6',
    boy: '7,2'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|9,1|4,2|9,2|10,2|4,3|7,3|10,3|4,4|10,4|4,5|8,5|10,5|4,6|5,6|6,6|10,6|6,7|7,7|8,7|9,7|10,7',
    box: '8,4|6,5|7,5',
    goal: '5,4|9,5|9,6',
    boy: '8,2'
}, {
    tree: '5,2|6,2|7,2|8,2|3,3|4,3|5,3|8,3|3,4|8,4|9,4|10,4|3,5|10,5|3,6|4,6|10,6|4,7|5,7|6,7|7,7|8,7|9,7|10,7',
    box: '7,5|8,5|8,6',
    goal: '6,3|5,4|6,6',
    boy: '9,6'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|9,1|3,2|4,2|9,2|3,3|9,3|3,4|6,4|9,4|10,4|3,5|6,5|10,5|3,6|4,6|5,6|6,6|8,6|10,6|6,7|10,7|6,8|7,8|8,8|9,8|10,8',
    box: '5,3|6,3|7,3',
    goal: '6,2|7,3|9,5',
    boy: '5,2'
}, {
    tree: '7,1|8,1|9,1|10,1|7,2|10,2|5,3|6,3|7,3|10,3|5,4|10,4|3,5|4,5|5,5|8,5|10,5|3,6|10,6|3,7|7,7|10,7|3,8|4,8|5,8|6,8|7,8|8,8|9,8|10,8',
    box: '8,3|5,6|8,6',
    goal: '9,3|8,4|9,5',
    boy: '8,7'
}, {
    tree: '3,1|4,1|5,1|6,1|7,1|3,2|7,2|8,2|9,2|3,3|9,3|3,4|6,4|7,4|9,4|10,4|3,5|4,5|7,5|10,5|4,6|10,6|4,7|7,7|8,7|9,7|10,7|4,8|5,8|6,8|7,8',
    box: '5,3|8,4|5,6',
    goal: '6,2|6,3|7,3',
    boy: '9,6'
}, {
    tree: '5,1|6,1|7,1|8,1|5,2|8,2|5,3|8,3|9,3|10,3|3,4|4,4|5,4|10,4|3,5|7,5|10,5|3,6|10,6|3,7|4,7|5,7|6,7|10,7|6,8|7,8|8,8|9,8|10,8',
    box: '6,5|7,6|8,6',
    goal: '7,4|8,4|6,6',
    boy: '8,7'
}, {
    tree: '3,1|4,1|5,1|6,1|7,1|3,2|7,2|8,2|9,2|3,3|5,3|9,3|10,3|3,4|10,4|3,5|4,5|5,5|10,5|5,6|10,6|5,7|6,7|7,7|8,7|9,7|10,7',
    box: '7,3|6,4|6,5',
    goal: '7,3|6,4|9,6',
    boy: '8,3'
}, {
    tree: '5,1|6,1|7,1|8,1|9,1|10,1|3,2|4,2|5,2|10,2|3,3|7,3|10,3|3,4|7,4|9,4|10,4|3,5|9,5|3,6|4,6|7,6|9,6|4,7|5,7|9,7|5,8|6,8|7,8|8,8|9,8',
    box: '5,3|6,4|6,5',
    goal: '7,2|8,3|6,5',
    boy: '6,3'
}, {
    tree: '4,2|5,2|6,2|7,2|3,3|4,3|7,3|8,3|9,3|3,4|9,4|10,4|3,5|6,5|10,5|3,6|10,6|3,7|4,7|5,7|6,7|7,7|8,7|9,7|10,7',
    box: '7,5|8,5|8,6',
    goal: '6,6|8,6|9,6',
    boy: '9,5'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|9,1|10,1|3,2|4,2|10,2|3,3|6,3|10,3|3,4|9,4|10,4|3,5|6,5|9,5|3,6|6,6|7,6|8,6|9,6|3,7|4,7|5,7|6,7',
    box: '5,4|6,4|7,4',
    goal: '4,3|8,4|5,5',
    boy: '5,2'
}, {
    tree: '3,1|4,1|5,1|6,1|7,1|8,1|9,1|10,1|3,2|10,2|3,3|5,3|7,3|8,3|10,3|3,4|5,4|10,4|3,5|10,5|3,6|4,6|5,6|6,6|7,6|10,6|7,7|10,7|7,8|8,8|9,8|10,8',
    box: '9,3|8,4|5,5',
    goal: '9,3|4,5|7,5',
    boy: '6,4'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|9,1|4,2|9,2|10,2|4,3|5,3|10,3|3,4|4,4|5,4|10,4|3,5|7,5|9,5|10,5|3,6|9,6|3,7|4,7|5,7|6,7|9,7|6,8|7,8|8,8|9,8',
    box: '6,3|5,5|8,5',
    goal: '7,4|5,6|8,6',
    boy: '5,2'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|4,2|8,2|9,2|10,2|4,3|10,3|4,4|5,4|10,4|5,5|10,5|5,6|6,6|8,6|10,6|6,7|10,7|6,8|7,8|8,8|9,8|10,8',
    box: '7,3|6,4|7,4',
    goal: '9,4|8,5|9,7',
    boy: '6,5'
}, {
    tree: '3,1|4,1|5,1|6,1|7,1|3,2|7,2|8,2|9,2|10,2|3,3|10,3|3,4|6,4|10,4|3,5|6,5|7,5|9,5|10,5|3,6|6,6|7,6|9,6|3,7|9,7|3,8|4,8|5,8|6,8|7,8|8,8|9,8',
    box: '5,3|6,3|8,6',
    goal: '5,4|7,4|8,7',
    boy: '5,7'
}, {
    tree: '3,2|4,2|5,2|6,2|7,2|8,2|3,3|8,3|3,4|6,4|8,4|9,4|10,4|3,5|10,5|3,6|10,6|3,7|4,7|5,7|6,7|7,7|8,7|9,7|10,7',
    box: '6,5|7,5|5,6',
    goal: '5,3|5,4|6,6',
    boy: '5,5'
}, {
    tree: '3,1|4,1|5,1|6,1|7,1|8,1|9,1|10,1|3,2|7,2|10,2|3,3|10,3|3,4|6,4|10,4|3,5|9,5|10,5|3,6|4,6|5,6|8,6|9,6|5,7|8,7|5,8|6,8|7,8|8,8',
    box: '6,3|7,4|6,5',
    goal: '6,2|5,3|8,3',
    boy: '5,2'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|9,1|10,1|3,2|4,2|10,2|3,3|10,3|3,4|7,4|8,4|9,4|10,4|3,5|6,5|7,5|3,6|6,6|3,7|6,7|3,8|4,8|5,8|6,8',
    box: '5,3|8,3|5,4',
    goal: '8,2|4,4|6,4',
    boy: '9,3'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|9,1|4,2|9,2|4,3|7,3|9,3|4,4|9,4|10,4|4,5|5,5|7,5|10,5|4,6|8,6|10,6|4,7|10,7|4,8|5,8|6,8|7,8|8,8|9,8|10,8',
    box: '7,4|6,5|7,7',
    goal: '6,2|5,7|7,7',
    boy: '8,3'
}, {
    tree: '6,1|7,1|8,1|9,1|10,1|3,2|4,2|5,2|6,2|10,2|3,3|10,3|3,4|7,4|10,4|3,5|5,5|10,5|3,6|7,6|8,6|9,6|10,6|3,7|4,7|5,7|6,7|7,7',
    box: '5,3|5,4|8,5',
    goal: '8,2|5,3|8,3',
    boy: '6,3'
}, {
    tree: '5,2|6,2|7,2|8,2|3,3|4,3|5,3|8,3|9,3|10,3|3,4|10,4|3,5|10,5|3,6|4,6|5,6|6,6|10,6|6,7|7,7|8,7|9,7|10,7',
    box: '8,4|6,5|7,5',
    goal: '5,4|6,4|9,4',
    boy: '9,5'
}, {
    tree: '7,1|8,1|9,1|10,1|7,2|10,2|3,3|4,3|5,3|6,3|7,3|10,3|3,4|10,4|3,5|10,5|3,6|4,6|5,6|10,6|5,7|6,7|7,7|8,7|9,7|10,7',
    box: '5,4|7,4|9,4',
    goal: '9,3|7,5|7,6',
    boy: '8,2'
}, {
    tree: '3,1|4,1|5,1|6,1|7,1|8,1|9,1|10,1|3,2|7,2|10,2|3,3|5,3|10,3|3,4|10,4|3,5|4,5|5,5|6,5|7,5|10,5|5,6|10,6|5,7|10,7|5,8|6,8|7,8|8,8|9,8|10,8',
    box: '7,3|9,3|7,4',
    goal: '6,3|8,5|9,7',
    boy: '9,6'
}, {
    tree: '6,1|7,1|8,1|9,1|5,2|6,2|9,2|10,2|4,3|5,3|10,3|3,4|4,4|7,4|9,4|10,4|3,5|10,5|3,6|6,6|10,6|3,7|8,7|9,7|10,7|3,8|4,8|5,8|6,8|7,8|8,8',
    box: '6,4|8,4|7,5',
    goal: '8,3|9,3|8,5',
    boy: '7,2'
}, {
    tree: '3,1|4,1|5,1|6,1|7,1|8,1|3,2|8,2|3,3|7,3|8,3|9,3|10,3|3,4|10,4|3,5|4,5|6,5|8,5|10,5|3,6|8,6|10,6|3,7|10,7|3,8|4,8|5,8|6,8|7,8|8,8|9,8|10,8',
    box: '5,3|6,3|5,4',
    goal: '7,4|7,5|4,6',
    boy: '7,2'
}, {
    tree: '6,1|7,1|8,1|9,1|6,2|9,2|3,3|4,3|5,3|6,3|9,3|10,3|3,4|10,4|3,5|5,5|6,5|10,5|3,6|7,6|8,6|10,6|3,7|10,7|3,8|4,8|5,8|6,8|7,8|8,8|9,8|10,8',
    box: '8,3|6,4|7,7',
    goal: '7,4|7,7|9,7',
    boy: '5,4'
}, {
    tree: '6,1|7,1|8,1|9,1|10,1|6,2|10,2|4,3|5,3|6,3|10,3|4,4|9,4|10,4|3,5|4,5|9,5|3,6|7,6|9,6|3,7|9,7|3,8|4,8|5,8|6,8|7,8|8,8|9,8',
    box: '6,4|8,4|6,5',
    goal: '4,6|4,7|5,7',
    boy: '8,2'
}, {
    tree: '6,1|7,1|8,1|9,1|10,1|3,2|4,2|5,2|6,2|10,2|3,3|10,3|3,4|5,4|8,4|9,4|10,4|3,5|10,5|3,6|4,6|5,6|6,6|10,6|6,7|7,7|8,7|9,7|10,7',
    box: '7,3|5,5|7,5',
    goal: '7,2|6,3|9,5',
    boy: '9,2'
}, {
    tree: '3,1|4,1|5,1|6,1|7,1|8,1|9,1|10,1|3,2|7,2|10,2|3,3|5,3|10,3|3,4|7,4|10,4|3,5|4,5|10,5|4,6|7,6|8,6|9,6|10,6|4,7|5,7|6,7|7,7',
    box: '7,3|5,4|8,4',
    goal: '6,2|6,4|6,5',
    boy: '9,2'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|9,1|10,1|4,2|10,2|4,3|6,3|7,3|10,3|4,4|10,4|4,5|7,5|10,5|4,6|7,6|10,6|4,7|5,7|6,7|7,7|8,7|9,7|10,7',
    box: '5,4|8,4|8,5',
    goal: '5,3|9,3|5,4',
    boy: '9,4'
}, {
    tree: '3,1|4,1|5,1|6,1|3,2|6,2|3,3|6,3|3,4|6,4|7,4|8,4|9,4|10,4|3,5|10,5|3,6|8,6|10,6|3,7|4,7|5,7|10,7|5,8|6,8|7,8|8,8|9,8|10,8',
    box: '5,3|6,5|6,6',
    goal: '4,2|5,5|5,6',
    boy: '8,5'
}, {
    tree: '3,1|4,1|5,1|6,1|7,1|8,1|9,1|10,1|3,2|10,2|3,3|5,3|10,3|3,4|8,4|10,4|3,5|4,5|6,5|10,5|4,6|10,6|4,7|5,7|6,7|7,7|8,7|9,7|10,7',
    box: '6,3|5,4|5,5',
    goal: '9,4|7,5|9,6',
    boy: '7,4'
}, {
    tree: '3,1|4,1|5,1|6,1|7,1|8,1|3,2|8,2|3,3|8,3|9,3|10,3|3,4|5,4|10,4|3,5|7,5|8,5|10,5|3,6|7,6|8,6|10,6|3,7|4,7|5,7|10,7|5,8|6,8|7,8|8,8|9,8|10,8',
    box: '6,4|7,4|5,6',
    goal: '6,2|8,4|4,5',
    boy: '4,6'
}, {
    tree: '8,0|9,0|10,0|11,0|6,1|7,1|8,1|11,1|6,2|11,2|6,3|11,3|2,4|3,4|4,4|5,4|6,4|7,4|9,4|10,4|11,4|2,5|9,5|10,5|11,5|2,6|3,6|5,6|11,6|3,7|7,7|9,7|11,7|3,8|7,8|11,8|3,9|4,9|5,9|6,9|7,9|8,9|9,9|10,9|11,9',
    box: '9,3|7,6|9,6|5,7',
    goal: '9,1|10,1|9,2|10,2',
    boy: '3,5'
}, {
    tree: '3,1|4,1|5,1|6,1|7,1|8,1|3,2|8,2|9,2|10,2|11,2|3,3|11,3|3,4|4,4|11,4|4,5|5,5|6,5|7,5|9,5|11,5|7,6|11,6|7,7|8,7|9,7|10,7|11,7',
    box: '6,3|7,3|8,3|7,4',
    goal: '4,2|5,2|6,2|7,2',
    boy: '4,3'
}, {
    tree: '3,1|4,1|5,1|6,1|7,1|8,1|3,2|8,2|9,2|10,2|11,2|3,3|11,3|3,4|4,4|11,4|4,5|5,5|6,5|7,5|9,5|11,5|7,6|11,6|7,7|8,7|9,7|10,7|11,7',
    box: '6,3|7,3|8,3|7,4|8,5',
    goal: '4,2|5,2|6,2|7,2|10,3',
    boy: '4,3'
}, {
    tree: '2,1|3,1|4,1|5,1|6,1|7,1|8,1|9,1|10,1|2,2|6,2|7,2|10,2|2,3|10,3|11,3|2,4|7,4|11,4|2,5|7,5|11,5|2,6|5,6|7,6|8,6|9,6|10,6|11,6|2,7|3,7|7,7|3,8|4,8|5,8|6,8|7,8',
    box: '4,3|5,3|5,4|6,4|4,5|5,5',
    goal: '8,3|9,3|8,4|9,4|8,5|9,5',
    boy: '5,2'
}, {
    tree: '2,0|3,0|4,0|5,0|2,1|5,1|6,1|7,1|2,2|7,2|8,2|9,2|10,2|11,2|12,2|2,3|12,3|2,4|3,4|4,4|7,4|8,4|9,4|12,4|2,5|3,5|4,5|7,5|11,5|12,5|2,6|11,6|2,7|7,7|8,7|11,7|2,8|6,8|7,8|8,8|11,8|2,9|3,9|4,9|5,9|6,9|8,9|9,9|10,9|11,9',
    box: '5,3|5,4|6,5|9,5|7,6|4,7|5,7',
    goal: '3,1|4,1|3,2|4,2|5,2|3,3|4,3',
    boy: '6,2'
}, {
    tree: '3,0|4,0|5,0|6,0|7,0|8,0|9,0|10,0|11,0|2,1|3,1|7,1|8,1|11,1|2,2|7,2|8,2|11,2|2,3|5,3|6,3|7,3|8,3|11,3|2,4|8,4|11,4|2,5|5,5|8,5|11,5|2,6|7,6|8,6|11,6|2,7|3,7|4,7|11,7|4,8|5,8|6,8|7,8|11,8|7,9|8,9|9,9|10,9|11,9',
    box: '5,2|4,3|10,3|4,5|6,5|9,5|5,6|10,7',
    goal: '9,1|10,1|9,2|10,2|9,3|10,3|9,4|10,4',
    boy: '6,1'
}, {
    tree: '3,1|4,1|5,1|6,1|7,1|8,1|9,1|10,1|3,2|10,2|3,3|10,3|3,4|10,4|3,5|10,5|3,6|9,6|10,6|3,7|4,7|5,7|6,7|7,7|8,7|9,7',
    box: '5,3|7,3|4,4|5,4|6,4|7,4|8,4|5,5',
    goal: '5,3|7,3|4,4|6,4|7,4|8,4|9,4|5,5',
    boy: '4,2'
}, {
    tree: '5,1|6,1|7,1|8,1|9,1|10,1|5,2|10,2|3,3|4,3|5,3|10,3|3,4|10,4|3,5|8,5|10,5|3,6|6,6|8,6|9,6|10,6|3,7|8,7|3,8|4,8|5,8|6,8|7,8|8,8',
    box: '7,2|8,3|6,4|8,4|5,5|6,5|7,5',
    goal: '8,2|9,2|8,3|9,3|8,4|9,4|9,5',
    boy: '4,7'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|3,2|4,2|8,2|9,2|10,2|11,2|3,3|11,3|3,4|8,4|11,4|2,5|3,5|5,5|6,5|11,5|2,6|6,6|10,6|11,6|2,7|8,7|9,7|10,7|2,8|3,8|4,8|5,8|6,8|7,8|8,8',
    box: '5,3|9,3|6,4|7,4|9,4|9,5|4,6',
    goal: '4,4|4,5|4,6|5,6|4,7|5,7|6,7',
    boy: '10,4'
}, {
    tree: '3,0|4,0|5,0|6,0|7,0|8,0|3,1|8,1|2,2|3,2|8,2|9,2|2,3|5,3|9,3|2,4|7,4|9,4|10,4|2,5|6,5|7,5|10,5|11,5|12,5|2,6|3,6|12,6|3,7|4,7|5,7|6,7|12,7|6,8|7,8|8,8|9,8|10,8|11,8|12,8',
    box: '6,2|7,2|6,3|4,4|5,5|10,6',
    goal: '8,4|8,5|9,5|7,6|8,6|9,6',
    boy: '7,7'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|9,1|10,1|4,2|10,2|3,3|4,3|10,3|3,4|10,4|3,5|10,5|3,6|4,6|10,6|4,7|5,7|6,7|7,7|8,7|9,7|10,7',
    box: '7,3|8,3|6,4|8,4|6,5|7,5',
    goal: '6,3|8,3|6,4|8,4|6,5|8,5',
    boy: '7,4'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|9,1|10,1|4,2|10,2|3,3|4,3|10,3|3,4|10,4|3,5|10,5|3,6|4,6|9,6|10,6|4,7|5,7|6,7|7,7|8,7|9,7',
    box: '7,3|8,3|6,4|8,4|6,5|7,5',
    goal: '6,3|8,3|6,4|8,4|6,5|8,5',
    boy: '7,4'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|9,1|10,1|4,2|10,2|3,3|4,3|10,3|3,4|10,4|3,5|10,5|3,6|4,6|10,6|4,7|5,7|6,7|7,7|8,7|9,7|10,7',
    box: '7,3|8,3|6,4|8,4|6,5|7,5',
    goal: '6,3|7,3|8,3|6,5|7,5|8,5',
    boy: '7,4'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|9,1|10,1|4,2|10,2|3,3|4,3|10,3|3,4|10,4|3,5|10,5|3,6|4,6|9,6|10,6|4,7|5,7|6,7|7,7|8,7|9,7',
    box: '7,3|8,3|6,4|8,4|6,5|7,5',
    goal: '6,3|7,3|8,3|6,5|7,5|8,5',
    boy: '7,4'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|9,1|10,1|4,2|10,2|3,3|4,3|10,3|3,4|10,4|3,5|10,5|3,6|4,6|10,6|4,7|5,7|6,7|7,7|8,7|9,7|10,7',
    box: '7,3|8,3|6,4|8,4|6,5|7,5',
    goal: '6,3|7,3|6,4|8,4|7,5|8,5',
    boy: '7,4'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|9,1|10,1|4,2|10,2|3,3|4,3|10,3|3,4|10,4|3,5|10,5|3,6|4,6|9,6|10,6|4,7|5,7|6,7|7,7|8,7|9,7',
    box: '7,3|8,3|6,4|8,4|6,5|7,5',
    goal: '6,3|7,3|6,4|8,4|7,5|8,5',
    boy: '7,4'
}, {
    tree: '3,1|4,1|5,1|6,1|7,1|8,1|9,1|3,2|9,2|10,2|3,3|10,3|3,4|10,4|3,5|9,5|10,5|3,6|9,6|3,7|4,7|5,7|6,7|7,7|8,7|9,7',
    box: '5,3|6,3|7,3|8,3|5,4|5,5|6,5|7,5',
    goal: '5,3|6,3|5,4|6,4|7,4|5,5|6,5|7,5',
    boy: '6,4'
}, {
    tree: '3,1|4,1|5,1|6,1|7,1|8,1|9,1|3,2|9,2|10,2|3,3|10,3|3,4|7,4|10,4|3,5|9,5|10,5|3,6|9,6|3,7|4,7|5,7|6,7|7,7|8,7|9,7',
    box: '6,3|7,3|8,3|5,4|6,5',
    goal: '5,3|6,3|5,4|5,5|6,5',
    boy: '8,4'
}, {
    tree: '5,1|6,1|7,1|8,1|9,1|10,1|11,1|4,2|5,2|11,2|4,3|7,3|9,3|11,3|4,4|11,4|3,5|4,5|6,5|7,5|9,5|11,5|3,6|11,6|3,7|7,7|10,7|11,7|3,8|4,8|5,8|6,8|7,8|8,8|9,8|10,8',
    box: '6,3|5,4|9,4|8,5|5,6',
    goal: '6,2|7,2|8,2|10,2|8,3',
    boy: '6,4'
}, {
    tree: '5,1|6,1|7,1|8,1|9,1|10,1|11,1|4,2|5,2|11,2|4,3|7,3|9,3|11,3|4,4|9,4|11,4|3,5|4,5|6,5|7,5|9,5|11,5|3,6|11,6|3,7|7,7|10,7|11,7|3,8|4,8|5,8|6,8|7,8|8,8|9,8|10,8',
    box: '8,3|8,5|8,6',
    goal: '6,2|7,2|8,2',
    boy: '4,7'
}, {
    tree: '4,2|5,2|6,2|7,2|8,2|9,2|4,3|9,3|4,4|9,4|4,5|9,5|4,6|5,6|6,6|7,6|8,6|9,6',
    box: '5,4|6,4|7,4',
    goal: '6,3|5,5|7,5',
    boy: '8,5'
}, {
    tree: '3,2|4,2|5,2|6,2|7,2|8,2|9,2|10,2|11,2|2,3|3,3|11,3|2,4|7,4|8,4|9,4|10,4|11,4|2,5|7,5|2,6|3,6|7,6|3,7|4,7|5,7|6,7|7,7',
    box: '6,3|5,4|6,4',
    goal: '8,3|9,3|10,3',
    boy: '7,3'
}, {
    tree: '4,2|5,2|6,2|7,2|8,2|9,2|4,3|9,3|4,4|9,4|4,5|9,5|4,6|5,6|6,6|7,6|8,6|9,6',
    box: '5,4|6,4|7,4',
    goal: '7,3|8,3|5,5',
    boy: '8,5'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|9,1|4,2|9,2|4,3|6,3|9,3|4,4|9,4|4,5|8,5|9,5|4,6|7,6|8,6|4,7|5,7|6,7|7,7',
    box: '7,3|6,4|6,5',
    goal: '5,2|6,2|7,2',
    boy: '5,6'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|9,1|4,2|9,2|4,3|9,3|4,4|9,4|4,5|7,5|8,5|9,5|4,6|5,6|7,6|5,7|6,7|7,7',
    box: '6,3|7,4|6,5',
    goal: '8,3|6,4|5,5',
    boy: '6,6'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|9,1|4,2|9,2|4,3|9,3|4,4|5,4|7,4|9,4|4,5|9,5|4,6|9,6|4,7|9,7|4,8|5,8|6,8|7,8|8,8|9,8',
    box: '6,3|8,4|6,5|7,5|7,6',
    goal: '8,6|5,7|6,7|7,7|8,7',
    boy: '7,2'
}, {
    tree: '6,1|7,1|8,1|9,1|10,1|6,2|10,2|5,3|6,3|8,3|10,3|11,3|3,4|4,4|5,4|11,4|3,5|9,5|11,5|3,6|4,6|5,6|7,6|11,6|5,7|6,7|7,7|8,7|9,7|10,7|11,7',
    box: '7,4|7,5|8,5',
    goal: '4,5|5,5|6,5',
    boy: '6,6'
}, {
    tree: '6,1|7,1|8,1|9,1|10,1|5,2|6,2|10,2|5,3|8,3|10,3|5,4|10,4|3,5|4,5|5,5|8,5|10,5|3,6|8,6|10,6|3,7|4,7|6,7|10,7|4,8|5,8|6,8|7,8|8,8|9,8|10,8',
    box: '7,4|6,5|6,6',
    goal: '4,6|5,6|6,6',
    boy: '5,7'
}, {
    tree: '3,1|4,1|5,1|6,1|7,1|8,1|9,1|10,1|3,2|7,2|10,2|3,3|10,3|11,3|3,4|4,4|11,4|4,5|5,5|6,5|11,5|6,6|10,6|11,6|6,7|7,7|10,7|7,8|8,8|9,8|10,8',
    box: '6,3|6,4|7,4|8,4|8,5',
    goal: '4,2|5,2|6,2|5,3|6,3',
    boy: '5,4'
}, {
    tree: '2,1|3,1|4,1|5,1|6,1|7,1|8,1|9,1|2,2|9,2|2,3|9,3|10,3|2,4|3,4|4,4|10,4|11,4|12,4|3,5|12,5|3,6|12,6|3,7|4,7|5,7|6,7|7,7|8,7|9,7|12,7|9,8|10,8|11,8|12,8',
    box: '6,2|4,3|7,3|6,4|5,5|7,5|8,5|9,5',
    goal: '6,2|5,3|7,3|6,4|7,4|5,5|6,5|7,5',
    boy: '8,2'
}, {
    tree: '2,1|3,1|4,1|5,1|6,1|7,1|8,1|9,1|2,2|9,2|2,3|9,3|10,3|2,4|3,4|5,4|10,4|11,4|12,4|3,5|12,5|3,6|12,6|3,7|4,7|5,7|6,7|7,7|8,7|9,7|12,7|9,8|10,8|11,8|12,8',
    box: '7,2|4,3|7,3|6,4|7,4|5,5|7,5|10,5',
    goal: '6,2|5,3|7,3|6,4|7,4|5,5|6,5|7,5',
    boy: '8,2'
}, {
    tree: '3,1|4,1|5,1|6,1|7,1|8,1|3,2|8,2|3,3|8,3|9,3|10,3|3,4|10,4|3,5|4,5|5,5|10,5|5,6|10,6|5,7|6,7|10,7|6,8|7,8|8,8|9,8|10,8',
    box: '5,3|6,3|7,3|5,4|7,4|7,5|8,6',
    goal: '4,2|5,2|6,2|7,2|4,3|6,3|5,4',
    boy: '4,4'
}, {
    tree: '3,1|4,1|5,1|6,1|7,1|3,2|7,2|8,2|3,3|8,3|9,3|10,3|3,4|10,4|3,5|4,5|5,5|10,5|5,6|10,6|5,7|6,7|7,7|10,7|7,8|8,8|9,8|10,8',
    box: '5,3|6,3|5,4|7,4|7,5|8,6',
    goal: '4,2|5,2|6,2|4,3|5,4|9,4',
    boy: '4,4'
}, {
    tree: '3,2|4,2|5,2|6,2|7,2|8,2|9,2|10,2|11,2|12,2|2,3|3,3|12,3|2,4|7,4|8,4|9,4|10,4|11,4|12,4|2,5|7,5|2,6|3,6|7,6|3,7|4,7|5,7|6,7|7,7',
    box: '10,3|5,4|6,4',
    goal: '9,3|10,3|11,3',
    boy: '11,3'
}, {
    tree: '5,2|6,2|7,2|8,2|9,2|10,2|4,3|5,3|10,3|4,4|8,4|10,4|4,5|10,5|4,6|7,6|9,6|10,6|4,7|9,7|4,8|5,8|6,8|7,8|8,8|9,8',
    box: '6,4|7,5|8,6',
    goal: '8,3|6,5|5,7',
    boy: '7,7'
}, {
    tree: '4,2|5,2|6,2|7,2|8,2|9,2|10,2|4,3|10,3|4,4|6,4|8,4|10,4|4,5|10,5|4,6|9,6|10,6|4,7|7,7|8,7|9,7|4,8|5,8|6,8|7,8',
    box: '8,5|6,6|7,6',
    goal: '5,3|7,4|5,6',
    boy: '8,3'
}, {
    tree: '4,1|5,1|6,1|8,1|9,1|10,1|4,2|6,2|7,2|8,2|10,2|4,3|6,3|10,3|4,4|10,4|4,5|10,5|4,6|7,6|10,6|4,7|7,7|8,7|9,7|10,7|4,8|5,8|6,8|7,8',
    box: '6,4|7,4|7,5',
    goal: '5,2|9,2|9,3',
    boy: '9,4'
}, {
    tree: '6,1|7,1|8,1|9,1|6,2|9,2|10,2|3,3|4,3|5,3|6,3|10,3|3,4|6,4|10,4|3,5|9,5|10,5|3,6|8,6|9,6|3,7|4,7|8,7|4,8|5,8|6,8|7,8|8,8',
    box: '7,4|8,4|7,6',
    goal: '4,4|4,6|5,7',
    boy: '8,2'
}, {
    tree: '3,2|4,2|5,2|6,2|7,2|3,3|7,3|8,3|9,3|10,3|3,4|10,4|3,5|6,5|8,5|10,5|3,6|10,6|3,7|4,7|5,7|6,7|7,7|8,7|9,7|10,7',
    box: '5,4|7,5|8,6',
    goal: '5,3|6,3|7,6',
    boy: '5,6'
}, {
    tree: '3,2|4,2|5,2|6,2|7,2|8,2|9,2|3,3|9,3|3,4|7,4|9,4|10,4|3,5|5,5|10,5|3,6|8,6|10,6|3,7|4,7|5,7|6,7|10,7|6,8|7,8|8,8|9,8|10,8',
    box: '6,4|7,5|7,6',
    goal: '4,3|8,3|8,5',
    boy: '7,3'
}, {
    tree: '4,2|5,2|6,2|7,2|8,2|4,3|8,3|9,3|10,3|4,4|6,4|10,4|4,5|10,5|4,6|7,6|10,6|4,7|5,7|9,7|10,7|5,8|6,8|7,8|8,8|9,8',
    box: '7,4|8,4|6,6',
    goal: '5,3|7,3|5,4',
    boy: '8,5'
}, {
    tree: '3,2|4,2|5,2|6,2|7,2|8,2|9,2|10,2|3,3|10,3|3,4|5,4|7,4|10,4|3,5|10,5|3,6|4,6|5,6|6,6|7,6|10,6|7,7|10,7|7,8|8,8|9,8|10,8',
    box: '5,5|8,5|9,6',
    goal: '4,3|8,3|9,5',
    boy: '4,5'
}, {
    tree: '4,2|5,2|6,2|7,2|8,2|4,3|8,3|9,3|10,3|3,4|4,4|10,4|3,5|10,5|3,6|4,6|6,6|8,6|9,6|10,6|4,7|8,7|4,8|5,8|6,8|7,8|8,8',
    box: '6,5|8,5|5,6',
    goal: '6,4|4,5|7,5',
    boy: '6,3'
}, {
    tree: '4,2|5,2|6,2|7,2|3,3|4,3|7,3|8,3|9,3|10,3|3,4|10,4|3,5|5,5|10,5|3,6|7,6|10,6|3,7|4,7|5,7|6,7|7,7|10,7|7,8|8,8|9,8|10,8',
    box: '6,4|6,5|8,5',
    goal: '4,4|5,4|9,4',
    boy: '4,6'
}, {
    tree: '4,1|5,1|6,1|7,1|4,2|7,2|4,3|7,3|3,4|4,4|7,4|8,4|9,4|10,4|3,5|10,5|3,6|8,6|9,6|10,6|3,7|4,7|5,7|8,7|5,8|6,8|7,8|8,8',
    box: '5,5|6,5|6,6',
    goal: '5,4|7,5|9,5',
    boy: '5,2'
}, {
    tree: '6,2|7,2|8,2|9,2|10,2|6,3|10,3|6,4|8,4|10,4|4,5|5,5|6,5|10,5|4,6|10,6|4,7|10,7|4,8|5,8|6,8|7,8|8,8|9,8|10,8',
    box: '7,6|8,6|8,7',
    goal: '9,4|9,5|7,7',
    boy: '5,6'
}, {
    tree: '4,2|5,2|6,2|7,2|8,2|9,2|4,3|9,3|10,3|4,4|7,4|10,4|4,5|10,5|4,6|8,6|10,6|4,7|5,7|6,7|10,7|6,8|7,8|8,8|9,8|10,8',
    box: '8,5|6,6|7,6',
    goal: '5,5|9,6|9,7',
    boy: '7,3'
}, {
    tree: '5,3|6,3|7,3|8,3|3,4|4,4|5,4|8,4|3,5|8,5|9,5|10,5|3,6|10,6|3,7|4,7|10,7|4,8|5,8|6,8|7,8|8,8|9,8|10,8',
    box: '7,6|8,6|8,7',
    goal: '6,4|5,5|6,7',
    boy: '9,7'
}, {
    tree: '7,1|8,1|9,1|10,1|7,2|10,2|5,3|6,3|7,3|10,3|5,4|10,4|3,5|4,5|5,5|8,5|10,5|3,6|10,6|3,7|7,7|10,7|3,8|4,8|5,8|6,8|7,8|8,8|9,8|10,8',
    box: '8,3|5,6|8,6',
    goal: '9,3|8,4|9,5',
    boy: '9,7'
}, {
    tree: '3,1|4,1|5,1|6,1|7,1|3,2|7,2|8,2|9,2|3,3|9,3|3,4|6,4|7,4|9,4|10,4|3,5|4,5|7,5|10,5|4,6|10,6|4,7|7,7|8,7|9,7|10,7|4,8|5,8|6,8|7,8',
    box: '5,3|8,4|5,6',
    goal: '6,2|6,3|7,3',
    boy: '9,6'
}, {
    tree: '4,2|5,2|6,2|7,2|8,2|9,2|10,2|3,3|4,3|10,3|3,4|6,4|10,4|3,5|9,5|10,5|3,6|6,6|9,6|3,7|6,7|7,7|8,7|9,7|3,8|4,8|5,8|6,8',
    box: '5,5|6,5|7,5',
    goal: '4,4|8,5|5,6',
    boy: '5,3'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|9,1|4,2|9,2|10,2|4,3|5,3|10,3|3,4|4,4|5,4|10,4|3,5|7,5|9,5|10,5|3,6|9,6|3,7|4,7|5,7|6,7|9,7|6,8|7,8|8,8|9,8',
    box: '6,3|5,5|8,5',
    goal: '7,4|5,6|8,6',
    boy: '5,2'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|4,2|8,2|9,2|10,2|4,3|10,3|4,4|5,4|10,4|5,5|10,5|5,6|6,6|8,6|10,6|6,7|10,7|6,8|7,8|8,8|9,8|10,8',
    box: '7,3|6,4|7,4',
    goal: '9,4|8,5|9,7',
    boy: '6,5'
}, {
    tree: '3,1|4,1|5,1|6,1|7,1|3,2|7,2|8,2|9,2|10,2|3,3|10,3|3,4|6,4|10,4|3,5|6,5|7,5|9,5|10,5|3,6|6,6|7,6|9,6|3,7|9,7|3,8|4,8|5,8|6,8|7,8|8,8|9,8',
    box: '5,3|6,3|8,6',
    goal: '5,4|7,4|8,7',
    boy: '5,7'
}, {
    tree: '4,1|5,1|6,1|7,1|8,1|9,1|10,1|3,2|4,2|10,2|3,3|10,3|3,4|7,4|8,4|9,4|10,4|3,5|6,5|7,5|3,6|6,6|3,7|6,7|3,8|4,8|5,8|6,8',
    box: '5,3|8,3|5,4',
    goal: '8,2|4,4|6,4',
    boy: '9,3'
}, {
    tree: '5,3|6,3|7,3|8,3|3,4|4,4|5,4|8,4|9,4|10,4|3,5|10,5|3,6|10,6|3,7|4,7|5,7|6,7|10,7|6,8|7,8|8,8|9,8|10,8',
    box: '8,5|6,6|7,6',
    goal: '5,5|6,5|9,5',
    boy: '9,6'
}, {
    tree: '3,1|4,1|5,1|6,1|7,1|8,1|9,1|10,1|3,2|7,2|10,2|3,3|5,3|10,3|3,4|10,4|3,5|4,5|5,5|6,5|7,5|10,5|5,6|10,6|5,7|10,7|5,8|6,8|7,8|8,8|9,8|10,8',
    box: '7,3|9,3|7,4',
    goal: '6,3|8,5|9,7',
    boy: '9,5'
}, {
    tree: '6,1|7,1|8,1|9,1|10,1|6,2|10,2|4,3|5,3|6,3|10,3|4,4|9,4|10,4|3,5|4,5|9,5|3,6|7,6|9,6|3,7|9,7|3,8|4,8|5,8|6,8|7,8|8,8|9,8',
    box: '6,4|8,4|6,5',
    goal: '4,6|4,7|5,7',
    boy: '9,3'
}, {
    tree: '1,1|1,2|1,3|1,4|3,4|4,4|5,4|11,4|12,4|13,4|1,5|3,5|5,5|11,5|1,6|3,6|5,6|11,6|12,6|13,6|1,7|3,7|5,7|11,7|1,8|3,8|4,8|5,8|11,8|12,8|13,8',
    box: '4,1|5,1|6,1|7,1|8,1|9,1|10,1|11,1|12,1',
    goal: '7,4|9,4|7,5|9,5|7,6|9,6|7,7|9,7|8,8',
    boy: '8,5'
}];


function parseBlocks(xsbText) {
    const blocks = [];
    const rows = xsbText.split('\n');
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const chars = row.split('');
        for (let j = 0; j < chars.length; j++) {
            const blockType = BlockType.parse(chars[j]);
            blocks.push(new Block(blockType, j, i));
        }
    }
    return blocks;
}


export default function getData(level) {
    const {tree, box, goal, boy} = gameData[level - 1];
    const dataArray = [];
    let blocks = [];
    tree.split('|').forEach(t => {
        const xy = t.split(',').map(Number);
        dataArray.push(new Block(BlockType.WALL, xy[0] - 1, xy[1] - 1))
    })
    box.split('|').forEach(t => {
        const xy = t.split(',').map(Number);
        dataArray.push(new Block(BlockType.BOX, xy[0] - 1, xy[1] - 1))
    })
    goal.split('|').forEach(t => {
        const xy = t.split(',').map(Number);
        dataArray.push(new Block(BlockType.GOAL, xy[0] - 1, xy[1] - 1))
    })
    boy.split('|').forEach(t => {
        const xy = t.split(',').map(Number);
        dataArray.push(new Block(BlockType.MAN, xy[0] - 1, xy[1] - 1))
    })

    let maxXY = getMaxXY(dataArray);

    for (let y = 0; y <= maxXY.maxY; y++) {
        for (let x = 0; x <= maxXY.maxX; x++) {
            const target = dataArray.filter(item => item.x === x && item.y === y);
            if (target.length === 0) {
                blocks.push(new Block(BlockType.FLOOR, x, y))
            } else if (target.length === 1) {
                blocks.push(target[0]);
            } else {
                blocks.push(target[0].merge(target[1]));
            }
        }
    }

    // 如果某行或某列都是空白，则删除这一行/列
    const rowsToDelete = [];
    for (let y = 0; y <= maxXY.maxY; y++) {
        let allFloor = true;
        for (let x = 0; x <= maxXY.maxX; x++) {
            const block = blocks[y * (maxXY.maxX + 1) + x];
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
    for (let x = 0; x <= maxXY.maxX; x++) {
        let allFloor = true;
        for (let y = 0; y <= maxXY.maxY; y++) {
            const block = blocks[y * (maxXY.maxX + 1) + x];
            if (block.type !== BlockType.FLOOR) {
                allFloor = false;
                break;
            }
        }
        if (allFloor) {
            columnsToDelete.push(x);
        }
    }

    blocks = deleteRows(blocks, rowsToDelete);
    blocks = deleteColumns(blocks, columnsToDelete);

    maxXY = getMaxXY(blocks);
    if (maxXY.maxX > maxXY.maxY) {
        // 如果宽比高大，进行行列转换，方便竖屏显示
        blocks = transposition(blocks);
    }
    return blocks;
}
