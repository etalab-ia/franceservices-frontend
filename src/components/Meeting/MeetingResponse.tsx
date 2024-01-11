import { GlobalRowContainer } from "../Global/GlobalRowContainer"
import { MeetingMainResponse } from "./MeetingMainResponse"
import { MeetingAdditionalResponse } from "./MeetingAdditionalResponse"
import { ArchiveType } from "types"

export function MeetingResponse({ archive }: { archive: ArchiveType | undefined }) {
	return (
		<GlobalRowContainer extraClass="fr-grid-row--center">
			<MeetingMainResponse archive={archive} />
			<MeetingAdditionalResponse archive={archive} />
		</GlobalRowContainer>
	)
}
