import { useEffect, useRef, useState } from 'react'
import { Chat } from '../../../types'
import { useApiUrls } from '../../constants/api'
import { useFetch } from '../../utils/hooks'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { Print } from '../Print/Print'
import { ArchiveContainer } from './ArchiveContainer'

type ChatInfos = {
  chat_name: string
  chat_type: string
  created_at: string
  id: number
  updated_at: string
  user_id: number
}

export function DisplayArchiveTabs() {
  const [chatsId, setChatsId] = useState<Chat[]>([]) // All previous user's chat
  const [archiveTab, setArchiveTab] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const token = localStorage.getItem('authToken')
  const { getChatsUrl } = useApiUrls()

  const getChatsId = async () => {
    const res: ChatInfos[] = await useFetch(getChatsUrl, 'GET', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: null,
    })
    res.map((item) => {
      const newItem = {
        name: item.chat_name,
        type: item.chat_type,
        creationDate: item.created_at,
        updatedDate: item.updated_at,
        id: item.id,
        userId: item.user_id,
      }
      setChatsId((prevState) => [...prevState, newItem])
    })
  }

  useEffect(() => {
    getChatsId()
  }, [])

  return (
    <div className="fr-container">
      {archiveTab === null ? (
        <ArchiveContainer chatsId={chatsId} setArchiveTab={setArchiveTab} />
      ) : (
        <Print
          ref={ref}
          selectedChat={chatsId[archiveTab]}
          setArchiveTab={setArchiveTab}
        />
      )}
    </div>
  )
}
