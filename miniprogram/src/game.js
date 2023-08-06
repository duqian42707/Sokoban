import {context, imgBorgar, imgNext, imgPrev} from "./global";
import {BlockType} from "./base/blockType";
import getData from "./data";
import {getMaxXY, wait} from "./utils";
import {Gesture} from "./gestureListener";
import {KeyBoard} from "./keyboardListener";
import BackGround from './runtime/background'
import DataBus from "./databus";
import GameInfo from "./runtime/gameinfo";
import Music from "./runtime/music";

const MARGIN_LEFT = 25;
const MARGIN_TOP = 130;

let databus = new DataBus()

export default class BoxGame {

    constructor() {
        this.bg = new BackGround(context);
        this.gameinfo = new GameInfo();
        this.music = new Music()
        this.bindLoop = this.loop.bind(this)

        // 清除上一局的动画
        window.cancelAnimationFrame(this.aniId);
        this.aniId = window.requestAnimationFrame(
            this.bindLoop,
            canvas
        )

        console.log('画布宽高：', canvas.width, canvas.height);
        this.blocks = [];
        this.BLOCK_WIDTH = 30;
        this.level = 2;
        this.gesture = new Gesture(this.doDirection);
        this.keyboard = new KeyBoard(this.doDirection);
        this.onmove = undefined;
        this.onLevelComplete = async () => {
            console.log('success!')
            this.music.playSuccess();
            this.gesture.clearGestureListener();
            this.keyboard.clearKeyboardListener();
            await wait(300);
            this.level++;
            await this.load(this.level);
        };
        this.load(this.level);
    }


    /**
     * canvas重绘函数
     * 每一帧重新绘制所有的需要展示的元素
     */
    render() {
        context.clearRect(0, 0, canvas.width, canvas.height)
        this.bg.render(context)
        this.drawButtons();
        this.drawMainRect();
    }


    drawButtons() {
        context.drawImage(imgPrev, 10, 70)
        context.drawImage(imgNext, 250, 70)
    }

    drawMainRect() {
        for (let i = 0; i < this.blocks.length; i++) {
            const block = this.blocks[i];
            const blockType = block.type;
            const x = MARGIN_LEFT + block.x * this.BLOCK_WIDTH;
            const y = MARGIN_TOP + block.y * this.BLOCK_WIDTH;
            context.drawImage(imgBorgar, blockType.sourceX, blockType.sourceY, blockType.sourceWidth, blockType.sourceHeight, x, y, this.BLOCK_WIDTH, this.BLOCK_WIDTH)
        }
    }


    get boxman() {
        return this.blocks.find(x => x.type === BlockType.MAN || x.type === BlockType.MAN_ON_GOAL);
    }


    doDirection = async (direction) => {
        if (typeof direction === 'object') {
            console.log('tap:', direction);
        }
        if (typeof direction === 'string') {
            console.log('swipe:', direction);
            await this.move(direction);
            if (this.isWin()) {
                if (this.onLevelComplete) {
                    await this.onLevelComplete();
                }
            }
        }
    }

    getItem(x, y) {
        const items = this.blocks;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (x === Number(item.x) && y === Number(item.y)) {
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
        const x = Number(boxman.x),
            y = Number(boxman.y);

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
            from = Number(item.x);
            to = direction === 'left' ? from - 1 : from + 1;
            targetItem = this.blocks.find(block => block.x === to && block.y === item.y);
        } else {
            from = Number(item.y);
            to = direction === 'up' ? from - 1 : from + 1;
            targetItem = this.blocks.find(block => block.x === item.x && block.y === to);
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
        console.log('load:', level)
        this.blocks = getData(level);
        const {maxX} = getMaxXY(this.blocks);
        this.BLOCK_WIDTH = ((canvas.width - MARGIN_LEFT * 2) / (maxX + 1));

        this.gesture.addGestureListener();
        this.keyboard.addKeyboardListener()

    }


    // 游戏逻辑更新主函数
    update() {
        if (databus.gameOver) {
            return;
        }
        databus.bullets
            .concat(databus.enemys)
            .forEach((item) => {
                item.update()
            })
    }

    // 实现游戏帧循环
    loop() {
        databus.frame++
        this.update()
        this.render()
        this.aniId = window.requestAnimationFrame(
            this.bindLoop,
            canvas
        )
    }

}
