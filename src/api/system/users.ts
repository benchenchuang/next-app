import { http } from "@/libs/request";
import { IQueryList, IResponse } from "../index.type";

export const remoteList = (params: IQueryList) => {
    return http.get<IResponse>(`/api/system/users`, {params})
}


/**
 * 添加信息
 * @param data 
 * @returns 
 */
export const addInfo = (data: IQueryList) => {
    return http.post<IResponse>(`/api/system/users`, data)
}

/**
 * 更新信息
 * @param data 
 * @returns 
 */
export const updateInfo = (data: IQueryList) => {
    return http.put<IResponse>(`/api/system/users`, data)
}

/**
 * 删除信息
 * @param data 
 * @returns 
 */
export const deleteInfo = (params: IQueryList) => {
    return http.delete<IResponse>(`/api/system/users`, {params})
}