let _canvas, _imgBorgar
if (wx) {
    _canvas = wx.createCanvas();
    _imgBorgar = wx.createImage();
} else {
    _canvas = document.getElementById('game')
    _imgBorgar = new Image();
}
const _context = _canvas.getContext('2d');
_imgBorgar.src = 'assets/borgar.png';

export const canvas = _canvas;
export const context = _context;
export const imgBorgar = _imgBorgar;
