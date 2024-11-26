import { useQuery } from '@tanstack/react-query'
import { setHeaders } from '../utils/setData'

export function useGetOrganizations() {
  return useQuery({
    queryKey: ['getOrganizations'],
    queryFn: () => fetchOrganizations(),
    enabled: true,
  })
}

const fetchOrganizations = async (): Promise<string[]> => {
  const res = await fetch(`${'/organizations/mfs'}`, {
    method: 'GET',
    headers: setHeaders(false),
  })

  if (!res.ok) {
    console.error('error: response not ok', res)
    throw new Error('Impossible de récupérer les maisons france service', { cause: res })
  }
  const institutions = await res.json()
  console.log(institutions)
  return institutions as string[]
}
