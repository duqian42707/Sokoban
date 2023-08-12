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
        this.offsetY = 0;
        this.gesture = new Gesture({onTap: this.enterStage, onSwipe: this.swipe});
        this.init();
    }


    enterStage = async (evt) => {
        const center = evt.center;
        const button = this.stageList.find(item => item.isTapped(center.x, center.y))
        if (button != null) {
            this.gesture.clearGestureListener();
            this.home.loadGame(button.level);
        }
    }

    swipe = async (evt) => {
        if (evt.direction === 8) {
            // up
            this.offsetY = -100;
        } else if (evt.direction === 16) {
            // down
            this.offsetY = 100;
        } else {
            return;
        }

        this.process = 0;
        window.requestAnimationFrame(this.swipeAnimate)
    }

    swipeAnimate = () => {

        this.stageList.forEach(stageBlock => {
            stageBlock.y += this.offsetY / 10
        })
        context.save();
        this.bg.render(context)
        this.renderMainSection(context);
        context.restore();
        this.process += 1;
        if (this.process < 10) {
            window.requestAnimationFrame(this.swipeAnimate);
        }
    }

    async init() {
        // 关卡
        this.initStageList();
        // 手势监听
        this.gesture.addGestureListener();
        // 背景
        this.bg.render(context)
        // 关卡列表区域
        this.renderMainSection(context);
    }

    initStageList(ctx) {
        const completeLevels = DataStore.getCompleteLevels();
        const blockWidth = Math.floor((canvas.width - MARGIN_LEFT * 2) / (maxCol + 1));
        for (let i = 0; i < DATA_LIST.length; i++) {
            const col = i % (maxCol + 1);
            const row = Math.floor(i / (maxCol + 1));
            const x = MARGIN_LEFT + col * blockWidth + gutter;
            const y = MARGIN_TOP + row * blockWidth + gutter;
            const pass = completeLevels.indexOf(i + 1) > -1;
            const stageBlock = new StageBlock(i + 1, pass, (blockWidth - gutter * 2), x, y);
            this.stageList.push(stageBlock);
        }
    }

    renderMainSection(ctx) {
        ctx.save();
        const x = MARGIN_LEFT / 2;
        const y = MARGIN_TOP - 10;
        const width = canvas.width - 2 * x;
        const height = canvas.height - y - MARGIN_BOTTOM;
        ContextUtils.strokeRoundRect(ctx, x, y, width, height, 8);
        ctx.clip();
        // 关卡列表小方块
        this.drawStageList(context);
        ctx.restore();
    }


    drawStageList(ctx) {
        for (let i = 0; i < this.stageList.length; i++) {
            const stageBlock = this.stageList[i];
            stageBlock.drawToCanvas(ctx);
        }
    }


}
