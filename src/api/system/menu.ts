import { http } from "@/libs/request";
import { IQueryList, IResponse } from "../index.type";

/**
 * 
 * @param params 列表
 * @returns 
 */
export const remoteList = (params: IQueryList) => {
    return http.get<IResponse>(`/api/system/menu`, params)
}

/**
 * 
 * @param data 
 * @returns 
 */
export const addInfo = (data:IQueryList)=>{
    return http.post<IResponse>(`/api/system/menu`, data)
}