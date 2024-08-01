import { getArchiveUrl } from '@api'
import { useQuery } from '@tanstack/react-query'

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
  const authToken = localStorage.getItem('authToken')
  const response = await fetch(`${getArchiveUrl}/${chatId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    console.error('error: response not ok', response)
    throw new Error('Network response was not ok', { cause: response })
  }
  const responseData: ChatArchive = await response.json()

  return responseData
}
