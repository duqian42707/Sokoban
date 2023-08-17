import BackGround from "../runtime/backGround";
import {context} from "../base/global";

export default class Home {

    constructor() {
        this.bg = new BackGround();
    }

    async init() {
        this.render();
    }

    render() {
        this.bg.render(context);
    }


}
