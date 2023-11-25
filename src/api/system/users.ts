import { http } from "@/libs/request";
import { IQueryList, IResponse } from "../index.type";

export const remoteUserList = (params: IQueryList) => {
    return http.get<IResponse>(`/api/system/users`, params)
}