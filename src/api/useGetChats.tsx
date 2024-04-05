import { getChatsUrl } from '@api'
import { useQuery } from '@tanstack/react-query'
import type { Chat } from '@types'

export function useGetChats() {
  return useQuery({
    queryKey: ['getChats'],
    queryFn: () => fetchChats(),
    enabled: true,
  })
}

const fetchChats = async (): Promise<Chat[]> => {
  const authToken = localStorage.getItem('authToken')

  const res = await fetch(`${getChatsUrl}`, {
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
  const chats = await res.json()
  return chats.map((item: ChatInfos) => ({
    name: item.chat_name,
    type: item.chat_type,
    creationDate: item.created_at,
    updatedDate: item.updated_at,
    id: item.id,
    userId: item.user_id,
  }))
}

type ChatInfos = {
  chat_type: string
  id: number
  chat_name: string
  created_at: string
  updated_at: string
  user_id: number
}
