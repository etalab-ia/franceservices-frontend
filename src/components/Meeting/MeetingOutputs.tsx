import { useContext, useEffect, useState } from 'react'
import { ArchiveType } from 'types'
import {
  meetingAppointmentInformations,
  meetingAppointmentTitle,
} from '../../constants/meeting'
import { CurrQuestionContext } from '../../utils/context/questionContext'
import { rmContextFromQuestion } from '../../utils/setData'
import { GlobalParagraph } from '../Global/GlobalParagraph'
import { GlobalSubtitle } from '../Global/GlobalSubtitle'
import { GlobalTitle } from '../Global/GlobalTitle'
import { MeetingEditQuestion } from './MeetingEditQuestion'
import { MeetingResponse } from './MeetingResponse'

/*****************************************************************************************************
	Displays Albert's response and the modify button	

	GENERAL: display:
		- main informations: user prompt, stream response, response explanation / chunks
		- additional informations: sheets, related questions, webservices

	-----------------------------------------------------------------------------------------------

	**	archive: meeting page is not editable when the user is on an archive

 *****************************************************************************************************/

export function MeetingOutputs({
  setGenerate,
  archive,
}: {
  setGenerate: React.Dispatch<React.SetStateAction<boolean>> | undefined
  archive?: ArchiveType
}) {
  const { currQuestion } = useContext(CurrQuestionContext)
  const [query, setQuery] = archive
    ? useState(archive.query)
    : useState<string>(currQuestion.query)

  useEffect(() => {
    rmContextFromQuestion(query, setQuery)
  }, [])

  return (
    <div className="ft-container">
      <GlobalTitle>{meetingAppointmentTitle}</GlobalTitle>
      <GlobalSubtitle>{meetingAppointmentInformations}</GlobalSubtitle>
      <GlobalParagraph>{query}</GlobalParagraph>
      {!archive ? (
        <MeetingEditQuestion setGenerate={setGenerate} />
      ) : (
        <div className="fr-container fr-pt-2w "></div>
      )}
      <MeetingResponse archive={archive} />
    </div>
  )
}
