import { useDispatch, useSelector } from "react-redux"
import { GlobalParagraph } from "../Global/GlobalParagraph"
import { GlobalStream } from "../Global/GlobalStream"
import { resultMeetingTitle } from "../../constants/meeting"
import { GlobalSecondaryTitle } from "../Global/GlobalSecondaryTitle"
import { MeetingFeedback } from "./MeetingFeedback"
import { ResponseExplanation } from "../Global/ResponseExplanation"
import { ArchiveType, RootState } from "types"

/*****************************************************************************************

		** MeetingStream 
			Prints answer stream with GlobalStream
			
		** MeetingFeedback: set isGood & send feedback with thumbs icons
		** ResponseExplanation: display chunks associated to response

 *****************************************************************************************/
export function MeetingStream({ archive }: { archive: ArchiveType | undefined }) {
	const stream = useSelector((state: RootState) => state.stream)
	const user = useSelector((state: RootState) => state.user)
	const agentResponse = archive ? archive.response : stream.historyStream[0]
	const chunks = archive ? archive.chunks : user.chunks

	return (
		<>
			<GlobalSecondaryTitle extraClass="fr-mb-2w">{resultMeetingTitle}</GlobalSecondaryTitle>
			{stream.isStreaming ? (
				<GlobalStream response={stream.response} />
			) : (
				<GlobalParagraph>{agentResponse}</GlobalParagraph>
			)}
			{!stream.isStreaming && stream.historyStream.length !== 0 && <MeetingFeedback />}
			<ResponseExplanation chunks={chunks} />
		</>
	)
}
