import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "features/auth/modal/authSlice";
import { usersSlice } from "features/users/modal/userSlice"

export const store = configureStore({
    reducer:{
        auth: authSlice,
        users:usersSlice
    }
})


export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;