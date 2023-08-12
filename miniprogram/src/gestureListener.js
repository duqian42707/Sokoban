import Hammer from "./libs/hammer.min";

export class Gesture {

    constructor({onSwipe, onTap, onPress}) {
        this.onSwipe = onSwipe;
        this.onTap = onTap;
        this.onPress = onPress;
        // get a reference to an element
        const stage = document.getElementById(canvas.id);
        // create a manager for that element
        this.mc = new Hammer.Manager(stage);
        // create and add a recognizer
        this.mc.add(new Hammer.Swipe());
        this.mc.add(new Hammer.Tap());
        this.mc.add(new Hammer.Press());

        // subscribe to events
        this.mc.on('swipe', this.onSwipe);
        this.mc.on('tap', this.onTap);
        this.mc.on('press', this.onPress);
    }

    addGestureListener() {
        this.mc.set({enable: true});
    }

    clearGestureListener() {
        this.mc.set({enable: false});
    }

}
