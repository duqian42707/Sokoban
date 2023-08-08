import {context} from "./global";
import {BlockType} from "./base/blockType";
import {getData} from "./data2";
import {blockToXSB, getMaxXY, setXYOfBlocks} from "./utils/blockUtils";
import {Gesture} from "./gestureListener";
import {KeyBoard} from "./keyboardListener";
import BackGround from './runtime/background'
import Music from "./runtime/music";
import {Button} from "./base/button";
import ImageMgmt from "./runtime/ImageMgmt";
import {getCurrentLevel, putCompleteLevel, setCurrentLevel} from "./base/dataStore";
import {solve} from "./solve";
import CommonUtils from "./utils/CommonUtils";

const MARGIN_LEFT = 25;
const MARGIN_TOP = 140;


export default class BoxGame {

    constructor() {
        this.bg = new BackGround(context);
        this.music = new Music()

        console.log('画布宽高：', canvas.width, canvas.height);
        this.historySteps = [];
        this.blocks = [];
        this.buttons = [];
        this.level = getCurrentLevel();
        this.gesture = new Gesture(this.doDirection);
        this.keyboard = new KeyBoard(this.doDirection);
        this.onmove = undefined;
        this.onLevelComplete = async () => {
            console.log('success!')
            this.music.playSuccess();
            this.gesture.clearGestureListener();
            this.keyboard.clearKeyboardListener();
            putCompleteLevel(this.level);
            await CommonUtils.wait(300);
            await this.load(this.level + 1);
        };
        this.init();

    }

    async init() {
        await this.loadImages();
        this.initButtons();
        this.load(this.level);
    }

    loadImages() {
        const promArray = ImageMgmt.getAllImage().map(item => ImageMgmt.loadImage(item));
        return Promise.all(promArray);
    }


    /**
     * canvas重绘函数
     * 每一帧重新绘制所有的需要展示的元素
     */
    render() {
        context.clearRect(0, 0, canvas.width, canvas.height)
        this.bg.render(context)
        this.blocks.forEach(item => item.drawToCanvas(context))
        this.buttons.forEach(item => item.drawToCanvas(context))
        context.fillStyle = '#fff'
        context.font = "30px Arial"
        context.fillText('第 ' + this.level + ' 关', canvas.width / 2 - 40, 120, 80)
    }


    initButtons() {
        this.buttons.push(new Button(context, 'prev', 'assets/arrow1.png', 120, 60, 10, 80))
        this.buttons.push(new Button(context, 'next', 'assets/arrow2.png', 120, 60, 250, 80))
        this.buttons.push(new Button(context, 'reset', 'assets/reset.png', 60, 60, canvas.width / 2 - 100, 530))
        this.buttons.push(new Button(context, 'solve', 'assets/solve.png', 60, 60, canvas.width / 2 + 30, 530))
    }


    get boxman() {
        return this.blocks.find(x => x.type === BlockType.MAN || x.type === BlockType.MAN_ON_GOAL);
    }


    doDirection = async (direction) => {
        if (typeof direction === 'object') {
            const button = this.buttons.find(item => item.isTapped(direction[0], direction[1]))
            if (button != null) {
                this.tapButton(button);
            }
        }
        if (typeof direction === 'string') {
            await this.move(direction);
            if (this.isWin()) {
                if (this.onLevelComplete) {
                    await this.onLevelComplete();
                }
            }
        }
    }

    tapButton(button) {
        if (button.name === 'prev') {
            this.load(this.level - 1);
        }
        if (button.name === 'next') {
            this.load(this.level + 1);
        }
        if (button.name === 'reset') {
            Confirm('确定要重置此关卡吗？', () => this.load(this.level));
        }
        if (button.name === 'solve') {
            Confirm('确定要查看答案吗？', () => this.solve());
        }

    }

    getItem(x, y) {
        const items = this.blocks;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (x === Number(item.col) && y === Number(item.row)) {
                return item;
            }
        }
        throw new Error("程序异常!");
    }

    // 判断此位置超出了边界
    isOutOfBound(x, y) {
        return x < 0 || y < 0 || x >= this.BOUND_X || y >= this.BOUND_Y;
    }

    // 判断此位置是空地，可以将箱子推到这里
    isEmpty(x, y) {
        const item = this.getItem(x, y);
        return !this.isOutOfBound(x, y) && (item.type === BlockType.FLOOR || item.type === BlockType.GOAL);
    }

    async move(direction = 'right') {
        const boxman = this.boxman;
        const x = Number(boxman.col),
            y = Number(boxman.row);

        let item = null;

        if (direction === 'left') {
            item = this.getItem(x - 1, y);
        } else if (direction === 'right') {
            item = this.getItem(x + 1, y);
        } else if (direction === 'up') {
            item = this.getItem(x, y - 1);
        } else if (direction === 'down') {
            item = this.getItem(x, y + 1);
        }
        if (item.type === BlockType.FLOOR || item.type === BlockType.GOAL) {
            // 人走到空地或目标
            if (this.onmove) this.onmove([boxman], direction);
            await this.itemMove(boxman, direction);
            this.render();
        } else if ((item.type === BlockType.BOX || item.type === BlockType.BOX_ON_GOAL)
            && (direction === 'left' && this.isEmpty(x - 2, y)
                || direction === 'right' && this.isEmpty(x + 2, y)
                || direction === 'up' && this.isEmpty(x, y - 2)
                || direction === 'down' && this.isEmpty(x, y + 2))) {
            // 人推箱子往前走
            if (this.onmove) this.onmove([boxman, item], direction);
            boxman.className = `boxman ${direction} walk`;
            await this.itemMove(item, direction);
            await this.itemMove(boxman, direction);
            boxman.className = `boxman ${direction}`;
            this.render();
        } else {
            // 人走不动
            boxman.className = `boxman ${direction}`;
        }
    }

    itemMove(item, direction = 'right') {
        let targetItem;
        let from,
            to;
        if (direction === 'left' || direction === 'right') {
            from = Number(item.col);
            to = direction === 'left' ? from - 1 : from + 1;
            targetItem = this.blocks.find(block => block.col === to && block.row === item.row);
        } else {
            from = Number(item.row);
            to = direction === 'up' ? from - 1 : from + 1;
            targetItem = this.blocks.find(block => block.col === item.col && block.row === to);
        }
        if (targetItem.type === BlockType.FLOOR) {
            if (item.type === BlockType.MAN) {
                targetItem.type = BlockType.MAN;
                item.type = BlockType.FLOOR;
            } else if (item.type === BlockType.MAN_ON_GOAL) {
                targetItem.type = BlockType.MAN;
                item.type = BlockType.GOAL;
            } else if (item.type === BlockType.BOX) {
                targetItem.type = BlockType.BOX;
                item.type = BlockType.FLOOR;
            } else if (item.type === BlockType.BOX_ON_GOAL) {
                targetItem.type = BlockType.BOX;
                item.type = BlockType.GOAL;
            }
        } else if (targetItem.type === BlockType.GOAL) {
            if (item.type === BlockType.MAN) {
                targetItem.type = BlockType.MAN_ON_GOAL;
                item.type = BlockType.FLOOR;
            } else if (item.type === BlockType.MAN_ON_GOAL) {
                targetItem.type = BlockType.MAN_ON_GOAL;
                item.type = BlockType.GOAL;
            } else if (item.type === BlockType.BOX) {
                targetItem.type = BlockType.BOX_ON_GOAL;
                item.type = BlockType.FLOOR;
            } else if (item.type === BlockType.BOX_ON_GOAL) {
                targetItem.type = BlockType.BOX_ON_GOAL;
                item.type = BlockType.GOAL;
            }
        } else if (targetItem.type === BlockType.BOX) {
            targetItem.type = BlockType.MAN
            item.type = BlockType.FLOOR;
        } else if (targetItem.type === BlockType.BOX_ON_GOAL) {
            targetItem.type = BlockType.MAN
            item.type = BlockType.GOAL;
        }

        this.music.playStep();
    }

    /**
     * 游戏胜利检查：是否箱子都在目标位置，即没有BOX状态，仅有BOX_ON_GOAL状态
     */
    isWin() {
        const buckets = this.blocks.filter(x => x.type === BlockType.BOX);
        return buckets.length === 0;
    }

    async load(level) {
        if (level < 1) {
            level = 100;
        }
        if (level > 100) {
            level = 1;
        }
        this.level = level;
        this.blocks = getData(level);
        setCurrentLevel(this.level);
        const {maxX, maxY} = getMaxXY(this.blocks);
        const blockWidth = ((canvas.width - MARGIN_LEFT * 2) / (maxX + 1));
        setXYOfBlocks(this.blocks, blockWidth, MARGIN_TOP, MARGIN_LEFT);
        this.gesture.addGestureListener();
        this.keyboard.addKeyboardListener()
        // this.render();

        console.log(blockToXSB(this.blocks))
        console.log(maxX, maxY)
    }

    /**
     * 自动解答
     */
    async solve() {
        const steps = solve(this.blocks);

        this.load(this.level);
        for (let i = 0; i < steps.length; i++) {
            const direction = steps[i];
            await this.move(direction);
            await CommonUtils.wait(300);
        }
        if (this.onLevelComplete && this.isWin()) {
            await this.onLevelComplete();
        }
    }


}
