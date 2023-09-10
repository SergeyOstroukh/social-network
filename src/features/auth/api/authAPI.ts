import {instanse} from "common/api";
import {BaseResponseType} from "common/types/apiTypes";

export const authAPI = {
        login(data: LoginParamsType) {
            return instanse.post<BaseResponseType<{userId:string}>>("auth/login", data);
        },
        logout() {
            return instanse.delete<BaseResponseType>("auth/login");
        },
        me() {
            return instanse.get<BaseResponseType<{ id: number; email: string; login: string }>>("auth/me");
        },
        captcha(){
            return instanse.get<BaseResponseType<{url:string}>>('/security/get-captcha-url')
        }
    }


export type LoginParamsType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
}