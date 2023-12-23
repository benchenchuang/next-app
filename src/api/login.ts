/*
 * @Author: benchenchuang benchenchuang
 * @Date: 2023-11-25 08:06:11
 * @LastEditors: benchenchuang benchenchuang
 * @LastEditTime: 2023-12-01 19:58:53
 * @FilePath: /next-app/src/api/login.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { http } from "@/libs/request";
import { IQueryList, IResponse } from "./index.type";

/**
 * 登录
 * @param data 
 * @returns 
 */
export const login = (data: IQueryList) => {
    return http.post<IResponse>(`/api/login`, data)
}

/**
 * 退出
 */
export const logout = ()=>{
    return http.put<IResponse>(`/api/login`)
}