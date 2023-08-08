const imgSrcList = [
    'assets/bg.jpg',
    'assets/floor.png',
    'assets/wall.png',
    'assets/goal.png',
    'assets/man.png',
    'assets/man_on_goal.png',
    'assets/box.png',
    'assets/box_on_goal.png',
    'assets/arrow1.png',
    'assets/arrow2.png',
    'assets/reset.png',
    'assets/solve.png',
];

const imageList = imgSrcList.map(src => {
    const img = new Image();
    img.src = src;
    img['_src'] = src;
    return img;
});
/**
 * 统一的图片管理器
 */
export default class ImageMgmt {
    constructor() {
    }

    static getImageBySrc(src) {
        return imageList.find(item => item['_src'] === src);
    }


    static getAllImage() {
        return imageList;
    }

    static loadImage(img) {
        return new Promise((resolve) => {
            img.onload = () => resolve(img);
        })
    }

}
