export function getCompleteLevels() {
    const value = localStorage.getItem('complete_levels');
    if (value == null || value === '') {
        return [];
    }
    return JSON.parse(value);
}


export function putCompleteLevel(level) {
    const lvs = getCompleteLevels();
    if (lvs.indexOf(level) === -1) {
        lvs.push(level);
        localStorage.setItem('complete_levels', JSON.stringify(lvs))
    }
}


export function getCurrentLevel() {
    const lv = localStorage.getItem('current_level');
    if (lv == null) {
        return 1;
    }
    return Number(lv);
}

export function setCurrentLevel(lv) {
    localStorage.setItem('current_level', lv);
}
