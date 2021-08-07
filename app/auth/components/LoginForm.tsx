import React, { useCallback, useState } from "react"
import { Button, List, ListItem, TextField } from "@material-ui/core"
import { AuthenticationError, Link, useMutation, Routes } from "blitz"
import login from "app/auth/mutations/login"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const [error, setError] = useState<null | AuthenticationError>(null)

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      const values = {
        email: e.target.email.value,
        password: e.target.password.value,
      }
      try {
        await loginMutation(values)
      } catch (e) {
        if (e instanceof AuthenticationError) {
          setError(e)
        }
      }
    },
    [loginMutation]
  )

  return (
    <form onSubmit={onSubmit}>
      <List>
        <ListItem>
          <h2>ログイン</h2>
        </ListItem>
        <ListItem>
          <TextField
            type="email"
            id="email"
            name="email"
            required
            label="メールアドレス"
            variant="outlined"
            placeholder="example@example.com"
          />
        </ListItem>
        <ListItem>
          <TextField
            type="password"
            id="password"
            name="password"
            required
            label="パスワード"
            variant="outlined"
            placeholder="********"
          />
        </ListItem>
        {error && (
          <ListItem role="alert" style={{ color: "red" }}>
            メールアドレスまたはパスワードが間違っています
          </ListItem>
        )}
        <ListItem>
          <Button type="submit" variant="contained" color="primary">
            ログイン
          </Button>
        </ListItem>
        <ListItem>
          <span style={{ marginTop: "2rem" }}>
            <Link href={Routes.ForgotPasswordPage()}>
              <a>パスワードを忘れた？</a>
            </Link>
          </span>
        </ListItem>
        <ListItem>
          <span style={{ marginTop: "0.5rem" }}>
            または <Link href={Routes.SignupPage()}>ユーザー登録</Link>
          </span>
        </ListItem>
      </List>
    </form>
  )
}

export default LoginForm
