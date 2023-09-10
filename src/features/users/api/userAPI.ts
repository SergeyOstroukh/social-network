import {instanse} from "common/api";
import {AxiosResponse} from "axios";
import {UtilResponse} from "common/types/apiTypes";


export type Params = {
    count?: number,
    page?: number,
    term?: string
}



export const userAPI = {
    users(count?:number, page?:number) {
        return instanse.get<null, AxiosResponse<UtilResponse>, Params>('/users',)
    }
}

