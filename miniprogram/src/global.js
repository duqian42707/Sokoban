const canvas = wx.createCanvas();
// const canvas = document.getElementById('game')
const context = canvas.getContext('2d');

const imgBorgar = wx.createImage();
// const imgBorgar = new Image();
imgBorgar.src = 'assets/borgar.png';

exports.canvas = canvas;
exports.context = context;
exports.imgBorgar = imgBorgar;
