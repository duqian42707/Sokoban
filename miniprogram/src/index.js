import ImageMgmt from "./runtime/imageMgmt";
import UserDataUtils from "./utils/userDataUtils";
import {PageMgmt} from "./runtime/pageMgmt";

let instance

export default class Index {

    constructor() {
        if (instance) {
            return instance;
        }
        instance = this;
        this.init();
    }

    async init() {
        console.log('Index init.')
        await this.loadImages();
        if (wx) {
            await UserDataUtils.loadServerData();
        }
        // PageMgmt.toHomePage();
        PageMgmt.toSelectStage();
        // PageMgmt.toTestPage();
    }

    async loadImages() {
        const promArray = ImageMgmt.getAllImage().map(item => ImageMgmt.loadImage(item));
        return Promise.all(promArray);
    }


}
