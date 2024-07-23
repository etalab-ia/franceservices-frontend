import { getChunkUrl } from '@api'
import { useQuery } from '@tanstack/react-query'
import type { Sheet } from '@types'

export function useGetChunk(
  chunkHash: string,
  accessToken: string,
  refreshToken: string,
) {
  return useQuery({
    queryKey: ['getChunk', chunkHash],
    queryFn: (c) => fetchChunk(chunkHash, accessToken, refreshToken),
    enabled: true,
  })
}

const fetchChunk = async (
  chunkHash: string,
  accessToken: string,
  refreshToken: string,
): Promise<Sheet> => {
  const res = await fetch(`${getChunkUrl}/${chunkHash}`, {
    method: 'GET',
    credentials: 'include',
    headers: getHeader(accessToken, refreshToken),
  })

  if (!res.ok) {
    console.error('error: response not ok', res)
    throw new Error('Impossible de récupérer les archives', { cause: res })
  }
  const chunk = await res.json()
  return chunk as Sheet
}
