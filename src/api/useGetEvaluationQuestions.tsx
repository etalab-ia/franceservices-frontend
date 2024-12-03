import { evaluationsUrl } from '@api'
import { useQuery } from '@tanstack/react-query'

export function useGetEvaluationQuestions() {
  return useQuery({
    queryKey: ['getEvaluationQuestions'],
    queryFn: () => fetchEvaluations(),
    enabled: true,
  })
}

const fetchEvaluations = async (): Promise<string[]> => {
  const authToken = localStorage.getItem('authToken')

  const res = await fetch(`${evaluationsUrl}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    console.error('error: response not ok', res)
    throw new Error('Impossible de récupérer les archives', { cause: res })
  }
  const institutions = await res.json()
  return institutions as string[]
}
