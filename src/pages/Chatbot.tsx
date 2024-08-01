import { CurrQuestionContext } from '@utils/context/questionContext'
import { emitCloseStream } from '@utils/eventsEmitter'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { DisplayChatTab } from '../components/Chat/DisplayChatTab'
import { InitialQuestion } from '../types'

// TODO WHEN BACK IS READY: change archive type
export function Chatbot() {
  const dispatch = useDispatch()
  const [currQuestion, setCurrQuestion] = useState(InitialQuestion)

  const updateCurrQuestion = (newQuestion) => {
    setCurrQuestion(newQuestion)
  }

  useEffect(() => {
    emitCloseStream()
    dispatch({ type: 'SET_CHAT_ID', nextChatId: 0 })
    dispatch({ type: 'SET_STREAM_ID', nextChatId: 0 })
    return () => {
      emitCloseStream()
      dispatch({ type: 'RESET_USER' })
    }
  }, [])

  return (
    <CurrQuestionContext.Provider value={{ currQuestion, updateCurrQuestion }}>
      <DisplayChatTab />
    </CurrQuestionContext.Provider>
  )
}
