import { getChunksUrl, getStreamsUrl } from '@api'
import { useQuery } from '@tanstack/react-query'
import type { UserHistory } from '@types'

export function useGetArchive(chatId: number) {
  return useQuery({
    queryKey: ['getArchive', chatId],
    queryFn: () => fetchArchive(chatId),
    enabled: !!chatId,
  })
}

const fetchArchive = async (chatId: number) => {
  const authToken = localStorage.getItem('authToken')
  const response = await fetch(`${getStreamsUrl}/${chatId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    console.error('error: response not ok', response)
    throw new Error('Network response was not ok', { cause: response })
  }
  const responseData = await response.json()

  const streamsHistory: UserHistory[] = await Promise.all(
    responseData.streams.map(async (stream) => {
      const chunksResponse = stream.rag_sources
        ? await fetch(getChunksUrl, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uids: stream.rag_sources }),
          }).then((res) => res.json())
        : []

      return {
        query: stream.query,
        chunks: chunksResponse,
        response: stream.response,
        webservices: [],
      }
    })
  )

  return streamsHistory
}
