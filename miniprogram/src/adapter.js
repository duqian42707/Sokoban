export function MiniCanvas(src) {
    let instance;
    if (wx) {
        instance = wx.createCanvas()
    } else {
        instance = document.getElementById('game')
    }
    return instance;
}

export function MiniImage(src) {
    let instance;
    if (wx) {
        instance = wx.createImage()
    } else {
        instance = new Image();
    }
    instance.src = src;
    instance.load = async () => {
        new Promise(resolve => {
            instance.onload = () => {
                console.log('image load', instance)
                resolve();
            }
        })
    }
    return instance;
}

export function MiniAudio(src) {
    let instance;
    if (wx) {
        const innerAudioContext = wx.createInnerAudioContext({
            // 是否使用 WebAudio 作为底层音频驱动，默认关闭。对于短音频、播放频繁的音频建议开启此选项，开启后将获得更优的性能表现。
            // 由于开启此选项后也会带来一定的内存增长，因此对于长音频建议关闭此选项
            useWebAudioImplement: false
        })
        innerAudioContext.src = src;
        instance = innerAudioContext;
    } else {
        instance = new Audio(src);
    }
    return instance;
}
