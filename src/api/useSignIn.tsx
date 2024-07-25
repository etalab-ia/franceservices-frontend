import { signinUrl } from '@api'
import { useMutation } from '@tanstack/react-query'

export function useSignIn() {
  return useMutation({
    mutationKey: ['signIn'],
    mutationFn: (params: SignInParams) => signIn({ ...params }),
  })
}

interface SignInParams {
  username: string
  password: string
}

const signIn = async ({ username, password }: SignInParams) => {
  const data = {
    username,
    password,
  }
  const res = await fetch(`${signinUrl}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    console.error('error: response not ok', res)
    return res
  }
  const result = await res.json()
  return result
}
