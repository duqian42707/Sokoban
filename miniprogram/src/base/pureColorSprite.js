import ContextUtils from "../utils/contextUtils";

/**
 * 游戏基础的精灵类
 */
export default class PureColorSprite {
    constructor(color, width = 0, height = 0, x = 0, y = 0, radius = 0) {
        this.color = color;

        this.width = width
        this.height = height

        this.x = x
        this.y = y

        this.offsetY = 0;

        this.radius = radius

        this.visible = true
    }

    /**
     * 将精灵图绘制在canvas上
     */
    drawToCanvas(ctx) {
        if (!this.visible) {
            return;
        }
        ContextUtils.fillRoundRect(ctx, this.x, this.y + this.offsetY, this.width, this.height, this.radius, this.color)
    }

    getButtonTapArea() {
        const delta = 20
        return {
            startX: this.x - delta,
            startY: this.y + this.offsetY - delta,
            endX: this.x + this.width + delta,
            endY: this.y + this.offsetY + this.height + delta
        }
    }

    isTapped(x, y) {
        const {startX, startY, endX, endY} = this.getButtonTapArea();
        return x > startX && x < endX && y > startY && y < endY;
    }

}
