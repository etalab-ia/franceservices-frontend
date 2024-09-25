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

const fetchUser = async () => {
  try {
    const res = await fetch(getUserUrl, {
      method: 'GET',
      credentials: 'include',
      headers: setHeaders(false),
    })

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
