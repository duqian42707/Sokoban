import BoxGame from "../pages/game";
import SelectStage from "../pages/selectStage";
import TestPage from "../pages/testPage";
import Home from "../pages/home";

let instance

/**
 * 页面管理
 */
export class PageMgmt {
    constructor() {
        if (instance) {
            return instance;
        }
        instance = this;
    }

    static toHomePage() {
        if (this.home == null) {
            this.home = new Home();
        }
        this.home.init();
    }


    static toGame(level) {
        if (this.game == null) {
            this.game = new BoxGame(level);
        }
        this.game.init();
    }

    static toSelectStage() {
        if (this.selectStage == null) {
            this.selectStage = new SelectStage();
        }
        this.selectStage.init();
    }

    static toTestPage() {
        if (this.testPage == null) {
            this.testPage = new TestPage();
        }
        this.testPage.init();
    }


}
