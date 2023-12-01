import { http } from "@/libs/request";
import { IQueryList, IResponse } from "../index.type";

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