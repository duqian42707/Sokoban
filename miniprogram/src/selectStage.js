import BackGround from "./runtime/backGround";
import {context} from "./global";
import {StageBlock} from "./base/stageBlock";
import {Gesture} from "./gestureListener";
import DataStore from "./base/dataStore";
import {DATA_LIST} from "./data/data1";
import {DATA_LIST as DATA_LIST2} from "./data/data2";
import {DATA_LIST as DIFFICULT2} from "./data/difficult2";
import Home from "./home";
import ContextUtils from "./utils/contextUtils";
import {StageMgmt} from "./runtime/stageMgmt";
import {autoTransposition, blockToXSB, solveAll, transpositionSolve, xsbToBlocks} from "./utils/blockUtils";
import {solve} from "./solve";
import {Button} from "./base/button";

const MARGIN_LEFT = 20;
const MARGIN_TOP = 110;
const MARGIN_BOTTOM = 170;
const maxCol = 4;
const gutter = 4;

export default class SelectStage {

    constructor() {
        this.bg = new BackGround();
        this.home = new Home();
        this.pageNum = 1;
        this.pageSize = 30;
        this.maxPageNum = 1;
        this.stageList = [];
        this.displayedStages = [];
        this.buttons = [];
        this.lastOffsetY = 0;
        this.offsetY = 0;
        this.gesture = new Gesture({onTap: this.tap, onSwipe: this.swipe, onPan: this.pan});
        this.init();
        // this.testa();
    }


    tap = async (evt) => {
        const center = evt.center;
        const stage = this.displayedStages.find(item => item.isTapped(center.x, center.y))
        if (stage != null) {
            this.gesture.clearGestureListener();
            this.home.loadGame(stage.level);
        }
        const button = this.buttons.find(item => item.isTapped(center.x, center.y))
        if (button != null && button.name === 'prev') {
            this.pageNum = this.pageNum === 1 ? this.maxPageNum : (this.pageNum - 1);
            this.render();
        }
        if (button != null && button.name === 'next') {
            this.pageNum = this.pageNum === this.maxPageNum ? 1 : (this.pageNum + 1);
            this.render();
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
        // 所有关卡
        this.initStageList();
        // 本页关卡
        this.initDisplayedStages();
        // 手势监听
        this.gesture.addGestureListener();
        // 翻页按钮
        this.initButtons();
        // 渲染图像
        this.render();
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
        const sectionHeight = canvas.height - MARGIN_TOP - MARGIN_BOTTOM;
        const maxRowsPerPage = Math.floor(sectionHeight / blockWidth);
        this.pageSize = (maxCol + 1) * maxRowsPerPage
        this.maxPageNum = Math.ceil(this.stageList.length / this.pageSize);
    }

    initDisplayedStages() {
        this.displayedStages = this.stageList.slice((this.pageNum - 1) * this.pageSize, this.pageNum * this.pageSize);
        for (let i = 0; i < this.displayedStages.length; i++) {
            const stageBlock = this.displayedStages[i];
            const col = i % (maxCol + 1);
            const row = Math.floor(i / (maxCol + 1));
            const x = MARGIN_LEFT + col * (stageBlock.width + 2 * gutter) + gutter;
            const y = MARGIN_TOP + row * (stageBlock.height + 2 * gutter) + gutter;
            stageBlock.setPosition(x, y);
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
        this.drawDisplayedStages(context);
        ctx.restore();
    }


    drawDisplayedStages(ctx) {
        this.displayedStages = this.stageList.slice((this.pageNum - 1) * this.pageSize, this.pageNum * this.pageSize);
        for (let i = 0; i < this.displayedStages.length; i++) {
            const stageBlock = this.displayedStages[i];
            const col = i % (maxCol + 1);
            const row = Math.floor(i / (maxCol + 1));
            const x = MARGIN_LEFT + col * (stageBlock.width + 2 * gutter) + gutter;
            const y = MARGIN_TOP + row * (stageBlock.height + 2 * gutter) + gutter;
            stageBlock.setPosition(x, y);
            stageBlock.drawToCanvas(ctx);
        }
    }

    initButtons() {
        const width = canvas.width / 6;
        const y = canvas.height - MARGIN_BOTTOM + 10;
        this.buttons.push(new Button(context, 'prev', 'assets/prev.png', width, width, canvas.width / 3 - width / 2, y))
        this.buttons.push(new Button(context, 'next', 'assets/next.png', width, width, 2 * canvas.width / 3 - width / 2, y))
    }

    render() {
        // 背景
        this.bg.render(context)
        // 关卡列表区域
        this.renderMainSection(context);
        // 按钮
        this.buttons.forEach(btn => btn.drawToCanvas(context))
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
