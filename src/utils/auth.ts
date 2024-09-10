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
    return JSON.parse(userAuth)
  }
  return null
}
