import { ArchiveType, RootState } from 'types'
import { GlobalColContainer } from '../Global/GlobalColContainer'
import { MeetingQR } from './MeetingQR'
import { MeetingStream } from './MeetingStream'
import { useState } from 'react'
import { useSelector } from 'react-redux'

/*****************************************************************************************************
	The 
	
	COMPONENTS:

		**	MeetingStream: display stream & chunks from GET /indexes chunks used to generate response

		**	MeetingQR: set related questions cards from sheets informations

 *****************************************************************************************************/

export function MeetingMainResponse({ archive }: { archive: ArchiveType | undefined }) {
  const [question, setQuestion] = useState('')
  const stream = useSelector((state: RootState) => state.stream)
  console.log('stream', stream)
  return (
    <GlobalColContainer>
      <MeetingStream archive={archive} />
      {!archive && (
        <MeetingAdditionnalQuestion question={question} setQuestion={setQuestion} />
      )}
      <MeetingQR archive={archive} setQuestion={setQuestion} />
    </GlobalColContainer>
  )
}

function MeetingAdditionnalQuestion({
  question,
  setQuestion,
}: { question: string; setQuestion: React.Dispatch<React.SetStateAction<string>> }) {
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
      <button disabled={question === ''} className="fr-btn" title="Rechercher">
        Rechercher
      </button>
    </div>
  )
}
