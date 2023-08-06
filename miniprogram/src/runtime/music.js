let instance

/**
 * 统一的音效管理器
 */
export default class Music {
    constructor() {
        if (instance)
            return instance

        instance = this

        // this.bgmAudio = new Audio()
        // this.bgmAudio.loop = true
        // this.bgmAudio.src = 'assets/bgm.mp3'

        this.stepAudio = new Audio()
        this.stepAudio.src = 'assets/step.mp3'

        this.successAudio = new Audio()
        this.successAudio.src = 'assets/success.mp3'

        this.playBgm()
    }

    playBgm() {
        // this.bgmAudio.play()
    }

    playStep() {
        this.stepAudio.currentTime = 0
        this.stepAudio.play()
    }

    playSuccess() {
        this.successAudio.currentTime = 0
        this.successAudio.play()
    }
}
