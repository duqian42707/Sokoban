export default class CommonUtils {
    static wait(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
}
