let instance

/**
 * 统一的图片管理器
 */
export default class ImageMgmt {
    constructor() {
        if (instance) {
            return instance
        }
        instance = this

        this.bg = new Image()
        this.bg.src = 'assets/bg.jpg'

        this.floor = new Image()
        this.floor.src = 'assets/floor.png'

        this.wall = new Image()
        this.wall.src = 'assets/wall.png'

        this.goal = new Image()
        this.goal.src = 'assets/goal.png'

        this.man = new Image()
        this.man.src = 'assets/man.png'

        this.manOnGoal = new Image()
        this.manOnGoal.src = 'assets/man_on_goal.png'

        this.box = new Image()
        this.box.src = 'assets/box.png'

        this.boxOnGoal = new Image()
        this.boxOnGoal.src = 'assets/box_on_goal.png'

        this.btnPrev = new Image()
        this.btnPrev.src = 'assets/arrow1.png'

        this.btnNext = new Image()
        this.btnNext.src = 'assets/arrow2.png'

        this.btnReset = new Image()
        this.btnReset.src = 'assets/reset.png'

    }

    getAllImage() {
        return [
            this.bg,
            this.floor,
            this.wall,
            this.goal,
            this.man,
            this.manOnGoal,
            this.box,
            this.boxOnGoal,
            this.btnPrev,
            this.btnNext,
            this.btnReset
        ]
    }

    loadImage(img) {
        return new Promise((resolve) => {
            img.onload = () => resolve(img);
        })
    }

}
