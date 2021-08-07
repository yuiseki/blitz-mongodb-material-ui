import { Link, Routes, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import React, { useCallback, useEffect, useState } from "react"
import { Button, List, ListItem, TextField } from "@material-ui/core"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [passwordMatched, setPasswordMatched] = useState(false)
  const [error, setError] = useState<null | Error>(null)

  useEffect(() => {
    if (password.length > 0 && passwordConfirm.length > 0) {
      setPasswordMatched(password === passwordConfirm)
    }
  }, [password, passwordConfirm])

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault()
      const values = {
        email: event.target.email.value,
        password: event.target.password.value,
      }
      try {
        await signupMutation(values)
      } catch (err) {
        if (err.message.indexOf("[") === 1) {
          const errors = JSON.parse(err.message)
          console.log(errors[0])
          console.log(errors[0].code)
          setError(errors[0])
        } else {
          setError(err)
        }
      }
    },
    [signupMutation]
  )

  return (
    <form onSubmit={onSubmit} style={{ width: 400 }}>
      <List>
        <ListItem>
          <h2>ユーザー登録</h2>
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
            fullWidth
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
            error={password.length < 10}
            helperText={password.length < 10 && "パスワードは10文字以上にしてください"}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            fullWidth
          />
        </ListItem>
        <ListItem>
          <TextField
            type="password"
            id="password-confirm"
            required
            label="パスワード（確認）"
            variant="outlined"
            placeholder="********"
            error={!passwordMatched}
            helperText={!passwordMatched && "パスワードが一致していません"}
            onChange={(e) => {
              setPasswordConfirm(e.target.value)
            }}
            fullWidth
          />
        </ListItem>
        {error && error.message === "Email already used" && (
          <ListItem role="alert" style={{ color: "red" }}>
            このメールアドレスはすでに使われています
          </ListItem>
        )}
        {error && error.message !== "Email already used" && (
          <ListItem role="alert" style={{ color: "red" }}>
            パスワードは10文字以上にしてください
          </ListItem>
        )}
        <ListItem>
          <Button type="submit" variant="contained" color="primary" disabled={!passwordMatched}>
            ユーザー登録
          </Button>
        </ListItem>
        <ListItem>
          <span style={{ marginTop: "2rem" }}>
            または <Link href={Routes.LoginPage()}>ログイン</Link>
          </span>
        </ListItem>
      </List>
    </form>
  )
}

export default SignupForm
