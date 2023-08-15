import DataStore from "../base/dataStore";
import LoginUtils from "./loginUtils";

export default class RequestUtils {
    static async request({method, url, data, needToken}) {
        if (!needToken) {
            return await this.singeRequest({method, url, data});
        }
        let token = DataStore.getToken();
        if (token == null || token === '') {
            token = await LoginUtils.login()
        }
        return await this.singeRequest({method, url, data, token})
    }

    static singeRequest({method, url, data, token}) {
        return new Promise((resolve, reject) => {
            const header = {
                'content-type': 'application/json', // 默认值
            }
            if (token) {
                header['Authorization'] = 'bearer ' + token;
            }
            wx.request({
                method: method,
                url: url,
                data: data,
                header: header,
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
