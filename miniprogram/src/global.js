import {MiniAudio, MiniCanvas, MiniImage} from "./adapter";

export const canvas = new MiniCanvas();
export const context = canvas.getContext('2d');
export const stepSound = new MiniAudio('assets/step.mp3');
export const successSound = new MiniAudio('assets/success.mp3');
export const imgBorgar = new MiniImage('assets/borgar.png');
export const imgPrev = new MiniImage('assets/arrow1.png');
export const imgNext = new MiniImage('assets/arrow2.png');
