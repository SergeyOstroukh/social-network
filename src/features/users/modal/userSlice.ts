import { createSlice } from "@reduxjs/toolkit"
import * as buffer from "buffer"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import { instanse } from "common/api"
import { Params, userAPI } from "features/users/api/userAPI"
import { User, UtilResponse } from "common/types/apiTypes"

const setUsers = createAppAsyncThunk<UtilResponse<User[]>, Params>("user/setUsers", async (arg, thunkAPI) => {
  const res = await userAPI.users(arg)
  return res.data
})

const slice = createSlice({
  name: "users",
  initialState: {
    totalCount: 0,
    users: [] as User[]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setUsers.fulfilled, (state, action) => {
        state.users = action.payload.items
        state.totalCount = action.payload.totalCount
      })
  }
})

export const usersSlice = slice.reducer
export const usersThunk = { setUsers }

