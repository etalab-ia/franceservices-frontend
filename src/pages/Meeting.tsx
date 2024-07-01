import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { MeetingOutputs } from '../components/Meeting/MeetingOutputs'

export function Meeting() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      dispatch({
        type: 'SET_CHAT_ID',
        nextChatId: Number(id),
      })
    }
  }, [id, dispatch])

  return (
    <div className="fr-container fr-mt-3w">
      <MeetingOutputs chatId={id ? Number(id) : undefined} />
    </div>
  )
}
