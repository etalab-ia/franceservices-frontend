import { institutionsUrl } from '@api'
import { useQuery } from '@tanstack/react-query'
import { getLocalStorageUserAuth } from '@utils/auth'
import { setHeaders } from '@utils/setData'

export function useGetInstitutions() {
  return useQuery({
    queryKey: ['getInstitutions'],
    queryFn: () => fetchInstitutions(),
    enabled: true,
  })
}

const fetchInstitutions = async (): Promise<string[]> => {
  const auth = getLocalStorageUserAuth()

  // Log to ensure the tokens are present
  if (!auth.access_token || !auth.refresh_token) {
    console.error('Tokens missing:', {
      accessToken: auth.access_token,
      refreshToken: auth.refresh_token,
    })
    throw new Error('Authentication tokens missing')
  }

  try {
    const res = await fetch(`${institutionsUrl}`, {
      method: 'GET',
      credentials: 'include',
      headers: setHeaders(false, auth.access_token, auth.refresh_token),
    })

    if (!res.ok) {
      console.error('error: response not ok', res)
      throw new Error('Impossible de récupérer les archives', { cause: res })
    }

    const institutions = await res.json()
    return institutions as string[]
  } catch (error) {
    console.error('fetchInstitutions error:', error) // Log any errors during fetch
    throw error
  }
}
