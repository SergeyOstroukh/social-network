import {instanse} from "common/api";
import {BaseResponseType, Dialogs, Message, MessageParams, UtilResponse} from "common/types/apiTypes";

export const dialogsAPI = {
    getAllDialogs(){
        return instanse.get<Dialogs[]>(`dialogs`)
    },
    getMessagesWithUser(userId:number){
        return instanse.get<UtilResponse<Message[]>>(`dialogs/${userId}/messages`)
    },
    startChatting(userId:number){
        return instanse.put<BaseResponseType>(`dialogs/${userId}`)
    },
    sendMessage(userId:number,body:string){
        return instanse.post<BaseResponseType<MessageParams>>(`dialogs/${userId}/messages`, {body})
    },
    isMessageViewed(messageId:string){
        return instanse.get<boolean>(`dialogs/messages/${messageId}/viewed`)
    },
    addMessageToSpam(messageId:number){
        return instanse.post<BaseResponseType>(`dialogs/messages/${messageId}/spam`)
    },
    deleteOnlyForMe(messageId:number){
        return instanse.delete<BaseResponseType>(`dialogs/messages/${messageId}`)
    },
    restoreMessage(messageId:number){
        return instanse.put<BaseResponseType>(`dialogs/messages/${messageId}/restore`)
    },
    sortByData(userId:number,date:string){
        return instanse.get<Message[]>(`dialogs/${userId}/messages/new?newerThen=${date}`)
    },
    newMessagesList(){
        return instanse.get<Message[]>(`dialogs/messages/new/count`)
    }
}