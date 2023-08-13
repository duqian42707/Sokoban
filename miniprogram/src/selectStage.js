import BackGround from "./runtime/backGround";
import {context} from "./global";
import {StageBlock} from "./base/stageBlock";
import {Gesture} from "./gestureListener";
import DataStore from "./base/dataStore";
import {DATA_LIST} from "./data/data1";
import {DATA_LIST as DATA_LIST2} from "./data/data2";
import Home from "./home";
import ContextUtils from "./utils/contextUtils";
import {StageMgmt} from "./runtime/stageMgmt";

const MARGIN_LEFT = 20;
const MARGIN_TOP = 110;
const MARGIN_BOTTOM = 70;
const maxCol = 4;
const gutter = 4;

export default class SelectStage {

    constructor() {
        this.bg = new BackGround();
        this.home = new Home();
        this.stageList = [];
        this.lastOffsetY = 0;
        this.offsetY = 0;
        this.gesture = new Gesture({onTap: this.enterStage, onSwipe: this.swipe, onPan: this.pan});
        this.init();
        // this.testa();
    }


    enterStage = async (evt) => {
        const center = evt.center;
        const button = this.stageList.find(item => item.isTapped(center.x, center.y))
        if (button != null) {
            this.gesture.clearGestureListener();
            this.home.loadGame(button.level);
        }
    }

    pan = async (evt) => {
        if (evt.direction === 8 || evt.direction === 16) {
            const firstStageBlock = this.stageList[0];
            const lastStageBlock = this.stageList[this.stageList.length - 1];
            if (firstStageBlock.y + this.lastOffsetY + evt.deltaY > MARGIN_TOP + 10) {
                this.lastOffsetY = 0;
                return;
            }
            if (lastStageBlock.y + this.lastOffsetY + evt.deltaY < canvas.height - MARGIN_BOTTOM - MARGIN_TOP + 20) {
                this.lastOffsetY = canvas.height - MARGIN_BOTTOM - lastStageBlock.y - 20;
                return;
            }

            this.offsetY = this.lastOffsetY + evt.deltaY;
            window.requestAnimationFrame(this.swipeAnimate);
            if (evt.isFinal) {
                console.log('pan', evt)
                this.lastOffsetY = this.offsetY;
            }
        }
    }

    swipe = async (evt) => {
        // console.log('swipe', evt)
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
            stageBlock.offsetY = this.offsetY
        })
        context.save();
        this.bg.render(context)
        this.renderMainSection(context);
        context.restore();
        this.process += 1;
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

    initStageList() {
        this.stageList = [];
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

    async testa() {
        const group = {};
        let list = [...DATA_LIST, ...DATA_LIST2];
        for (let i = 0; i < list.length; i++) {
            const data = list[i];
            const solve = JSON.stringify(data.solve);
            if (group[solve] == null) {
                group[solve] = [];
            }
            group[solve].push(data);
        }

        for (const groupKey in group) {
            if (group[groupKey].length > 1) {
                console.log('del..')
                for (let i = 1; i < group[groupKey].length; i++) {
                    group[groupKey][i]['del'] = true;
                }
            }
        }

        list = list.filter(x => !(x.del === true))
        list = StageMgmt.sortByDifficult(list);
        console.log('export const DATA_LIST = ' + JSON.stringify(list));

    }


}
