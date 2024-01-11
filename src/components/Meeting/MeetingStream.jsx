import { useDispatch, useSelector } from "react-redux"
import { GlobalParagraph } from "../Global/GlobalParagraph"
import { GlobalStream } from "../Global/GlobalStream"
import { resultMeetingTitle } from "../../constants/meeting"
import { GlobalSecondaryTitle } from "../Global/GlobalSecondaryTitle"
import { MeetingFeedback } from "./MeetingFeedback"
import { ResponseExplanation } from "../Global/ResponseExplanation"

export function MeetingStream({ archive }) {
	const stream = useSelector((state) => state.stream)
	const user = useSelector((state) => state.user)
	const agentResponse = archive ? archive.messages[1].text[0] : stream.historyStream[0]
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
