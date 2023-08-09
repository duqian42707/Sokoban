import SelectStage from "./selectStage";
import ImageMgmt from "./runtime/imageMgmt";

export default class Home {

    constructor() {
        this.selectStage = null;
        this.init();
    }

    async init() {
        await this.loadImages();
        this.selectStage = new SelectStage();
        this.selectStage.onSelectStage = () => {
            this.selectStage = null;
        }
    }

    async loadImages() {
        const promArray = ImageMgmt.getAllImage().map(item => ImageMgmt.loadImage(item));
        return Promise.all(promArray);
    }


}
