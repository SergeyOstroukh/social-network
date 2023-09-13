import {instanse} from "common/api";
import {AxiosResponse} from "axios";
import { User, UtilResponse } from "common/types/apiTypes"


export type Params = {
    count?: number,
    page?: number,
    term?: string
}



export const userAPI = {
    users(params?:Params) {
        return instanse.get<null, AxiosResponse<UtilResponse<User[]>>, Params>('/users',{params})
    }
}

