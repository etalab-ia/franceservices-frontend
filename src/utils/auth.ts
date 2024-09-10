export interface UserAuth {
  email: string
  username: string
  authToken: string
  isLogin: boolean
}

export const InitialUserAuth: UserAuth = {
  email: '',
  username: '',
  authToken: '',
  isLogin: false,
}

export function getLocalStorageUserAuth() {
  const userAuth = localStorage.getItem('auth_tokens')
  if (userAuth) {
    console.log('userAuth', userAuth)
    const parsed = JSON.parse(userAuth)
    console.log('parsed', parsed)
    return parsed
  }
  return null
}
