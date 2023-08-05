import {canvas, context, imgBorgar} from "./global";
import {BlockType} from "./model";
import getData from "./data";
import {getMaxXY, wait} from "./utils";

const BACKGROUND_COLOR = '#EAEDF4';
const MARGIN_TOP = 100;
export default class BoxGame {

    constructor() {
        this.blocks = [];
        this.BLOCK_WIDTH = 30;
        this.img = imgBorgar;
        this.img.onload = () => {
            this.draw();
        }
        this.onLevelComplete = async () => {
            console.log('success!')
            await wait(1300);
            console.log('success2!')
            await wait(200);
            console.log('success4!')
        };
        this.drawBackground();
        this.load(23);
    }

    drawBackground() {
        context.fillStyle = BACKGROUND_COLOR;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }


    draw() {
        for (let i = 0; i < this.blocks.length; i++) {
            const block = this.blocks[i];
            const blockType = block.type;
            const x = block.x * this.BLOCK_WIDTH;
            const y = MARGIN_TOP + block.y * this.BLOCK_WIDTH;
            context.drawImage(this.img, blockType.sourceX, blockType.sourceY, blockType.sourceWidth, blockType.sourceHeight, x, y, this.BLOCK_WIDTH, this.BLOCK_WIDTH)
        }
    }


    get boxman() {
        return this.blocks.find(x => x.type === BlockType.MAN || x.type === BlockType.MAN_ON_GOAL);
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
            await this.moveItem(boxman, direction);
            this.draw();
        } else if ((item.type === BlockType.BOX || item.type === BlockType.BOX_ON_GOAL)
            && (direction === 'left' && this.isEmpty(x - 2, y)
                || direction === 'right' && this.isEmpty(x + 2, y)
                || direction === 'up' && this.isEmpty(x, y - 2)
                || direction === 'down' && this.isEmpty(x, y + 2))) {
            // 人推箱子往前走
            if (this.onmove) this.onmove([boxman, item], direction);
            boxman.className = `boxman ${direction} walk`;
            await Promise.all([
                this.moveItem(item, direction),
                this.moveItem(boxman, direction),
            ]);
            boxman.className = `boxman ${direction}`;
            this.draw();
        } else {
            // 人走不动
            boxman.className = `boxman ${direction}`;
        }
    }

    moveItem(item, direction = 'right') {
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
    }

    /**
     * 游戏胜利检查：是否箱子都在目标位置，即没有BOX状态，仅有BOX_ON_GOAL状态
     */
    isWin() {
        const buckets = this.blocks.filter(x => x.type === BlockType.BOX);
        return buckets.length === 0;
    }

    waitCommand() {
        return new Promise((resolve) => {
            if (this._command) window.removeEventListener('keydown', this._command);
            this._command = (event) => {
                const keyCode = event.keyCode;
                switch (keyCode) {
                    case 37:
                        resolve('left');
                        break;
                    case 38:
                        resolve('up');
                        break;
                    case 39:
                        resolve('right');
                        break;
                    case 40:
                        resolve('down');
                        break;
                    default:
                        resolve(null);
                        break;
                }
            };
            window.addEventListener('keydown', this._command, {once: true});
        });
    }


    async load(level) {
        this.blocks = getData(level);
        const {maxX} = getMaxXY(this.blocks);
        this.BLOCK_WIDTH = ((canvas.width - 50) / (maxX + 1));
        console.log('BLOCK_WIDTH:', this.BLOCK_WIDTH)

        do {
            const direction = await this.waitCommand();
            if (direction) {
                await this.move(direction);
            }
        } while (!this.isWin());

        if (this.onLevelComplete) {
            await this.onLevelComplete(level);
        }
    }


}
