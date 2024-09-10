import { getArchiveUrl } from '@api'
import { useQuery } from '@tanstack/react-query'
import { getLocalStorageUserAuth } from '@utils/auth'
import { setHeaders } from '@utils/setData'

type ChatArchive = {
  chat_type: string
  id: number
  created_at: string
  updated_at: string
  user_id: number
  chat_name: string
  streams: [
    {
      model_name: string
      mode: string
      query: string
      limit: number
      with_history: boolean
      context: string
      institution: string
      links: string
      temperature: number
      sources: string[]
      should_sids: string[]
      must_not_sids: string[]
      postprocessing: string[]
      id: number
      created_at: string
      updated_at: string
      is_streaming: boolean
      user_id: number
      chat_id: number
      prompt: string
      response: string
      search_sids: string[]
      rag_sources: string[]
      feedback: {
        is_good: boolean
        message: string
        reason: string
        id: number
        user_id: number
        stream_id: number
      }
    },
  ]
}

export function useGetChatArchiveById(chatId: number) {
  return useQuery({
    queryKey: ['getArchive', chatId],
    queryFn: () => fetchChatArchiveById(chatId),
    enabled: !!chatId,
  })
}

const fetchChatArchiveById = async (chatId: number) => {
  const auth = getLocalStorageUserAuth()
  const response = await fetch(`${getArchiveUrl}/${chatId}`, {
    headers: setHeaders(false, auth.access_token, auth.refresh_token),
  })

  if (!response.ok) {
    console.error('error: response not ok', response)
    throw new Error('Network response was not ok', { cause: response })
  }
  const responseData: ChatArchive = await response.json()

  return responseData
}
