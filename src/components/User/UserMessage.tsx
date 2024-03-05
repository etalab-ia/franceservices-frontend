import { SearchBar } from '@codegouvfr/react-dsfr/SearchBar'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@types'
import { chatUrl } from '../../constants/api'
import { CurrQuestionContext } from '../../utils/context/questionContext'
import { generateStream, useFetch } from '../../utils/hooks'
import { setHeaders } from '../../utils/setData'

/*
 **
 */
export function UserMessage({ setGenerate }) {
  const stream = useSelector((state: RootState) => state.stream)
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const [questionInput, setQuestionInput] = useState('')

  const { currQuestion, updateCurrQuestion } = useContext(CurrQuestionContext)

  const handleChange = (e) => {
    e.preventDefault()

    setQuestionInput(e.target.value)
  }

  const handleClick = async () => {
    updateCurrQuestion({ ...currQuestion, query: questionInput })
    const headers = setHeaders(false)
    const chat_data = { chat_type: 'qa' }
    const chat = await useFetch(chatUrl, 'POST', {
      data: JSON.stringify(chat_data),
      headers,
    })
    dispatch({ type: 'SET_CHAT_ID', nextChatId: chat.id })
    dispatch({
      type: 'SET_USER_QUERY',
      nextUserQuery: questionInput,
      nextChatId: chat.id,
    })
    stream.historyStream.length &&
      dispatch({
        type: 'SET_MESSAGES',
        nextMessage: { text: stream.historyStream, sender: 'agent' },
      })
    dispatch({ type: 'RESET_STREAM_HISTORY' })
    dispatch({
      type: 'SET_MESSAGES',
      nextMessage: { text: questionInput, sender: 'user' },
    })
    setGenerate(true)
  }

  /*

	**

	*/
  useEffect(() => {
    if (!user.question.query.length || !user.chatId) return

    generateStream(user.question, dispatch, user.chatId, true)
    dispatch({ type: 'RESET_FEEDBACK' })
  }, [user.question])

  const handleRenderInput = (params) => {
    const newParams = { maxLength: 800 }
    const updatedParams = { ...params, ...newParams }

    return <input {...updatedParams} />
  }

  return (
    <div className="flex justify-center">
      <SearchBar
        label="Poser votre question"
        className="w-5/6"
        onButtonClick={handleClick}
        //@ts-expect-error
        onChange={handleChange}
        renderInput={handleRenderInput}
      />
    </div>
  )
}
