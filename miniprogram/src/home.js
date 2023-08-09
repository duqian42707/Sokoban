import SelectStage from "./selectStage";
import ImageMgmt from "./runtime/imageMgmt";
import BoxGame from "./game";

let instance

export default class Home {

    constructor() {
        if (instance) {
            return instance;
        }
        instance = this;

        this.selectStage = null;
        this.game = null;
    }

    async init() {
        await this.loadImages();
        this.toSelectStage();
    }

    async loadImages() {
        const promArray = ImageMgmt.getAllImage().map(item => ImageMgmt.loadImage(item));
        return Promise.all(promArray);
    }

    loadGame(level) {
        if (this.game == null) {
            this.game = new BoxGame(level);
        } else {
            this.game.load(level);
        }
    }

    toSelectStage() {
        if (this.selectStage == null) {
            this.selectStage = new SelectStage();
        } else {
            this.selectStage.init();
        }
    }


}
