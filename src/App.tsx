import React, { useEffect } from "react"
import "./App.css"
import { Login } from "features/auth/ui/Login"
import { usersThunk } from "features/users/modal/userSlice"
import { useActions } from "common/hooks/useActions"
import { Users } from "features/users/ui/Users"
import { useSelector } from "react-redux"
import { AppRootStateType } from "app/store"

function App() {

  const { setUsers } = useActions(usersThunk)
  const isLogin = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

  useEffect(() => {

    const arg = {
      count: 1,
      page: 2
    }
    setUsers(arg)
  })

  return (
    <div>
      {/*<Login />*/}
      <Users />
    </div>
  )
}

export default App
