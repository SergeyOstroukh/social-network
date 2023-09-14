import { createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk"
import { Params, userAPI } from "features/users/api/userAPI"
import { User, UtilResponse } from "common/types/apiTypes"
import { followAPI } from "features/users/api/followAPI"
import { ResultCod } from "common/enums/enams"

const setUsers = createAppAsyncThunk<UtilResponse<User[]>, Params>("user/setUsers", async (arg, thunkAPI) => {
  const res = await userAPI.users(arg)
  return res.data
})

const followUser = createAppAsyncThunk<{userId:number},number>('user/followUser',async (userId, thunkAPI)=>{
  const {rejectWithValue} = thunkAPI
  const res = await followAPI.follow(userId)
  if (res.data.resultCode===ResultCod.Success){
    return {userId}
  }else {
    return rejectWithValue({data:res.data})
  }
})

const unFollowUser = createAppAsyncThunk<{userId:number},number>('user/unFollowUser',async (userId, thunkAPI)=>{
  debugger
  const {rejectWithValue} = thunkAPI
  const res = await followAPI.unFollow(userId)
  if (res.data.resultCode===ResultCod.Success){
    return {userId}
  }else {
    return rejectWithValue({data:res.data})
  }
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
      .addCase(followUser.fulfilled, (state, action)=>{
        const user = state.users.find(el => el.id===action.payload.userId)
          if(user){
            user.followed = true
          }
      })
      .addCase(unFollowUser.fulfilled,(state, action)=>{
        const user = state.users.find(el => el.id===action.payload.userId)
        if(user){
          user.followed = false
        }
      })
  }
})

export const usersSlice = slice.reducer
export const usersThunk = { setUsers,followUser,unFollowUser }

