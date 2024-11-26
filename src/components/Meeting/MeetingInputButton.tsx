import { chatUrl } from '@api'
import Button from '@codegouvfr/react-dsfr/Button'
import { meetingGenerateButton } from '@constants/meeting'
import type { MeetingInputContext, RootState } from '@types'
import { CurrQuestionContext } from '@utils/context/questionContext'
import { useFetch } from '@utils/hooks'
import { setHeaders } from '@utils/setData'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/**
	Button to send user query to /stream endpoint & switch to meeting stream page
    FUNCTIONS:

      handleClick: setGenerate to true to switch to meeting stream page + create new chat id for meeting
      context: 

 **/

export function MeetingInputButton({
  setGenerate,
  context,
}: {
  setGenerate: React.Dispatch<React.SetStateAction<boolean>>
  context: MeetingInputContext
}) {
  const dispatch = useDispatch()
  const stream = useSelector((state: RootState) => state.stream)

  const { currQuestion, updateCurrQuestion } = useContext(CurrQuestionContext)
  const isDisable =
    !currQuestion.query || (currQuestion.query && currQuestion.query.length === 0)

  const handleClick = async () => {
    const headers = setHeaders(false)
    const chat = await useFetch(chatUrl, 'POST', {
      data: JSON.stringify({ chat_type: 'meeting' }),
      headers,
    })
    if (chat?.id && !stream.isStreaming) {
      dispatch({ type: 'SET_USER_QUERY', nextUserQuery: currQuestion.query })
      updateCurrQuestion({
        ...currQuestion,
        query: currQuestion.query,
      })
      dispatch({ type: 'SET_CHAT_ID', nextChatId: chat.id })

      setGenerate(true)
    }
  }

  return (
    <Button
      className="w-full flex justify-center fr-mt-3w"
      onClick={handleClick}
      disabled={isDisable}
    >
      {meetingGenerateButton}
    </Button>
  )
}
