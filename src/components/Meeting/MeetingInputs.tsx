import type { MeetingInputContext } from '@types'
import { CurrQuestionContext } from '@utils/context/questionContext'
import { updateQuestion } from '@utils/setData'
import { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { GlobalDiv } from '../Global/GlobalDiv'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { MeetingInputButton } from './MeetingInputButton'
import { MeetingInputFields } from './MeetingInputFields'

/*****************************************************************************************************
	
	VARIABLES:

	**	generate: to determine whether the user is in the description or stream phase
			true: user entered prompt informations & click on generate button
			false:
				- user has just arrived on the meeting page
				- OR clicked on the modify button. If so, emitCloseStream is called
	
	**	currQuestion: description provided by the user
	**	context: additional informations provided by the user: administrations and themes tags

	-------------------------------------------------------------------------------------------------

	COMPONENTS:

	**	MeetingInputFields: set current question & context (administrations / themes) from user input

	**	MeetingInputButton: setGenerate to true to switch to meeting stream page onClick
			! Meeting generation button is disable when current question is empty

 *****************************************************************************************************/

export function MeetingInputs({
  setGenerate,
}: {
  setGenerate: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [context, setContext] = useState<MeetingInputContext>({
    administrations: [],
    themes: [],
  })
  const dispatch = useDispatch()
  const { currQuestion, updateCurrQuestion } = useContext(CurrQuestionContext)
  //TODO: REMOVE USEEFFECT
  useEffect(() => {
    currQuestion.query && updateQuestion(currQuestion, updateCurrQuestion)
    dispatch({ type: 'RESET_USER' })
  }, [])

  return (
    <div style={{ width: '100%', flex: 1, flexGrow: 1, backgroundColor: '' }}>
      <MeetingInputFields context={context} setContext={setContext} />
      <MeetingInputButton setGenerate={setGenerate} context={context} />
    </div>
  )
}
