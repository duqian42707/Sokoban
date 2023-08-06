export class KeyBoard {

    constructor(callback) {
        this.listener = (event) => {
            const keyCode = event.keyCode;
            switch (keyCode) {
                case 37:
                    if (callback) callback('left');
                    break;
                case 38:
                    if (callback) callback('up');
                    break;
                case 39:
                    if (callback) callback('right');
                    break;
                case 40:
                    if (callback) callback('down');
                    break;
                default:
                    break;
            }
        }
    }


    addKeyboardListener() {
        window.addEventListener('keydown', this.listener)
    }

    clearKeyboardListener() {
        window.removeEventListener('keydown', this.listener)
    }


}
