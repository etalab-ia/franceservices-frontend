import { chatUrl, indexesUrl } from '@api'
import Button from '@codegouvfr/react-dsfr/Button'
import type { RootState } from '@types'
import { CurrQuestionContext } from '@utils/context/questionContext'
import { generateStream, useFetch } from '@utils/hooks'
import { getIndexes, setHeaders } from '@utils/setData'
import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/*
 **
 */
export function UserMessage({ setGenerate, questionInput, setQuestionInput }) {
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
        nextMessage: { text: stream.historyStream, sender: 'agent', chunks: user.chunks },
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
      nextChatId: chatId, // Use the updated chatId here
    })

    dispatch({ type: 'RESET_STREAM_HISTORY' })

    setQuestionInput('')
    setGenerate(true)
  }

  /*

	**

	*/
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
      'chunks',
      user.question.limit,
      JSON.stringify(user.streamId),
      indexesUrl
    )
  }, [user.streamId])
  const handleRenderInput = (params) => {
    const newParams = { maxLength: 800 }
    const updatedParams = { ...params, ...newParams }

    return <input {...updatedParams} disabled={stream.isStreaming} />
  }
  function handleKeyDown(e: any) {
    if (e.key === 'Enter' && questionInput !== '' && !stream.isStreaming) {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div className=" sticky bottom-0 left-0 right-0 z-10 fr-col-12 fr-col-md-9 fr-background-default--grey fr-py-1w md:fr-py-3w ">
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
      ></textarea>
      <div className="flex justify-end">
        <Button
          onClick={handleClick}
          disabled={questionInput.trim() === '' || stream.isStreaming}
          className="fr-btn align-end"
          title="Rechercher"
          iconId="fr-icon-search-line"
        >
          Rechercher
        </Button>
      </div>
      {/*       <SearchBar
        label="Poser votre question"
        className="w-5/6"
        onButtonClick={handleClick}
        //@ts-expect-error
        onChange={handleChange}
        renderInput={handleRenderInput}
        value={questionInput}
      /> */}
    </div>
  )
}
