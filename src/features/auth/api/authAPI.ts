import {instanse} from "common/api";
import {BaseResponseType} from "common/types/apiTypes";

export const authAPI = {
        login(data: LoginParams) {
            return instanse.post<BaseResponseType<{userId:string}>>("auth/login", data);
        },
        logout() {
            return instanse.delete<BaseResponseType>("auth/login");
        },
        me() {
            return instanse.get<BaseResponseType<{ id: number; email: string; login: string }>>("auth/me");
        },
        captcha(){
            return instanse.get<{url:string}>('/security/get-captcha-url')
        }
    }


export type LoginParams = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
}