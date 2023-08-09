import PureColorSprite from "../base/pureColorSprite";
import {Config} from "../global";

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const maxCol = Config.MAX_COL;
const COLORS = ['#74f8f4', '#0cc4ff']

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround {

    constructor(ctx) {
    }

    render(ctx) {

        // 1. 纯色背景
        ctx.fillStyle = '#a1f8d1';
        ctx.fillRect(0, 0, screenWidth, screenHeight);

        const blockWidth = screenWidth / (maxCol + 1);
        const maxRow = screenHeight / blockWidth + 1;
        for (let i = 0; i <= maxRow; i++) {
            for (let j = 0; j <= maxCol; j++) {
                const index = (maxRow + 1) * j + i;
                const idx = index % 2;
                const color = COLORS[idx];
                const x = j * blockWidth;
                const y = i * blockWidth;
                console.log(`index:${index},idx:${idx},color:${color},xy:${x},${y}`)
                const pureColorSprite = new PureColorSprite(color, blockWidth, blockWidth, x, y, 10);
                pureColorSprite.drawToCanvas(ctx);
            }
        }

    }
}
