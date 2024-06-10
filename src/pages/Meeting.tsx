import { MeetingOutputs } from '../components/Meeting/MeetingOutputs'

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
  return (
    <div className="fr-container fr-my-3w">
      <MeetingOutputs />
    </div>
  )
}
