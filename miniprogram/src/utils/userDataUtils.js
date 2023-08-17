import RequestUtils from "./requestUtils";
import DataStore from "../base/dataStore";
import {Config} from "../base/global";

export default class UserDataUtils {

    static async loadServerData() {
        const resp = await RequestUtils.request({
            method: 'get',
            url: Config.SERVER_PREFIX + '/api/userData',
            data: {},
            needToken: true
        })
        const {completeLevels} = resp.data.data;
        DataStore.putCompleteLevels(completeLevels)
    }

    static async uploadUserData({completeLevels}) {
        return await RequestUtils.request({
            method: 'post',
            url: Config.SERVER_PREFIX + '/api/userData',
            data: {
                completeLevels: completeLevels
            },
            needToken: true
        });
    }
}
