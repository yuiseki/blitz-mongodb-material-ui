import React from "react"
import { Divider, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import HomeIcon from "@material-ui/icons/Home"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import { Link, useMutation } from "blitz"
import { useCurrentUser } from "../hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"

export const MyDrawer: React.VFC = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  return (
    <div>
      <Divider />
      <List>
        <Link href="/">
          <ListItem button key="トップページ">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="トップページ" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        {!currentUser && (
          <>
            <Link href="/signup">
              <ListItem button key="ユーザー登録">
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="ユーザー登録" />
              </ListItem>
            </Link>
            <Link href="/login">
              <ListItem button key="ログイン">
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="ログイン" />
              </ListItem>
            </Link>
          </>
        )}
        {currentUser && (
          <ListItem button onClick={() => logoutMutation()} key="ログアウト">
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="ログアウト" />
          </ListItem>
        )}
      </List>
      <Divider />
    </div>
  )
}
