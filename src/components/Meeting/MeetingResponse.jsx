import { GlobalRowContainer } from "../Global/GlobalRowContainer"
import { MeetingMainResponse } from "./MeetingMainResponse"
import { MeetingAdditionalResponse } from "./MeetingAdditionalResponse"

export function MeetingResponse({ archive }) {
	return (
		<GlobalRowContainer extraClass="fr-grid-row--center">
			<MeetingMainResponse archive={archive} />
			<MeetingAdditionalResponse archive={archive} />
		</GlobalRowContainer>
	)
}
