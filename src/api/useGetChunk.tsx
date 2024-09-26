import { getChunkUrl } from '@api'
import { useQuery } from '@tanstack/react-query'
import type { Chat, Chunk } from '@types'
import { getLocalStorageUserAuth } from '@utils/auth'
import { setHeaders } from '@utils/setData'

export function useGetChunk(chunkHash: string) {
  return useQuery({
    queryKey: ['getChunk', chunkHash],
    queryFn: (c) => fetchChunk(chunkHash),
    enabled: true,
  })
}

const fetchChunk = async (chunkHash: string): Promise<Chunk> => {
  const auth = getLocalStorageUserAuth()

  const res = await fetch(`${getChunkUrl}/${chunkHash}`, {
    method: 'GET',
    credentials: 'include',
    headers: setHeaders(false, auth.user?.access_token, auth.user.refresh_token),
  })

  if (!res.ok) {
    console.error('error: response not ok', res)
    throw new Error('Impossible de récupérer les archives', { cause: res })
  }
  const chunk = await res.json()
  return chunk as Chunk
}
