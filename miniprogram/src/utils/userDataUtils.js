import RequestUtils from "./requestUtils";
import DataStore from "../base/dataStore";
import Constants from "../base/constants";

export default class UserDataUtils {

    static async loadServerData() {
        const resp = await RequestUtils.request({
            method: 'get',
            url: Constants.SERVER_PREFIX + '/api/userData',
            data: {},
            needToken: true
        })
        const {completeLevels} = resp.data.data;
        DataStore.putCompleteLevels(completeLevels)
    }

    static async uploadUserData({completeLevels}) {
        return await RequestUtils.request({
            method: 'post',
            url: Constants.SERVER_PREFIX + '/api/userData',
            data: {
                completeLevels: completeLevels
            },
            needToken: true
        });
    }
}
