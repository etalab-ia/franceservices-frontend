import { getArchiveUrl, getChunksUrl } from '@api'
import { useQuery } from '@tanstack/react-query'
import type { UserHistory } from '@types'
import getHeader from './utils/getHeader'

export function useGetArchive(chatId: number, accessToken: string, refreshToken: string) {
  return useQuery({
    queryKey: ['getArchive', chatId],
    queryFn: () => fetchArchive(chatId, accessToken, refreshToken),
    enabled: !!chatId,
  })
}

const fetchArchive = async (
  chatId: number,
  accessToken: string,
  refreshToken: string,
) => {
  const response = await fetch(`${getArchiveUrl}/${chatId}`, {
    headers: getHeader(accessToken, refreshToken),
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
            headers: getHeader(accessToken, refreshToken),
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
