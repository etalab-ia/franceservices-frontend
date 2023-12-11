import { OneThirdScreenWidth } from "../Global/OneThirdScreenWidth";
import { DisplaySheets } from "../Sheets/DisplaySheets";

export function MeetingAdditionalResponse({ currQuestion, archive }) {
	return <OneThirdScreenWidth>
		<DisplaySheets
			currQuestion={currQuestion}
			archiveSheets={archive.sheets}
		/>
		{/* <GlobalColContainer>
			<h3 className="text-2xl font-bold fr-pt-3w fr-pb-3w">Organismes et contacts</h3>
			<MeetingContacts />
		</GlobalColContainer> */}
	</OneThirdScreenWidth>
}