import type { Dispatch, SetStateAction } from 'react'
import { Navigate } from 'react-router-dom'
import { InitialUserAuth, type UserAuth } from './auth'
import { useFetch } from './hooks'

const storeAuth = async (token: string) => {
  localStorage.setItem('authToken', token)
}

export const setUserInfos = async (
  token: string,
  setUserAuth: Dispatch<SetStateAction<UserAuth>>,
  userUrl: string,
) => {
  const userInfos = await useFetch(userUrl, 'GET', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: null,
  })

  if (userInfos.detail === 'Unauthorized') return rmAuth()

  storeAuth(token)

  if (token !== 'null')
    return setUserAuth({
      email: userInfos.email,
      username: userInfos.username,
      // TODO: see if we cand delete userAuth.authToken
      authToken: token,
      isLogin: true,
    })
  return setUserAuth(InitialUserAuth)
}

const rmAuth = () => {
  localStorage.removeItem('authToken')
}

export const handleSignout = async (setUserAuth, signoutUrl: string) => {
  const userToken = localStorage.getItem('authToken')
  await useFetch(signoutUrl, 'POST', {
    headers: { Authorization: `Bearer ${userToken}` },
  })
    .then(() => rmAuth())
    .then(() => setUserAuth(InitialUserAuth))

  return <Navigate to="/" />
}
