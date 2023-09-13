import { createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import { authAPI, LoginParams } from "features/auth/api/authAPI"
import { ResultCod } from "common/enums/enams"


const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParams>("auth/login", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  const res = await authAPI.login(arg)
  if (res.data.resultCode === ResultCod.Success) {
    return { isLoggedIn: true }
  } else if (res.data.resultCode === ResultCod.Captcha) {
    dispatch(authThunk.captcha())
    return { isLoggedIn: false }
  } else {
    return rejectWithValue({ data: res.data })
  }
})

const logOut = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>("auth/logOut", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  const res = await authAPI.logout()
  if (res.data.resultCode === ResultCod.Success) {
    return { isLoggedIn: false }
  } else {
    return rejectWithValue({ data: res.data })
  }
})

const captcha = createAppAsyncThunk<{ captcha: string }, undefined>("auth/captha", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  const res = await authAPI.captcha()
    return { captcha: res.data.url }
})

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    captcha:null as null|string
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(captcha.fulfilled, (state, action) => {
        state.captcha = action.payload.captcha
      })
  }
})

export const authSlice = slice.reducer
export const authThunk = { login, logOut, captcha }
