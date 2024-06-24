import { useParams } from 'react-router-dom'
import { MeetingOutputs } from '../components/Meeting/MeetingOutputs'
import { useDispatch } from 'react-redux'

export function Meeting() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  if (id)
    dispatch({
      type: 'SET_CHAT_ID',
      nextChatId: Number(id),
    })
  return (
    <div className="fr-container fr-my-3w">
      <MeetingOutputs chatId={id ? Number(id) : undefined} />
    </div>
  )
}
