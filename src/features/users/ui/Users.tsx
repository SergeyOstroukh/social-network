import React from "react"
import { useActions } from "common/hooks/useActions"
import { usersThunk } from "features/users/modal/userSlice"
import { useSelector } from "react-redux"
import { AppRootStateType } from "app/store"
import { User } from "common/types/apiTypes"

export const Users = () => {

  const { setUsers } = useActions(usersThunk)
  const users = useSelector<AppRootStateType, User[]>(state => state.users.users)

  return (
    <div>
      {users.map((el)=>{
        return(el.name)
      })}
    </div>
  )
}

