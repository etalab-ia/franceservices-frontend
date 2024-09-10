import { institutionsUrl } from '@api'
import { useQuery } from '@tanstack/react-query'
import { getLocalStorageUserAuth } from '@utils/auth'
import { useAuth } from '@utils/context/authContext'
import { setHeaders } from '@utils/setData'

export function useGetInstitutions() {
  return useQuery({
    queryKey: ['getInstitutions'],
    queryFn: () => fetchInstitutions(),
    enabled: true,
  })
}

const fetchInstitutions = async (): Promise<string[]> => {
  console.log('useGetInstitutions')

  const auth = getLocalStorageUserAuth()

  // Log to ensure the tokens are present
  if (!auth.tokens.accessToken || !auth.tokens.refreshToken) {
    console.error('Tokens missing:', {
      accessToken: auth.tokens.accessToken,
      refreshToken: auth.tokens.refreshToken,
    })
    throw new Error('Authentication tokens missing')
  }

  try {
    const res = await fetch(`${institutionsUrl}`, {
      method: 'GET',
      credentials: 'include',
      headers: setHeaders(false, auth.tokens.accessToken, auth.tokens.refreshToken),
    })

    console.log('res', res) // Log the raw response to debug

    if (!res.ok) {
      console.error('error: response not ok', res)
      throw new Error('Impossible de récupérer les archives', { cause: res })
    }

    const institutions = await res.json()
    console.log('institutions', institutions) // Log the parsed JSON response
    return institutions as string[]
  } catch (error) {
    console.error('fetchInstitutions error:', error) // Log any errors during fetch
    throw error
  }
}
