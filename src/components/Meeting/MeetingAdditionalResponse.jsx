import { GlobalColContainer } from "../Global/GlobalColContainer";
import { OneThirdScreenWidth } from "../Global/OneThirdScreenWidth";
import { DisplaySheets } from "../Sheets/DisplaySheets";
import { MeetingContacts } from "./MeetingContacts";
import { MeetingTiles } from "./MeetingTiles";

export function MeetingAdditionalResponse({ currQuestion }) {
	return <OneThirdScreenWidth>
		<DisplaySheets currQuestion={currQuestion}/>
		<GlobalColContainer>
			<h3 className="text-2xl font-bold fr-pt-3w fr-pb-3w">Organismes et contacts</h3>
			<MeetingContacts />
		</GlobalColContainer>
	</OneThirdScreenWidth>
}