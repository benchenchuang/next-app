/*
 * @Author: benchenchuang benchenchuang
 * @Date: 2023-12-13 17:36:50
 * @LastEditors: benchenchuang benchenchuang
 * @LastEditTime: 2023-12-23 17:24:39
 * @FilePath: /next-app/src/app/api/base.interface.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { IQueryList, IResponse } from "@/api/index.type"

/**
 * 接口返回的基本信息结构
 * @param code     接口数据码 200成功 0失败
 * @param message  接口消息内容
 * @param data     接口数据
 * @returns 
 */
export const responseData = (code: number = 200, message: string, data:any = {}): IResponse => {
    return {
        code,
        message,
        data
    }
}
/**
 * 查询基本参数封装
 * @param page   开始页数
 * @param size   每页数据量
 * @param params 其他查询参数
 * @returns 
 */
export const requestData = (page: number = 1, size: number = 10, params?: IQueryList) => {
    let skip = (page - 1) * size;
    return {
        skip, //从skip开始（不包含skip)
        take: size,//取几条
        where: {
            ...params
        },
    }
}
/**
 * 获取get请求传参的参数内容
 * @param params 参数params
 * @param type   获取某个参数值
 * @returns 
 */
export const getParamsData = (params: any, type: String):any => {
    return params.get(type)
}