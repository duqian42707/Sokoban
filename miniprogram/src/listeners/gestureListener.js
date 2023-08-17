import Hammer from "../libs/hammer.min";

export class Gesture {

    constructor({onSwipe, onTap, onPress, onPan}) {
        this.onSwipe = onSwipe;
        this.onTap = onTap;
        this.onPress = onPress;
        this.onPan = onPan;
        // get a reference to an element
        const stage = document.getElementById(canvas.id);
        // create a manager for that element
        this.mc = new Hammer.Manager(stage);
        // create and add a recognizer
        this.mc.add(new Hammer.Pan());
        this.mc.add(new Hammer.Tap());
        this.mc.add(new Hammer.Press());
        this.mc.add(new Hammer.Swipe());

        // subscribe to events
        this.mc.on('pan', this.onPan);
        this.mc.on('tap', this.onTap);
        this.mc.on('press', this.onPress);
        // this.mc.on('swipe', this.onSwipe);
    }

    addGestureListener() {
        this.mc.set({enable: true});
    }

    clearGestureListener() {
        this.mc.set({enable: false});
    }

}
