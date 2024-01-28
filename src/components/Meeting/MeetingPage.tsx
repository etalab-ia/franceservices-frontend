import { GlobalRowContainer } from "../Global/GlobalRowContainer"
import { GlobalDiv } from "../Global/GlobalDiv"
import { GlobalSubtitle } from "../Global/GlobalSubtitle"
import { meetingAppointmentInformations, meetingAppointmentTitle } from "../../constants/meeting"
import { GlobalParagraph } from "../Global/GlobalParagraph"
import { MeetingResponse } from "./MeetingResponse"
import { MeetingEditQuestion } from "./MeetingEditQuestion"
import { GlobalTitle } from "../Global/GlobalTitle"
import { CurrQuestionContext } from "../../utils/context/questionContext"
import { useContext, useEffect, useState } from "react"
import { ArchiveType } from "types"
import { rmContextFromQuestion } from "../../utils/setData"

/*****************************************************************************************************
	
	GENERAL: display:
		- main informations: user prompt, stream response, response explanation / chunks
		- additional informations: sheets, related questions, webservices

	-----------------------------------------------------------------------------------------------

	**	archive: meeting page is not editable when the user is on an archive

 *****************************************************************************************************/

export function MeetingPage({
	setGenerate,
	archive,
}: {
	setGenerate: React.Dispatch<React.SetStateAction<boolean>> | undefined
	archive?: ArchiveType
}) {
	const { currQuestion } = useContext(CurrQuestionContext)
	const [query, setQuery] = archive ? useState(archive.query) : useState<string>(currQuestion.query)

	useEffect(() => {
		rmContextFromQuestion(query, setQuery)
	}, [])

	return (
		<GlobalRowContainer extraClass="fr-grid-row--center">
// @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
// @ts-expect-error TS(2304): Cannot find name 'children'.
			<GlobalDiv>
				<GlobalTitle>{meetingAppointmentTitle}</GlobalTitle>
				<GlobalSubtitle>{meetingAppointmentInformations}</GlobalSubtitle>
// @ts-expect-error TS(2304) FIXME: Cannot find name 'childr'.
// @ts-expect-error TS(2304): Cannot find name 'childr'.
// @ts-expect-error TS(2741): Property 'extraClass' is missing in type '{ childr... Remove this comment to see the full error message
// @ts-expect-error TS(2304): Cannot find name 'childr'.
// @ts-expect-error TS(2741) FIXME: Property 'extraClass' is missing in type '{ childr... Remove this comment to see the full error message
// @ts-expect-error TS(2741): Property 'extraClass' is missing in type '{ childr... Remove this comment to see the full error message
				<GlobalParagraph>{query}</GlobalParagraph>
				{!archive ? (
					<MeetingEditQuestion setGenerate={setGenerate} />
				) : (
					<div className="fr-pt-2w"></div>
				)}
				<MeetingResponse archive={archive} />
			</GlobalDiv>
		</GlobalRowContainer>
	)
}
