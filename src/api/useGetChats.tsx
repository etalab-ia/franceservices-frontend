import { getChatsUrl } from '@api'
import { useQuery } from '@tanstack/react-query'
import type { Chat } from '@types'
import { useInfiniteQuery } from '@tanstack/react-query'

// Get all user chats
export function useGetAllChats() {
  return useQuery({
    queryKey: ['getAllChats'],
    queryFn: () => fetchAllChats(),
    enabled: true,
  })
}

const fetchAllChats = async (): Promise<Chat[]> => {
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

const fetchChats = async ({
  pageParam = 0,
}): Promise<{ chats: Chat[]; nextPage: number | null }> => {
  const authToken = localStorage.getItem('authToken')
  const res = await fetch(`${getChatsUrl}?skip=${pageParam}&limit=10&desc=true`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    console.error('error: response not ok', res)
    throw new Error('Impossible de récupérer les chats', { cause: res })
  }

  const chats = await res.json()
  return {
    chats: chats.map((item: ChatInfos) => ({
      name: item.chat_name,
      type: item.chat_type,
      creationDate: item.created_at,
      updatedDate: item.updated_at,
      id: item.id,
      userId: item.user_id,
    })),
    nextPage: chats.length === 10 ? pageParam + 10 : null,
  }
}

type ChatInfos = {
  chat_type: string
  id: number
  chat_name: string
  created_at: string
  updated_at: string
  user_id: number
}

export function useGetChats() {
  return useInfiniteQuery({
    queryKey: ['getChats'],
    queryFn: fetchChats,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? null,
    initialPageParam: 0,
  })
}
