import {canvas} from "./global";


export class Gesture {
    startX = undefined;
    startY = undefined;
    endX = undefined;
    endY = undefined;

    constructor(callback) {
        this.callback = callback;
    }

    touchStartListener = (ev) => {
        if (ev.preventDefault) {
            ev.preventDefault()
        }
        this.startX = ev.touches[0].pageX;
        this.startY = ev.touches[0].pageY;
    }
    touchMoveListener = (ev) => {
        if (ev.preventDefault) {
            ev.preventDefault()
        }
        this.endX = ev.changedTouches[0].pageX;
        this.endY = ev.changedTouches[0].pageY;
    }

    touchEndListener = (ev) => {
        if (ev.preventDefault) {
            ev.preventDefault()
        }
        const direction = this.getSlideDirection(this.startX, this.startY, this.endX, this.endY);
        switch (direction) {
            case 0:
                break;
            case 1:
                if (this.callback) this.callback('up');
                break;
            case 2:
                if (this.callback) this.callback('down');
                break;
            case 3:
                if (this.callback) this.callback('left');
                break;
            case 4:
                if (this.callback) this.callback('right');
                break;
            default:
        }
        this.startX = this.startY = this.endX = this.endY = undefined;
    }


    //返回角度
    getSlideAngle(dx, dy) {
        return Math.atan2(dy, dx) * 180 / Math.PI;
    }

    //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
    getSlideDirection(startX, startY, endX, endY) {
        let result = 0;
        if (startX === undefined || startY === undefined || endX === undefined || endY === undefined) {
            return result;
        }
        const dy = startY - endY;
        const dx = endX - startX;

        // 如果滑动距离太短
        if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
            return result;
        }
        const angle = this.getSlideAngle(dx, dy);
        if (angle >= -45 && angle < 45) {
            result = 4;
        } else if (angle >= 45 && angle < 135) {
            result = 1;
        } else if (angle >= -135 && angle < -45) {
            result = 2;
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 3;
        }
        return result;
    }


    addGestureListener() {
        canvas.addEventListener('touchstart', this.touchStartListener);
        canvas.addEventListener('touchmove', this.touchMoveListener);
        canvas.addEventListener('touchend', this.touchEndListener);
    }

    clearGestureListener() {
        canvas.removeEventListener('touchstart', this.touchStartListener);
        canvas.removeEventListener('touchmove', this.touchMoveListener);
        canvas.removeEventListener('touchend', this.touchEndListener);
    }

}
