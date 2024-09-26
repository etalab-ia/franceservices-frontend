import { institutionsUrl } from '@api'
import { useQuery } from '@tanstack/react-query'
import { setHeaders } from '@utils/setData'

export function useGetInstitutions() {
  return useQuery({
    queryKey: ['getInstitutions'],
    queryFn: () => fetchInstitutions(),
    enabled: true,
  })
}

const fetchInstitutions = async (): Promise<string[]> => {
  try {
    const res = await fetch(`${institutionsUrl}`, {
      method: 'GET',
      credentials: 'include',
      headers: setHeaders(false),
    })

    if (!res.ok) {
      console.error('error: response not ok', res)
      throw new Error('Impossible de récupérer les archives', { cause: res })
    }

    const institutions = await res.json()
    return institutions as string[]
  } catch (error) {
    console.error('fetchInstitutions error:', error)
    throw error
  }
}
