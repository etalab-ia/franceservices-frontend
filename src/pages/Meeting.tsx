import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InitialQuestion, RootState, MeetingInputContext } from '../types'
import { MeetingInputs } from '../components/Meeting/MeetingInputs'
import { MeetingOutputs } from '../components/Meeting/MeetingOutputs'
import { CurrQuestionContext } from '@utils/context/questionContext'
import { emitCloseStream } from '@utils/eventsEmitter'

/*****************************************************************************************************
	
	VARIABLES:
	
	**	generate: to determine whether the user is in the description or stream phase
			true: user entered prompt informations & click on generate button
			false:
				- user has just arrived on the meeting page
				- OR clicked on the modify button. If so, emitCloseStream is called
	
	**	currQuestion: description provided by the user
	**	context: additional informations provided by the user: administrations and themes tags

 *****************************************************************************************************/

export function Meeting() {
  const [generate, setGenerate] = useState(false)
  const [currQuestion, setCurrQuestion] = useState(InitialQuestion)
  const stream = useSelector((state: RootState) => state.stream)

  const updateCurrQuestion = (newQuestion) => {
    setCurrQuestion(newQuestion)
  }

  return (
    <CurrQuestionContext.Provider value={{ currQuestion, updateCurrQuestion }}>
      <div className="fr-container fr-my-3w">
        {generate ? <MeetingOutputs /> : <MeetingInputs setGenerate={setGenerate} />}
      </div>
    </CurrQuestionContext.Provider>
  )
}
