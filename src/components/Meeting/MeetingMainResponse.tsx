import { ArchiveType, RootState, User } from 'types'
import { GlobalColContainer } from '../Global/GlobalColContainer'
import { MeetingQR } from './MeetingQR'
import { MeetingStream } from './MeetingStream'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { generateStream } from 'src/utils/hooks'
import { UserMessage } from '../User/UserMessage'

/*****************************************************************************************************
	The 
	
	COMPONENTS:

		**	MeetingStream: display stream & chunks from GET /indexes chunks used to generate response

		**	MeetingQR: set related questions cards from sheets informations

 *****************************************************************************************************/

export function MeetingMainResponse({ archive }: { archive: ArchiveType | undefined }) {
  const [question, setQuestion] = useState('')
  const stream = useSelector((state: RootState) => state.stream)
  const user = useSelector((state: RootState) => state.user)
  const [generateStream, setGenerateStream] = useState(false)
  const [questionHistory, setQuestionHistory] = useState<QuestionHistory>([])
  console.log('stream: ', stream)
  console.log('user: ', user)
  return (
    <GlobalColContainer>
      <MeetingStream archive={archive} />
      {!archive && (
        /*   <MeetingAdditionnalQuestion question={question} setQuestion={setQuestion} /> */
        <UserMessage setGenerate={setGenerateStream} chatType={'meeting'} />
      )}
      <MeetingQR archive={archive} setQuestion={setQuestion} />
    </GlobalColContainer>
  )
}

function MeetingAdditionnalQuestion({
  question,
  setQuestion,
}: { question: string; setQuestion: React.Dispatch<React.SetStateAction<string>> }) {
  const user = useSelector((state: RootState) => state.user)

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
        /*  onClick={() => {handleNewQuestion(question)}} */
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
  //Add current data to histoy
  setQuestionHistory([...questionHistory])
  //generateStream()
  return
}

type QuestionHistory = {
  user: User
  response: string
}[]
