import BackGround from "./runtime/backGround";
import {context} from "./global";
import {StageBlock} from "./base/stageBlock";
import {Gesture} from "./gestureListener";
import DataStore from "./base/dataStore";
import {DATA_LIST} from "./data/data1";
import Home from "./home";


const MARGIN_LEFT = 20;
const MARGIN_TOP = 100;
const maxCol = 4;
const gutter = 4;

export default class SelectStage {

    constructor() {
        this.bg = new BackGround();
        this.home = new Home();
        this.stageList = [];
        this.gesture = new Gesture(this.enterStage);
        this.init();
    }


    enterStage = async (direction) => {
        if (typeof direction === 'object') {
            const button = this.stageList.find(item => item.isTapped(direction[0], direction[1]))
            if (button != null) {
                this.gesture.clearGestureListener();
                this.home.loadGame(button.level);
            }
        }
    }

    async init() {
        this.gesture.addGestureListener();
        // 背景
        this.bg.render(context)
        // 关卡列表
        const completeLevels = DataStore.getCompleteLevels();
        const blockWidth = Math.floor((canvas.width - MARGIN_LEFT * 2) / (maxCol + 1));
        for (let i = 0; i < 365; i++) {
            const col = i % (maxCol + 1);
            const row = Math.floor(i / (maxCol + 1));
            const x = MARGIN_LEFT + col * blockWidth + gutter;
            const y = MARGIN_TOP + row * blockWidth + gutter;
            const pass = completeLevels.indexOf(i + 1) > -1;
            const stageBlock = new StageBlock(i + 1, pass, (blockWidth - gutter * 2), x, y);
            stageBlock.drawToCanvas(context)
            this.stageList.push(stageBlock);
        }
    }
}
