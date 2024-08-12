import { chatUrl, indexesUrl } from '@api'
import Button from '@codegouvfr/react-dsfr/Button'
import type { RootState } from '@types'
import { CurrQuestionContext } from '@utils/context/questionContext'
import { generateStream, useFetch } from '@utils/hooks'
import { getIndexes, setHeaders } from '@utils/setData'
import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/*
 ** The user input
 */
export function UserMessage({ questionInput, setQuestionInput }) {
  const stream = useSelector((state: RootState) => state.stream)
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const { currQuestion, updateCurrQuestion } = useContext(CurrQuestionContext)

  const handleChange = (e) => {
    e.preventDefault()

    setQuestionInput(e.target.value)
  }

  const handleClick = async () => {
    if (stream.historyStream.length) {
      dispatch({
        type: 'SET_MESSAGES',
        nextMessage: {
          text: stream.historyStream,
          sender: 'agent',
          chunks: user.chunks,
        },
      })
    }
    updateCurrQuestion({ ...currQuestion, query: questionInput })
    dispatch({
      type: 'SET_MESSAGES',
      nextMessage: { text: questionInput, sender: 'user' },
    })
    let chatId = user.chatId

    if (user.chatId === 0) {
      const headers = setHeaders(false)
      const chat_data = { chat_type: 'qa' }
      const chat = await useFetch(chatUrl, 'POST', {
        data: JSON.stringify(chat_data),
        headers,
      })
      chatId = chat.id
      dispatch({ type: 'SET_CHAT_ID', nextChatId: chatId })
    }

    dispatch({
      type: 'SET_USER_QUERY',
      nextUserQuery: questionInput,
      nextChatId: chatId,
    })

    dispatch({ type: 'RESET_STREAM_HISTORY' })

    setQuestionInput('')
  }

  useEffect(() => {
    if (!user.question.query.length || !user.chatId) return

    generateStream(user.question, dispatch, user.chatId, true)
  }, [user.question])
  useEffect(() => {
    if (!user.streamId) return
    const data = {
      question: user.question.query,
      must_not_sids: user.question.must_not_sids,
    }
    getIndexes(
      data,
      dispatch,
      user.question.limit,
      JSON.stringify(user.streamId),
      indexesUrl,
    )
  }, [user.streamId])

  function handleKeyDown(e: any) {
    if (e.key === 'Enter' && questionInput !== '' && !stream.isStreaming) {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div className="fr-background-default--grey fr-pb-1w md:fr-pb-3w sticky right-0 bottom-0 left-0 z-10 w-full md:w-[992px]">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-10">
          <textarea
            style={{ minHeight: '10px', overflow: 'hidden' }}
            placeholder="Poser une nouvelle question"
            rows={1}
            onChange={handleChange}
            value={questionInput}
            onKeyDown={handleKeyDown}
            className="fr-input justify-end"
            id="textarea"
            name="textarea"
          />
          <div className="flex justify-end">
            <Button
              onClick={handleClick}
              disabled={questionInput.trim() === '' || stream.isStreaming}
              className="fr-btn align-end"
              title="Rechercher"
            >
              <span className="fr-icon-search-line fr-icon--sm fr-mr-md-1w" />
              {window.innerWidth > 992 ? 'Rechercher' : null}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
