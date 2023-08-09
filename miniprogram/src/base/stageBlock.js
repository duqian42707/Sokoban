import PureColorSprite from "./pureColorSprite";

const gutter = 10;

export class StageBlock extends PureColorSprite {
    constructor(level, pass = false, width, x, y) {
        const color = pass ? '#fc4242' : '#797777';
        super(color, width, width, x, y, 8)
        this.level = level;
        this.pass = pass;
    }

    drawTextToCanvas(ctx) {
        const text = this.level;

        let x, y;
        if (this.level < 10) {
            ctx.font = "50px Arial"
        } else if (this.level < 100) {
            ctx.font = "50px Arial"
        } else {
            ctx.font = "50px Arial"
        }
        const textWidth = ctx.measureText(text).width;
        x = this.x + this.width / 2 - textWidth / 2 + 1;
        y = this.y + this.width - gutter - 3;

        ctx.fillStyle = '#fff'
        ctx.fillText(text, x, y, 50);
    }
}
