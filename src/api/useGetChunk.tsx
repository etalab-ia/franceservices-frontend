import { getChunkUrl } from '@api'
import { useQuery } from '@tanstack/react-query'
import type { Chunk } from '@types'
import { setHeaders } from '@utils/setData'

export function useGetChunk(chunkHash: string) {
  return useQuery({
    queryKey: ['getChunk', chunkHash],
    queryFn: (c) => fetchChunk(chunkHash),
    enabled: true,
  })
}

const fetchChunk = async (chunkHash: string): Promise<Chunk> => {
  const res = await fetch(`${getChunkUrl}/${chunkHash}`, {
    method: 'GET',
    credentials: 'include',
    headers: setHeaders(false),
  })

  if (!res.ok) {
    console.error('error: response not ok', res)
    throw new Error('Impossible de récupérer les archives', { cause: res })
  }
  const chunk = await res.json()
  return chunk as Chunk
}
