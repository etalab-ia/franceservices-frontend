import { meetingTitle } from '@constants/meeting'
import type { MeetingInputContext } from '@types'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { GlobalTitle } from '../Global/GlobalTitle'
import { MeetingAdditionalInformations } from './MeetingAdditionalInformation'
import { MeetingMainInformations } from './MeetingMainInformations'

/******************************************************************************
	
	COMPONENTS:
	
	**	MeetingMainInformations: set current question / user description

	**	MeetingAdditionalInformations: set context / administrations & themes

 ******************************************************************************/

export function MeetingInputFields({
  context,
  setContext,
}: {
  context: MeetingInputContext
  setContext: React.Dispatch<React.SetStateAction<MeetingInputContext>>
}) {
  return (
    <>
      <GlobalTitle>{meetingTitle}</GlobalTitle>
      <GlobalRowContainer extraClass="fr-grid-row--center">
        <MeetingMainInformations />
        <MeetingAdditionalInformations context={context} setContext={setContext} />
      </GlobalRowContainer>
    </>
  )
}
