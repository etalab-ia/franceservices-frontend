import { getChatsUrl } from '@api'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import type { Chat } from '@types'
import getHeader from './utils/getHeader'

// Get all user chats
export function useGetAllChats(accessToken: string, refreshToken: string) {
  return useQuery({
    queryKey: ['getAllChats'],
    queryFn: () => fetchAllChats(accessToken, refreshToken),
    enabled: true,
  })
}

const fetchAllChats = async (
  accessToken: string,
  refreshToken: string,
): Promise<Chat[]> => {
  const res = await fetch(`${getChatsUrl}?desc=true`, {
    method: 'GET',
    credentials: 'include',
    headers: getHeader(accessToken, refreshToken),
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

// Get user chats 10 by 10
export function useGetChats(accessToken: string, refreshToken: string) {
  console.log('useGetChats', accessToken)
  return useInfiniteQuery({
    queryKey: ['getChats'],
    queryFn: () => fetchChats({ accessToken, refreshToken }),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? null,
    initialPageParam: 0,
  })
}

const fetchChats = async ({ pageParam = 0, accessToken, refreshToken }) => {
  console.log('fetchChats', accessToken)
  const res = await fetch(
    `${getChatsUrl}?desc=true&skip=${pageParam}&limit=10&desc=true`,
    {
      method: 'GET',
      credentials: 'include',
      headers: getHeader(accessToken, refreshToken),
    },
  )

  if (!res.ok) {
    console.error('error: response not ok', res)
    throw new Error('Impossible de récupérer les chats', { cause: res })
  }

  const chats = await res.json()
  return {
    chats: chats.map((item) => ({
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
