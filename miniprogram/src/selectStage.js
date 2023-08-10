import BackGround from "./runtime/backGround";
import {context} from "./global";
import {StageBlock} from "./base/stageBlock";
import {Gesture} from "./gestureListener";
import DataStore from "./base/dataStore";
import {DATA_LIST} from "./data/data1";
import Home from "./home";
import ContextUtils from "./utils/contextUtils";


const MARGIN_LEFT = 20;
const MARGIN_TOP = 100;
const MARGIN_BOTTOM = 100;
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
        // 关卡列表区域
        this.renderMainSection();
        // 关卡列表小方块
        this.initAndDrawStageList();
    }

    renderMainSection() {
        const x = MARGIN_LEFT / 2;
        const y = MARGIN_TOP - 10;
        const width = canvas.width - 2 * x;
        const height = canvas.height - y - MARGIN_BOTTOM;
        ContextUtils.strokeRoundRect(context, x, y, width, height, 8);
    }

    initAndDrawStageList() {
        const completeLevels = DataStore.getCompleteLevels();
        const blockWidth = Math.floor((canvas.width - MARGIN_LEFT * 2) / (maxCol + 1));
        for (let i = 0; i < DATA_LIST.length; i++) {
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
