import { ArchiveType } from "types"
import { GlobalColContainer } from "../Global/GlobalColContainer"
import { OneThirdScreenWidth } from "../Global/OneThirdScreenWidth"
import { DisplaySheets } from "../Sheets/DisplaySheets"
import { MeetingWebservices } from "./MeetingWebservices"

/*****************************************************************************************
	
	COMPONENTS:

		** The right pan of meeting, sheets and webservices
		
		**	DisplaySheets: set & display sheets cards from GET /indexes sheets

		**	MeetingWebservices: set first webservices from GET /indexes sheets

		**	archive is undefined if the user is on editing meeting page

 *****************************************************************************************/

export function MeetingAdditionalResponse({ archive }: { archive: ArchiveType | undefined }) {
	return (
		<OneThirdScreenWidth>
			<DisplaySheets archive={archive ?? undefined} />
			<GlobalColContainer>
				<h3 className="text-2xl font-bold fr-pt-3w fr-pb-3w">Liens pratiques</h3>
				<MeetingWebservices />
			</GlobalColContainer>
		</OneThirdScreenWidth>
	)
}
