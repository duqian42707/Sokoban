import {BLOCK_WIDTH} from "./config";
import {Block, BlockType} from "./model";
import {canvas, context, imgBorgar} from "./global";
import getData from "./data";

const BACKGROUND_COLOR = '#EAEDF4';
const MARGIN_TOP = 100;
export default class BoxGame {

    constructor({}) {
        this.xsbText = '----#####----------\n' +
            '----#---#----------\n' +
            '----#$--#----------\n' +
            '--###--$##---------\n' +
            '--#--$-$-#---------\n' +
            '###-#-##-#---######\n' +
            '#---#-##-#####--..#\n' +
            '#-$--$----------..#\n' +
            '#####-###-#@##--..#\n' +
            '----#-----#########\n' +
            '----#######--------';
        this.blocks = [];
        this.img = imgBorgar;
        this.init();

    }

    init() {
        console.log('123')
        // const {trees, spots, buckets, man} = getData(1);
        // trees.forEach(([x, y]) => this.addItem('tree', x, y));
        // spots.forEach(([x, y]) => this.addItem('spot', x, y));
        // buckets.forEach(([x, y]) => this.addItem('bucket', x, y));
        // this.addItem('boxman', ...man);

        this.drawBackground();
        this.parseBlocks(this.xsbText)
        this.load(1);
        this.img.onload = () => {
            this.draw();
        }
    }

    drawBackground() {
        context.fillStyle = BACKGROUND_COLOR;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    parseBlocks(xsbText) {
        this.blocks = [];
        const rows = xsbText.split('\n');
        this.BOUND_Y = rows.length;
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const chars = row.split('');
            this.BOUND_X = chars.length;
            for (let j = 0; j < chars.length; j++) {
                const blockType = BlockType.parse(chars[j]);
                this.blocks.push(new Block(blockType, j, i));
            }
        }
    }

    draw() {
        for (let i = 0; i < this.blocks.length; i++) {
            const block = this.blocks[i];
            const blockType = block.type;
            const x = block.x * BLOCK_WIDTH;
            const y = MARGIN_TOP + block.y * BLOCK_WIDTH;
            context.drawImage(this.img, blockType.sourceX, blockType.sourceY, blockType.sourceWidth, blockType.sourceHeight, x, y, BLOCK_WIDTH, BLOCK_WIDTH)
        }
    }


    moveTo(item, x, y) {
        item.dataset.x = x;
        item.dataset.y = y;
        item.style.left = `${x * BoxGame.ITEM_WIDTH}px`;
        item.style.top = `${y * BoxGame.ITEM_WIDTH}px`;
    }

    addItem(type, x, y) {
        const item = document.createElement('i');
        item.className = type;

        if (type === 'boxman') {
            item.className += ' down';
        }

        this.moveTo(item, x, y);
        this.container.appendChild(item);
    }

    get boxman() {
        return this.blocks.find(x => x.type === BlockType.MAN || x.type === BlockType.MAN_ON_GOAL);
    }

    getXY(item) {
        return [Number(item.dataset.x), Number(item.dataset.y)];
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

    getSpot(x, y) {
        const items = this.container.querySelectorAll('.spot');
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (x === Number(item.dataset.x) && y === Number(item.dataset.y)) {
                return item;
            }
        }
        return null;
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

    /**
     * 检查某个箱子是否在目标位置上
     * @param bucket
     * @returns {boolean}
     */
    isAtSpot(bucket) {
        const spots = this.blocks.filter(x => x.type === BlockType.GOAL)
        for (let i = 0; i < spots.length; i++) {
            const spot = spots[i];
            if (bucket.x === spot.x && bucket.y === spot.y) {
                return true;
            }
        }
        return false;
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

        console.log('item:', item)
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
            console.log('人推箱子往前走')
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
     * 游戏胜利检查：是否箱子都在目标位置
     */
    isWin() {
        const buckets = this.blocks.filter(x => x.type === BlockType.BOX);
        return buckets.every(bucket => this.isAtSpot(bucket));
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
        do {
            const direction = await this.waitCommand();
            console.log('direction', direction)
            if (direction) {
                await this.move(direction);
            }
        } while (!this.isWin());
    }

}
