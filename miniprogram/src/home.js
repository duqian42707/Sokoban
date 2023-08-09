import SelectStage from "./selectStage";
import ImageMgmt from "./runtime/imageMgmt";
import BoxGame from "./game";

export default class Home {

    constructor() {
        this.selectStage = null;
        this.game = null;
        this.init();
    }

    async init() {
        await this.loadImages();

        this.selectStage = new SelectStage();
        this.selectStage.onSelectStage = () => {
            this.selectStage = null;
        }


        // this.game = new BoxGame();
    }

    async loadImages() {
        const promArray = ImageMgmt.getAllImage().map(item => ImageMgmt.loadImage(item));
        return Promise.all(promArray);
    }


}
