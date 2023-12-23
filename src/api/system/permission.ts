import { http } from "@/libs/request";
import { IQueryList, IResponse } from "../index.type";

/**
 * 查询数据列表
 * @param params 
 * @returns 
 */
export const remoteList = (params: IQueryList) => {
    return http.get<IResponse>(`/api/system/permission`, { params })
}
