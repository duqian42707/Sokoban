import PureColorSprite from "./pureColorSprite";

export class StageBlock extends PureColorSprite {
    constructor(level, pass = false, width, x, y) {
        const color = pass ? '#fc4242' : '#797777';
        super(color, width, width, x, y, 8)
        this.level = level;
        this.pass = pass;
    }

    drawToCanvas(ctx) {
        super.drawToCanvas(ctx);
        this.drawTextToCanvas(ctx);
    }

    drawTextToCanvas(ctx) {
        const text = this.level;
        let x, y;
        if (this.level < 10) {
            ctx.font = "40px Arial"
        } else if (this.level < 100) {
            ctx.font = "36px Arial"
        } else {
            ctx.font = "32px Arial"
        }
        const fix = ctx.measureText(text).actualBoundingBoxAscent + ctx.measureText(text).actualBoundingBoxDescent;
        x = this.x + this.width / 2;
        y = this.y + this.width / 2 + fix / 2 + this.offsetY

        ctx.fillStyle = '#fff'
        ctx.textAlign = 'center'
        ctx.fillText(text, x, y, this.width - 10);
    }
}
