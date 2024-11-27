import { getArchiveUrl, getChunksUrl } from '@api'
import { useQuery } from '@tanstack/react-query'
import { setHeaders } from '@utils/setData'

export function useGetArchive(chatId: number) {
  return useQuery({
    queryKey: ['getArchive', chatId],
    queryFn: () => fetchArchive(chatId),
    enabled: !!chatId,
  })
}

const fetchArchive = async (chatId: number) => {
  const response = await fetch(`${getArchiveUrl}/${chatId}`, {
    headers: setHeaders(false),
  })
  if (!response.ok) {
    console.error('error: response not ok', response)
    throw new Error('Network response was not ok', { cause: response })
  }
  const responseData: ArchiveType = await response.json()
  const streamsHistory = await Promise.all(
    responseData.streams.map(async (stream) => {
      const chunksResponse = stream.rag_sources
        ? await fetch(getChunksUrl, {
            method: 'POST',
            headers: setHeaders(false),

            body: JSON.stringify({ uids: stream.rag_sources }),
          }).then((res) => res.json())
        : []
      return {
        query: stream.query,
        chunks: chunksResponse,
        response: stream.response,
        operators: responseData.operators,
        themes: responseData.themes,
        webservices: chunksResponse[0]?.web_services
          ? chunksResponse[0]?.web_services.slice(0, 3)
          : [],
      }
    }),
  )
  return streamsHistory
}

type ArchiveType = {
  chat_type: string
  operators: string
  themes: string[]
  id: number
  created_at: string
  updated_at: string
  user_id: string
  chat_name: string
  stream_count: number
  streams: any[]
}
