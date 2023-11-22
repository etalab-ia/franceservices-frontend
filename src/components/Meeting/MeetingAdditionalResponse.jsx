import { GlobalColContainer } from "../Global/GlobalColContainer";
import { MeetingContacts } from "./MeetingContacts";
import { MeetingTiles } from "./MeetingTiles";

export function MeetingAdditionalResponse() {
	return <div className="w-1/3">
		<GlobalColContainer>
		    <h3 className="text-2xl font-bold fr-pt-3w fr-pb-3w">Liens pratiques</h3>
			<MeetingTiles />
		</GlobalColContainer>
		<GlobalColContainer>
		    <h3 className="text-2xl font-bold fr-pt-3w fr-pb-3w">Organismes et contacts</h3>
			<MeetingContacts />
		</GlobalColContainer>
	</div>
}