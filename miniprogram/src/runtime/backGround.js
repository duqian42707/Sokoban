import PureColorSprite from "../base/pureColorSprite";
import {Config} from "../global";

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const maxCol = Config.MAX_COL;
const COLORS = ['#7df6f2', '#5fe9f6']

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround {

    constructor() {
    }

    render(ctx) {

        // 1. 纯色背景
        ctx.fillStyle = '#a1f8d1';
        ctx.fillRect(0, 0, screenWidth, screenHeight);
        const blockWidth = Math.floor(screenWidth / (maxCol + 1));
        const maxRow = Math.floor(screenHeight / blockWidth) + 1;
        console.log(`width:${blockWidth},maxCol:${maxCol},maxRow:${maxRow}`)
        for (let i = 0; i <= maxRow; i++) {
            for (let j = 0; j <= maxCol; j++) {
                let index = (maxCol + 1) * i + j;
                const idx = (index + (maxCol % 2) * i) % 2;
                const color = COLORS[idx];
                const x = j * blockWidth;
                const y = i * blockWidth;
                console.log(`index:${index},idx:${idx},color:${color},xy:${x},${y}`)
                const pureColorSprite = new PureColorSprite(color, blockWidth, blockWidth, x, y, 8);
                pureColorSprite.drawToCanvas(ctx);
            }
        }

    }
}
