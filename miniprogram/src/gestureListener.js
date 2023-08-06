export function addGestureListener(func) {

    //返回角度
    function GetSlideAngle(dx, dy) {
        return Math.atan2(dy, dx) * 180 / Math.PI;
    }

    //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
    function GetSlideDirection(startX, startY, endX, endY) {
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
        const angle = GetSlideAngle(dx, dy);
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

    //滑动处理
    let startX, startY, endX, endY;
    wx.onTouchStart((ev) => {
        startX = ev.touches[0].pageX;
        startY = ev.touches[0].pageY;
    });

    wx.onTouchMove((ev) => {
        endX = ev.changedTouches[0].pageX;
        endY = ev.changedTouches[0].pageY;
    });

    wx.onTouchEnd((ev) => {
        const direction = GetSlideDirection(startX, startY, endX, endY);
        switch (direction) {
            case 0:
                break;
            case 1:
                if (func) func('up');
                break;
            case 2:
                if (func) func('down');
                break;
            case 3:
                if (func) func('left');
                break;
            case 4:
                if (func) func('right');
                break;
            default:
        }
        startX = startY = endX = endY = undefined;
    });
}

export function clearGestureListener() {
    wx.offTouchStart();
    wx.offTouchMove();
    wx.offTouchEnd();
}
