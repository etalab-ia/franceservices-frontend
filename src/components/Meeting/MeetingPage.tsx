import { GlobalSubtitle } from "../Global/GlobalSubtitle"
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
		<div className="ft-container">
			<GlobalTitle>Fiche rendez-vous</GlobalTitle>
			<GlobalSubtitle>Informations sur le rendez-vous</GlobalSubtitle>
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
