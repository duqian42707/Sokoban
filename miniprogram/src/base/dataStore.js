export default class DataStore {

    static getCompleteLevels() {
        const value = localStorage.getItem('complete_levels');
        if (value == null || value === '') {
            return [];
        }
        return JSON.parse(value);
    }


    static putCompleteLevel(level) {
        const lvs = DataStore.getCompleteLevels();
        if (lvs.indexOf(level) === -1) {
            lvs.push(level);
            localStorage.setItem('complete_levels', JSON.stringify(lvs))
        }
    }

    static putCompleteLevels(levels) {
        const lvs = DataStore.getCompleteLevels();
        for (let i = 0; i < levels.length; i++) {
            const level = levels[i];
            if (lvs.indexOf(level) === -1) {
                lvs.push(level);
            }
        }
        localStorage.setItem('complete_levels', JSON.stringify(lvs))
    }


    static getCurrentLevel() {
        const lv = localStorage.getItem('current_level');
        if (lv == null || lv === '') {
            return 1;
        }
        return Number(lv);
    }

    static setCurrentLevel(lv) {
        localStorage.setItem('current_level', lv);
    }

    static saveToken(token) {
        localStorage.setItem('token', token);
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static clearToken() {
        localStorage.remove('token');
    }

}
