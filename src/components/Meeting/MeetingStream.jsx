import { useDispatch, useSelector } from "react-redux";
import { GlobalParagraph } from "../Global/GlobalParagraph";
import { GlobalStream } from "../Global/GlobalStream";
import { useEffect } from "react";
import { setArchive } from "../../utils/archive";
import { resultMeetingTitle } from "../../constants/meeting";
import { GlobalSecondaryTitle } from "../Global/GlobalSecondaryTitle";
import { MeetingFeedback } from "./MeetingFeedback";
import { ResponseExplanation } from "../Global/ResponseExplanation";

export function MeetingStream({ archive }) {
	const	stream = useSelector((state) => state.stream);
	const	user = useSelector((state) => state.user);
	const	agentResponse = archive ? archive.messages[1].text[0] : stream.historyStream[0];
	const	chunks = archive ? archive.chunks : user.chunks;
	const	dispatch = useDispatch();

	useEffect(() => {
		// TODO: WHEN BACK IS READY: set archive with "opérateurs concernés" & "thèmes associés"
		if (!stream.isStreaming && stream.historyStream[0] && !archive)
			setArchive(dispatch, stream, user, 'meetings');
	}, [stream.isStreaming])

	return <>
		<GlobalSecondaryTitle extraClass='fr-mb-2w'>
			{resultMeetingTitle}
		</GlobalSecondaryTitle>
		{stream.isStreaming ?
			<GlobalStream
				response={stream.response}
			/>
			:
			<GlobalParagraph>
				{agentResponse}
			</GlobalParagraph>
		}
		{/* TODO: WHEN BACK IS READY: uncomment and complete component */}
		{/* <MeetingFeedback/> */}
		<ResponseExplanation
			chunks={chunks}
		/>
	</>
}