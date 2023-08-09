export default class CommonUtils {
    static wait(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    static newArray(obj, num) {
        const arr = [];
        for (let i = 0; i < num; i++) {
            arr.push(obj);
        }
        return arr;
    }

    static stringOfNum(char, num) {
        let result = '';
        for (let i = 0; i < num; i++) {
            result += char;
        }
        return result;
    }
}
