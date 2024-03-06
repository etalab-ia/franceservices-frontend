import { useQuery } from '@tanstack/react-query'
import { UserHistory } from '@types'
import * as v from 'valibot'

const apiUrl = `${import.meta.env.VITE_API_URL}/api/v2`

export const apiBase = apiUrl
export const streamUrl = apiBase + '/stream'
export const chatUrl = apiBase + '/chat'
export const getChatsUrl = apiBase + '/chats?desc=true'
export const getStreamsUrl = apiBase + '/chat/archive'
export const indexesUrl = apiBase + '/indexes'
export const institutionsUrl = apiBase + '/institutions'
export const signinUrl = apiBase + '/sign_in'
export const signoutUrl = apiBase + '/sign_out'
export const resetPasswordMailUrl = apiBase + '/send_reset_password_email'
export const resetPasswordUrl = apiBase + '/reset_password'
export const userUrl = apiBase + '/user/me'
export const contactUrl = apiBase + '/user/contact'
export const feedbackUrl = apiBase + '/feedback/add'
export const getSheetsUrl = apiBase + '/get_sheets'
export const getChunksUrl = apiBase + '/get_chunks'
export const importUrl =
  'https://opendata.plus.transformation.gouv.fr/api/explore/v2.1/catalog/datasets/export-expa-c-riences/records?limit=5'

const AnySchema = v.any() // any

export function useAlbert() {
  const authToken = localStorage.getItem('authToken')
  const getArchive = (chatId: number) =>
    useQuery({
      queryKey: ['getArchive', chatId],
      queryFn: () => fetchNewArchive(chatId),
      enabled: !!chatId,
    })

  return { getArchive }
}

const fetchNewArchive = async (chatId: number): Promise<any> => {
  const authToken = localStorage.getItem('authToken')
  const response = await fetch(`${apiBase}/chat/archive/${chatId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  console.log('response', response)
  return response
}

const fetchArchive = async (chatId: number): Promise<UserHistory[]> => {
  const authToken = localStorage.getItem('authToken')
  const response = await fetch(`${getStreamsUrl}/${chatId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
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
