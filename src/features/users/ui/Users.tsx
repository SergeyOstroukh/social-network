import React from "react"
import { useActions } from "common/hooks/useActions"
import { usersThunk } from "features/users/modal/userSlice"
import { useSelector } from "react-redux"
import { AppRootStateType } from "app/store"
import { User } from "common/types/apiTypes"
import { Button, Card } from "antd"
import Meta from "antd/es/card/Meta"
import Avatar from "antd/es/avatar/avatar"

export const Users = () => {

  const { setUsers, followUser,unFollowUser } = useActions(usersThunk)
  const users = useSelector<AppRootStateType, User[]>(state => state.users.users)


  const followFriendHandler = (userId:number, follow:boolean) => {
    if(follow){
      unFollowUser(userId)
    } else {
      followUser(userId)
    }
  }


  return (
    <div>
      {users.map((el) => {
        return (
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <Button onClick={()=>followFriendHandler(el.id, el.followed)} type="primary">{el.followed? "Unfollow":"Follow"}</Button>
            ]}
          >
            <Meta
              avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
              title={el.name}
              description="This is the description"
            />
          </Card>
        )
      })}
    </div>
  )
}

