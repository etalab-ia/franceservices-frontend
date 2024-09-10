import { useQuery } from '@tanstack/react-query'
import { setHeaders } from '@utils/setData'
import { getUserUrl } from './routes'
import { getLocalStorageUserAuth } from '@utils/auth'

export function useGetUser() {
  return useQuery({
    queryKey: ['getUser'],
    queryFn: () => fetchUser(),
  })
}

const fetchUser = async (): Promise<string[]> => {
  const auth = getLocalStorageUserAuth()
  console.log('fetchuser', auth)
  if (!auth.access_token || !auth.refresh_token) {
    console.error('Tokens missing:', {
      accessToken: auth.access_token,
      refreshToken: auth.refresh_token,
    })
    throw new Error('Authentication tokens missing')
  }
  try {
    const res = await fetch(getUserUrl, {
      method: 'GET',
      credentials: 'include',
      headers: setHeaders(false, auth.access_token, auth.refresh_token),
    })

    console.log('res', res)

    if (!res.ok) {
      console.error('error: response not ok', res)
      throw new Error('Impossible de récupérer le user', { cause: res })
    }

    const user = await res.json()
    return user
  } catch (error) {
    console.error('fetchUser error:', error)
    throw error
  }
  //}
}
