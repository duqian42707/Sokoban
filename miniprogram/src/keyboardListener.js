export class KeyBoard {

    listener = (ev) => {
        if (ev.preventDefault) {
            ev.preventDefault()
        }
        const keyCode = ev.keyCode;
        switch (keyCode) {
            case 37:
                if (this.callback) this.callback('left');
                break;
            case 38:
                if (this.callback) this.callback('up');
                break;
            case 39:
                if (this.callback) this.callback('right');
                break;
            case 40:
                if (this.callback) this.callback('down');
                break;
            default:
                break;
        }
    }

    constructor(callback) {
        this.callback = callback;
    }

    addKeyboardListener() {
        if (window) window.addEventListener('keydown', this.listener)
    }

    clearKeyboardListener() {
        if (window) window.removeEventListener('keydown', this.listener)
    }


}
