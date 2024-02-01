import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { InitialQuestion } from '../../types'
import { DisplayChatTab } from '../components/Chat/DisplayChatTab'
import { GlobalDiv } from '../components/Global/GlobalDiv'
import { GlobalRowContainer } from '../components/Global/GlobalRowContainer'
import { CurrQuestionContext } from '../utils/context/questionContext'
import { emitCloseStream } from '../utils/eventsEmitter'

// TODO WHEN BACK IS READY: change archive type
export function Chatbot({ archive }: { archive: boolean }) {
  const dispatch = useDispatch()
  const [currQuestion, setCurrQuestion] = useState(InitialQuestion)
  const [generate, setGenerate] = useState(false)

  if (!generate) {
    emitCloseStream()
  }

  const updateCurrQuestion = (newQuestion) => {
    setCurrQuestion(newQuestion)
  }

  const handleMount = async () => {
    emitCloseStream()
    dispatch({ type: 'SET_CHAT_ID', nextChatId: 0 })
    dispatch({ type: 'SET_STREAM_ID', nextChatId: 0 })
  }
  useEffect(() => {
    handleMount()
  }, [])

  return (
    <CurrQuestionContext.Provider value={{ currQuestion, updateCurrQuestion }}>
      <div className="ft-container">
        <DisplayChatTab archive={archive} setGenerate={setGenerate} />
      </div>
    </CurrQuestionContext.Provider>
  )
}