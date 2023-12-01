import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { message } from 'antd'
import { getCache } from "./session";
const service: AxiosInstance = axios.create({
    baseURL: '',
    timeout: 60 * 1000
});
// 请求处理
service.interceptors.request.use((config: any) => {
    let token = '';
    // let token = getCache('token') ||'';
    config.headers = {
        "Content-Type": "application/json",
        "token": token
    }
    return config;
}, (error: any) => {
    return Promise.reject(error);
});
//响应处理
service.interceptors.response.use((response: AxiosResponse) => {
    let { code = 200 } = response.data;
    if (code == 200) {
        return Promise.resolve(response.data);
    } else {
        message.error(response.data.message || '操作错误');
        return Promise.reject(response.data);
    }
}, (error: any) => {
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                message.error( error.response.data.message || error.response.data.msg || '请求错误')
                break;
            case 401:
                message.error('未授权');
                window.location.replace('/login');
                break;
            case 403:
                message.error('登录过期')
                window.location.replace('/login');
                break;
            default:
                message.error(error.response.data.message || error.response.data.msg || '请求错误')
                // window.location.replace('/login');
                break;
        }
    }
    return Promise.reject(error);
});

export const http = {
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return service.get(url, config)
    },
    delete<T = any>(url: string, config?: AxiosRequestConfig<T>): Promise<T> {
        return service.delete(url, config)
    },
    post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
        return service.post(url, data, config)
    },
    put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
        return service.put(url, data, config)
    }
}


export default service