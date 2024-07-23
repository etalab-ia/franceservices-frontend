import { institutionsUrl } from '@api'
import { useQuery } from '@tanstack/react-query'
import getHeader from './utils/getHeader'

export function useGetInstitutions(accessToken: string, refreshToken: string) {
  return useQuery({
    queryKey: ['getInstitutions'],
    queryFn: () => fetchInstitutions(accessToken, refreshToken),
    enabled: true,
  })
}

const fetchInstitutions = async (
  accessToken: string,
  refreshToken: string,
): Promise<string[]> => {
  const res = await fetch(`${institutionsUrl}`, {
    method: 'GET',
    credentials: 'include',
    headers: getHeader(accessToken, refreshToken),
  })

  if (!res.ok) {
    console.error('error: response not ok', res)
    throw new Error('Impossible de récupérer les archives', { cause: res })
  }
  const institutions = await res.json()
  return institutions as string[]
}
