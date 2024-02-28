import { useContext, useEffect, useState } from 'react'
import { CurrQuestionContext } from '../../utils/context/questionContext'
import { updateQuestion } from '../../utils/setData'
import { GlobalDiv } from '../Global/GlobalDiv'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { MeetingInputFields } from './MeetingInputFields'
import { MeetingInputButton } from './MeetingInputButton'
import { MeetingInputContext } from 'types'

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
  generate,
}: {
  setGenerate: React.Dispatch<React.SetStateAction<boolean>>
  generate: boolean
}) {
  const [context, setContext] = useState<MeetingInputContext>({
    administrations: [],
    themes: [],
  })
  const { currQuestion, updateCurrQuestion } = useContext(CurrQuestionContext)
  //TODO: REMOVE USEEFFECT
  useEffect(() => {
    currQuestion.query && updateQuestion(currQuestion, updateCurrQuestion)
  }, [])

  return (
    <div style={{ width: '100%', flex: 1, flexGrow: 1, backgroundColor: '' }}>
      <MeetingInputFields context={context} setContext={setContext} />
      <MeetingInputButton
        setGenerate={setGenerate}
        context={context}
        generate={generate}
      />
    </div>
  )
}
