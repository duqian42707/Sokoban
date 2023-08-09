import BackGround from "./runtime/backGround";
import {context} from "./global";
import {StageBlock} from "./base/stageBlock";
import {Gesture} from "./gestureListener";
import BoxGame from "./game";
import DataStore from "./base/dataStore";
import {DATA_LIST} from "./data/data1";


const maxCol = 9;
const MARGIN_LEFT = 20;
const MARGIN_TOP = 100;

export default class SelectStage {

    constructor() {
        this.bg = new BackGround();
        this.stageList = [];
        this.gesture = new Gesture(this.enterStage);
        this.gesture.addGestureListener();
        this.init();
    }


    enterStage = async (direction) => {
        if (typeof direction === 'object') {
            const button = this.stageList.find(item => item.isTapped(direction[0], direction[1]))
            if (button != null) {
                new BoxGame(button.level);
                this.gesture.clearGestureListener();
            }
        }
    }

    async init() {
        // 背景
        this.bg.render(context)
        // 关卡列表
        const completeLevels = DataStore.getCompleteLevels();
        const blockWidth = ((canvas.width - MARGIN_LEFT * 2) / (maxCol + 1));
        for (let i = 0; i < DATA_LIST.length; i++) {
            const col = i % maxCol;
            const row = Math.floor(i / maxCol);
            const x = MARGIN_LEFT + col * blockWidth;
            const y = MARGIN_TOP + row * blockWidth;
            const pass = completeLevels.indexOf(i + 1) > -1;
            const stageBlock = new StageBlock(i + 1, pass, blockWidth, x, y);
            stageBlock.drawToCanvas(context)
            this.stageList.push(stageBlock);
        }
    }
}
