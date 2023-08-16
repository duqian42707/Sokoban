import DataStore from "../base/dataStore";
import LoginUtils from "./loginUtils";
import log from "./logUtils";

export default class RequestUtils {
    static async request({method, url, data, needToken}) {
        if (!needToken) {
            return await this.singeRequest({method, url, data});
        }
        let token = DataStore.getToken();
        if (token == null || token === '') {
            token = await LoginUtils.login()
        }
        let resp
        try {
            resp = await this.singeRequest({method, url, data, token})
        } catch (e) {
            console.log(e);
            if (e.statusCode === 401) {
                token = await LoginUtils.login()
                resp = await this.singeRequest({method, url, data, token})
            }
        }
        return resp;
    }

    static singeRequest({method, url, data, token}) {
        return new Promise((resolve, reject) => {
            const header = {
                'content-type': 'application/json', // 默认值
            }
            if (token) {
                header['Authorization'] = 'bearer ' + token;
            }
            console.log('singleRequest..')
            wx.request({
                method: method,
                url: url,
                data: data,
                header: header,
                success(res) {
                    if (res.statusCode === 200) {
                        console.log('success', res)
                        resolve(res);
                    } else {
                        reject(res)
                    }
                },
                fail(res) {
                    log.error('request fail: ' + res.errno + ', ' + res.errMsg)
                    reject(res);
                }
            })
        })
    }
}
