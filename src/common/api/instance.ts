import axios from "axios";

export const instanse = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers:{
        
    }
});