import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "features/auth/modal/authSlice";

export const store = configureStore({
    reducer:{
        auth: authSlice
    }
})


export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;