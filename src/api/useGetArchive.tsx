import { useQuery } from '@tanstack/react-query'
import { getChunksUrl, getArchiveUrl } from '@api'
import type { UserHistory } from '@types'
import { getLocalStorageUserAuth } from '@utils/auth'
import { setHeaders } from '@utils/setData'

export function useGetArchive(chatId: number) {
  return useQuery({
    queryKey: ['getArchive', chatId],
    queryFn: () => fetchArchive(chatId),
    enabled: !!chatId,
  })
}

const fetchArchive = async (chatId: number) => {
  const auth = getLocalStorageUserAuth()
  const response = await fetch(`${getArchiveUrl}/${chatId}`, {
    headers: setHeaders(false, auth.access_token, auth.refresh_token),
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
            headers: setHeaders(false, auth.access_token, auth.refresh_token),

            body: JSON.stringify({ uids: stream.rag_sources }),
          }).then((res) => res.json())
        : []
      return {
        query: stream.query,
        chunks: chunksResponse,
        response: stream.response,
        webservices: chunksResponse[0]?.web_services
          ? chunksResponse[0]?.web_services.slice(0, 3)
          : [],
      }
    }),
  )
  return streamsHistory
}
