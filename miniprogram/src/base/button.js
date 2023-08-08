import Sprite from "./sprite";

export class Button extends Sprite {

    constructor(ctx, name, imgSrc, width, height, x, y) {
        super(imgSrc, width, height, x, y)
        this.name = name;
    }


}
