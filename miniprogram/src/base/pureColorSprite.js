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
        ctx.strokeStyle = this.color
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, this.radius)
        ctx.closePath();
        ctx.fillStyle = this.color
        ctx.fill();
    }


}
