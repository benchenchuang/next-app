/*
 * @Author: Jimmy
 * @LastModifiedBy: Jimmy
 * @Date: 2023-11-27 08:54:30
 * @LastEditTime: 2023-12-30 16:20:50
 * @FilePath: /next-app/src/libs/utils.ts
 */
/**
 * 隐藏身份证中间8位数
 * @param {data} 传入数据
 * 格式：530026******2101
 */
export const idCard = (data: string) => {
    return data.replace(/(.{6}).*(.{4})/, '$1********$2');
};

// 定义一个深拷贝函数
export const deepClone = (target: any) => {
    // 定义一个变量
    let result: any;
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
        // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = []; // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(deepClone(target[i]));
            }
            // 判断如果当前的值是null的话；直接赋值为null
        } else if (target === null) {
            result = null;
            // 判断如果当前的值是一个RegExp对象的话，直接赋值
        } else if (target.constructor === RegExp) {
            result = target;
        } else {
            // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {};
            for (let i in target) {
                result[i] = deepClone(target[i]);
            }
        }
        // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target;
    }
    // 返回最终结果
    return result;
}

export const formatDate = (timestamp: string) => {
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let hour = ("0" + date.getHours()).slice(-2);
    let minute = ("0" + date.getMinutes()).slice(-2);
    let second = ("0" + date.getSeconds()).slice(-2);

    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}