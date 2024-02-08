import { ArchiveType, RootState, User } from 'types'
import { GlobalColContainer } from '../Global/GlobalColContainer'
import { MeetingQR } from './MeetingQR'
import { MeetingStream } from './MeetingStream'
import { useContext, useEffect, useState, KeyboardEvent, ChangeEventHandler } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { generateStream } from '../../utils/hooks'
import { CurrQuestionContext } from '../../utils/context/questionContext'
import { current } from '@reduxjs/toolkit'

/*****************************************************************************************************
	
	COMPONENTS:

		**	MeetingStream: display stream & chunks from GET /indexes chunks used to generate response

		**	MeetingQR: set related questions cards from sheets informations

 *****************************************************************************************************/

export function MeetingMainResponse({ archive }: { archive: ArchiveType | undefined }) {
  const [question, setQuestion] = useState('')
  const stream = useSelector((state: RootState) => state.stream)
  const user = useSelector((state: RootState) => state.user)
  const { currQuestion, updateCurrQuestion } = useContext(CurrQuestionContext)

  const [generateStream, setGenerateStream] = useState(false)
  const [questionHistory, setQuestionHistory] = useState<QuestionHistory>([])
  return (
    <GlobalColContainer>
      <MeetingStream archive={archive} />
      {!archive && (
        /*        <MeetingAdditionnalQuestion
          question={question}
          setQuestion={setQuestion}
          questionHistory={questionHistory}
          setQuestionHistory={setQuestionHistory}
        /> */
        <UserMessage
          setGenerate={setGenerateStream}
          chatType={'meeting'}
          questionInput={question}
          setQuestionInput={setQuestion}
        />
      )}
      <MeetingQR archive={archive} setQuestion={setQuestion} />
    </GlobalColContainer>
  )
}

/* function MeetingAdditionnalQuestion({
  question,
  setQuestion,
  questionHistory,
  setQuestionHistory,
}: {
  question: string
  setQuestion: React.Dispatch<React.SetStateAction<string>>
  questionHistory: QuestionHistory
  setQuestionHistory: React.Dispatch<React.SetStateAction<QuestionHistory>>
}) {
  return (
    <div className="fr-search-bar" id="header-search" role="search">
      <label className="fr-label">Recherche</label>
      <input
        className="fr-input"
        placeholder="Poser une nouvelle question"
        type="search"
        name="search-784-input"
        onChange={(e) => setQuestion(e.target.value)}
        value={question}
      />
      <button
        disabled={question === ''}
        className="fr-btn"
        title="Rechercher"
        //  onClick={() => {handleNewQuestion(question)}} 
      >
        Rechercher
      </button>
    </div>
  )
}
 */
export function UserMessage({ setGenerate, chatType, questionInput, setQuestionInput }) {
  const stream = useSelector((state: RootState) => state.stream)
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  //const [questionInput, setQuestionInput] = useState('')
  const { currQuestion, updateCurrQuestion } = useContext(CurrQuestionContext)

  const handleChange = (e) => {
    e.preventDefault()

    setQuestionInput(e.target.value)
  }

  const handleSubmit = async () => {
    updateCurrQuestion({ ...currQuestion, query: questionInput })
    dispatch({
      type: 'ADD_HISTORY',
      newItem: {
        query: currQuestion.query,
        response: stream.historyStream[0],
        sheets: user.sheets,
        chunks: user.chunks,
        usefulInfo: user.webservices,
      },
    })
    dispatch({
      type: 'SET_USER_QUERY',
      nextUserQuery: questionInput,
      nextChatId: user.chatId,
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
    setQuestionInput('')
  }

  useEffect(() => {
    // console.log('user.question: generate', user.question, user.chatId)
    if (!user.question.query.length || !user.chatId) return
    //generateStream(user.question, dispatch, user.chatId, false)
    dispatch({ type: 'RESET_FEEDBACK' })
  }, [user.question])

  /*   if (user.question.query.length && user.chatId)
  {
    generateStream(user.question, dispatch, user.chatId, false)
    dispatch({ type: 'RESET_FEEDBACK' })

  } */
  const handleRenderInput = (params) => {
    const newParams = { maxLength: 800 }
    const updatedParams = { ...params, ...newParams }

    return <input {...updatedParams} />
  }
  function handleKeyDown(e: any) {
    if (e.key === 'Enter' && questionInput !== '' && !stream.isStreaming) {
      handleSubmit()
    }
  }
  return (
    <div className="fr-search-bar" id="header-search" role="search">
      <label className="fr-label">Recherche</label>
      <input
        className="fr-input"
        placeholder="Poser une nouvelle question"
        type="search"
        name="search-784-input"
        onChange={handleChange}
        value={questionInput}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSubmit}
        disabled={questionInput === '' || stream.isStreaming}
        className="fr-btn"
        title="Rechercher"
      >
        Rechercher
      </button>
    </div>
  )
}

function handleNewQuestion(
  question: string,
  questionHistory: QuestionHistory,
  setQuestionHistory: React.Dispatch<React.SetStateAction<QuestionHistory>>
) {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const { currQuestion, updateCurrQuestion } = useContext(CurrQuestionContext)

  //Add current data to histoy
  setQuestionHistory([...questionHistory, { user: user, response: 'test' }])
  questionHistory.map((p) => {})
  /*  dispatch({
    type: 'SET_USER_QUERY',
    nextUserQuery: question,
    nextChatId: user.chatId,
  }) */
  updateCurrQuestion({ ...currQuestion, query: question })
  dispatch({
    type: '',
    nextMessage: { text: question, sender: 'user' },
  })
  generateStream(currQuestion, dispatch, user.chatId, false)
  return
}

type QuestionHistory = {
  user: User
  response: string
}[]
