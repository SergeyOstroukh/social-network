import {instanse} from "common/api";
import {BaseResponseType, UserProfile} from "common/types/apiTypes";

export const profileAPI={
    getStatus(userId:number){
        return instanse.get<string>(`profile/status/${userId}`)
    },
    changeStatus(status:string){
        return instanse.put<BaseResponseType>('profile/status', {status})
    },
    getProfile(userId:number){
        return instanse.get<UserProfile>(` /profile/${userId}`)
    },
    updateProfile(model:UserProfile){
        return instanse.put<BaseResponseType>(`profile`, model)
    },
    updateProfilePhoto(photo:string){
        return instanse.put<BaseResponseType>(`profile,photo`, photo)
    },
}