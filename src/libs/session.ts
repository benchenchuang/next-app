/**
 * 设置localStorage
 * @param {string} key
 * @param {any} value
 */
export function setCache(key: string, value: any) {
    if (value == undefined || value == null) {
        localStorage.setItem(key, value);
    } else {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

/**
 * 获取localStorage
 * @param {string} key
 * @returns {any}
 */
export function getCache(key: string) {
    if (localStorage.getItem(key) == 'undefined' || localStorage.getItem(key) == null) {
        return undefined;
    }
    let keyContent = localStorage.getItem(key);
    let getKey = keyContent && JSON.parse(keyContent)
    return getKey;
}

/**
 * 清除指定localStorage
 * @param {string} key
 */
export function removeCache(key: string) {
    return localStorage.removeItem(key);
}

/**
 * 清除所有localStorage
 */
export function removeAll() {
    return localStorage.clear();
}
