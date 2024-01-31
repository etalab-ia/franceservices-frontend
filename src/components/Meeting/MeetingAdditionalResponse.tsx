import { ArchiveType } from "types"
import { GlobalColContainer } from "../Global/GlobalColContainer"
import { OneThirdScreenWidth } from "../Global/OneThirdScreenWidth"
import { DisplaySheets } from "../Sheets/DisplaySheets"
import { UsefulLinks } from "./UsefulLinks"

/*****************************************************************************************
	
	COMPONENTS:

		** The right pan of meeting, sheets and webservices
		
		**	DisplaySheets: set & display sheets cards from GET /indexes sheets

		**	UsefulLinks: set first webservices from GET /indexes sheets

		**	archive is undefined if the user is on editing meeting page	

 *****************************************************************************************/

export function MeetingAdditionalResponse({ archive }: { archive: ArchiveType | undefined }) {
	return (
		<OneThirdScreenWidth>
			<DisplaySheets archive={archive ?? undefined} />
			<GlobalColContainer>
				<h3 className="text-2xl font-bold fr-pt-3w fr-pb-3w">Liens pratiques</h3>
				<UsefulLinks />
			</GlobalColContainer>
		</OneThirdScreenWidth>
	)
}
