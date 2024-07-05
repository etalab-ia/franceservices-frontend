import type { Dispatch, SetStateAction } from 'react'
import type { UserAuth } from './auth'
import { setUserInfos } from './manageConnexion'

export function checkConnexion(
  setUserAuth: Dispatch<SetStateAction<UserAuth>>,
  userUrl: string,
) {
  return new Promise<void>((resolve) => {
    const authToken = localStorage.getItem('authToken')
    if (authToken) {
      setUserInfos(authToken, setUserAuth, userUrl)
        .then(resolve)
        .catch(() => resolve())
    } else {
      resolve()
    }
  })
}
