import RequestUtils from "./requestUtils";
import DataStore from "../base/dataStore";
import Constants from "../base/constants";

export default class LoginUtils {
    static async login() {
        const loginResp = await LoginUtils.wxLogin();
        const code = loginResp.code;
        const resp = await RequestUtils.request({
            method: 'post',
            url: Constants.SERVER_PREFIX + '/api/login',
            data: {code: code},
            needToken: false
        })
        const token = resp.data.data;
        DataStore.saveToken(token);
        return token;
    }

    static wxLogin() {
        return new Promise((resolve, reject) => {
            wx.login({
                success(res) {
                    resolve(res);
                },
                fail(res) {
                    reject(res);
                }
            })
        })
    }
}
