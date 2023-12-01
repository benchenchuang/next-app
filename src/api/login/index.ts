import { http } from "@/libs/request";
import { IQueryList, IResponse } from "../index.type";

export const login = (data: IQueryList) => {
    return http.post<IResponse>(`/api/login`, data)
}