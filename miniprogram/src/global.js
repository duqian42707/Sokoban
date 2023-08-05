let canvas, imgBorgar
if (wx) {
    canvas = wx.createCanvas();
    imgBorgar = wx.createImage();
} else {
    canvas = document.getElementById('game')
    imgBorgar = new Image();
}
const context = canvas.getContext('2d');
imgBorgar.src = 'assets/borgar.png';

exports.canvas = canvas;
exports.context = context;
exports.imgBorgar = imgBorgar;
