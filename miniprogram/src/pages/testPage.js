import BackGround from "../runtime/backGround";
import {context} from "../base/global";
import {Gesture} from "../listeners/gestureListener";
import CommonUtils from "../utils/commonUtils";
import {DATA_LIST} from "../data/data1";
import {DATA_LIST as DATA_LIST2} from "../data/data2";
import {autoTransposition, blockToXSB, transpositionSolve, xsbToBlocks} from "../utils/blockUtils";
import {StageMgmt} from "../runtime/stageMgmt";

export default class TestPage {
    constructor() {
        this.bg = new BackGround();
        this.gesture = new Gesture({onTap: this.tapButton});
        if (wx) {
            this.rewardedVideoAd = wx.createRewardedVideoAd({adUnitId: '123'});
        }
    }

    init() {
        this.gesture.addGestureListener();
        this.render();
    }

    render() {
        this.bg.render(context);
    }

    tapButton = async (evt) => {
        wx.showToast({
            title: '点击',
            icon: 'success',
            duration: 1000
        })
        await this.showAd();
    }

    async showAd() {
        if (this.rewardedVideoAd) {
            await this.rewardedVideoAd.load();
            await CommonUtils.wait(500);
            await this.rewardedVideoAd.show();
        }

    }

    async testa() {
        // // solveAll(DIFFICULT2);
        // const blocks = xsbToBlocks(DATA_LIST[0].xsb)
        // const start = new Date().getTime()
        // await solve(blocks);
        // const end = new Date().getTime();
        // console.log("耗时：", end - start)

        const newDataList = [];
        for (let i = 0; i < DATA_LIST.length; i++) {
            const data = DATA_LIST[i];
            const blocks = xsbToBlocks(data.xsb);
            const didTrans = autoTransposition(blocks);
            if (didTrans) {
                const newXsb = blockToXSB(blocks);
                const newSolve = data.solve.map(transpositionSolve);
                newDataList.push({
                    xsb: newXsb,
                    level: data.level,
                    solve: newSolve
                });
            } else {
                newDataList.push(data);
            }
        }

        console.log('export const DATA_LIST=' + JSON.stringify(newDataList))

    }

    async test1() {
        const groups = []
        let list = DATA_LIST2;
        for (let i = 0; i < list.length; i++) {
            const data = list[i];
            const solve = JSON.stringify(data.solve);
            const data0 = DATA_LIST.find(x => JSON.stringify(x.solve) === solve);
            if (data0) {
                data['del'] = true;
                if (data0.xsb !== data.xsb.trim()) {
                    groups.push([data0.xsb, data.xsb.trim()])
                }
            }
        }
        console.log(list.length);
        list = list.filter(x => !(x.del === true))
        console.log(groups);
        list = StageMgmt.sortByDifficult(list, 87);
        console.log('export const DATA_LIST = ' + JSON.stringify(list));
    }

}
