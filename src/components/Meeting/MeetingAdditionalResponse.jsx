import { GlobalColContainer } from "../Global/GlobalColContainer"
import { OneThirdScreenWidth } from "../Global/OneThirdScreenWidth"
import { DisplaySheets } from "../Sheets/DisplaySheets"
import { MeetingContacts } from "./MeetingContacts"

/*****************************************************************************************
	
	COMPONENTS:

		**	DisplaySheets: set & display sheets cards from GET /indexes sheets

		**	MeetingContacts: set first webservices from GET /indexes sheets

 *****************************************************************************************/

export function MeetingAdditionalResponse({ currQuestion, archive }) {
	return (
		<OneThirdScreenWidth>
			<DisplaySheets
				currQuestion={currQuestion}
				archiveSheets={archive.sheets}
				archiveAdditionalSheets={archive.additionalSheets}
				archiveWebservices={archive.webservices}
			/>
			<GlobalColContainer>
				<h3 className="text-2xl font-bold fr-pt-3w fr-pb-3w">Liens pratiques</h3>
				<MeetingContacts />
			</GlobalColContainer>
		</OneThirdScreenWidth>
	)
}
