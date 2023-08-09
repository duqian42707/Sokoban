import PureColorSprite from "./pureColorSprite";

export class StageBlock extends PureColorSprite {
    constructor(level, pass = false, width, x, y) {
        const color = pass ? '#fc4242' : '#797777';
        super(color, width, width, x, y, 8)
        this.level = level;
        this.pass = pass;
    }

    drawTextToCanvas(ctx) {
        const x = this.x + 10;
        const y = this.y + 10;
        const maxWidth = this.width - 20;
        ctx.font = "30px Arial"
        ctx.fillStyle = '#fff'
        ctx.fillText(this.level, x, y, maxWidth);
    }
}
