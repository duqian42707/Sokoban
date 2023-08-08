import {Stage} from "../base/stage";
import {DATA_LIST} from "../data/data1";
import {countNum} from "../utils/blockUtils";

/**
 * 关卡管理
 */
export class StageMgmt {

    static getStateData(level) {
        const data = DATA_LIST.find(item => item.level === level);
        return new Stage(data.level, data.xsb, data.solve);
    }

    static distinct() {
        const newList = [];
        const xsbs = [];
        for (let i = 0; i < DATA_LIST.length; i++) {
            const data = DATA_LIST[i];
            if (xsbs.indexOf(data.xsb) === -1 && data.solve.length > 0) {
                xsbs.push(data.xsb);
                newList.push(data);
                data.level = newList.length;
            }
        }
        return newList;
    }


    /**
     * 按照难度排序
     * 1. 目标数量少的简单（包括人在目标、箱子在目标）
     * 2. 墙/空位比例小的简单
     * 3. 整体元素数量少的简单
     *
     *
     * @returns {any[]}
     */
    static sortByDifficult(dataList) {
        const data = [...dataList];
        data.sort((stageA, stageB) => {
            const a = stageA.xsb;
            const b = stageB.xsb;
            const aNums = countNum(a);
            const bNums = countNum(b);
            const aNum1 = (aNums['.'] || 0) + (aNums['+'] || 0) + (aNums['*'] || 0);
            const bNum1 = (bNums['.'] || 0) + (bNums['+'] || 0) + (bNums['*'] || 0);
            const aNum2 = aNums['#'] / (aNums['-'] || 1000);
            const bNum2 = bNums['#'] / (bNums['-'] || 1000);
            if (stageA.solve.length !== stageB.solve.length) {
                return stageA.solve.length - stageB.solve.length
            }
            if (aNum1 !== bNum1) {
                return aNum1 - bNum1;
            }
            if (aNum2 !== bNum2) {
                return aNum2 - bNum2;
            }
            return a.length - b.length;
        })
        for (let i = 0; i < data.length; i++) {
            data[i].level = i + 1;
        }
        return data;
    }

    static getMaxLevel() {
        return DATA_LIST.length;
    }

}
