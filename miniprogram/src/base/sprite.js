/**
 * 游戏基础的精灵类
 */
export default class Sprite {
    constructor(img, width = 0, height = 0, x = 0, y = 0) {
        this.img = img

        this.width = width
        this.height = height

        this.x = x
        this.y = y

        this.visible = true
    }

    /**
     * 将精灵图绘制在canvas上
     */
    drawToCanvas(ctx) {
        if (!this.visible) {
            return;
        }
        ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }

    getButtonTapArea() {
        const delta = 20
        return {
            startX: this.x - delta,
            startY: this.y - delta,
            endX: this.x + this.width + delta,
            endY: this.y + this.height + delta
        }
    }

    isTapped(x, y) {
        const {startX, startY, endX, endY} = this.getButtonTapArea();
        return x > startX && x < endX && y > startY && y < endY;
    }

}
