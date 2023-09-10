import {instanse} from "common/api";
import {BaseResponseType} from "common/types/apiTypes";

export const followAPI = {
    isFollow(userId:number){
        return instanse.get<boolean>(`/follow/${userId}`)
    },
    follow(userId:number){
        return instanse.post<BaseResponseType>(`/follow/${userId}`)
    },
    unFollow(userId:number){
        return instanse.delete(`/follow/${userId}`)
    }
}