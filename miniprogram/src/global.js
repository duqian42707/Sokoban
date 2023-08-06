let _canvas, _imgBorgar, _stepSound,_successSound
if (wx) {
    _canvas = wx.createCanvas();
    _imgBorgar = wx.createImage();
    const innerAudioContext = wx.createInnerAudioContext({
        // 是否使用 WebAudio 作为底层音频驱动，默认关闭。对于短音频、播放频繁的音频建议开启此选项，开启后将获得更优的性能表现。
        // 由于开启此选项后也会带来一定的内存增长，因此对于长音频建议关闭此选项
        useWebAudioImplement: false
    })
    innerAudioContext.src = 'assets/step.mp3'
    _stepSound = innerAudioContext;

    const innerAudioContext2 = wx.createInnerAudioContext({
        // 是否使用 WebAudio 作为底层音频驱动，默认关闭。对于短音频、播放频繁的音频建议开启此选项，开启后将获得更优的性能表现。
        // 由于开启此选项后也会带来一定的内存增长，因此对于长音频建议关闭此选项
        useWebAudioImplement: false
    })
    innerAudioContext2.src = 'assets/success.mp3'
    _successSound = innerAudioContext2;
} else {
    _canvas = document.getElementById('game')
    _imgBorgar = new Image();
    _stepSound = new Audio('assets/step.mp3');
    _successSound = new Audio('assets/success.mp3');
}
const _context = _canvas.getContext('2d');
_imgBorgar.src = 'assets/borgar.png';


export const canvas = _canvas;
export const context = _context;
export const imgBorgar = _imgBorgar;
export const stepSound = _stepSound;
export const successSound = _successSound;
