import { useDispatch, useSelector } from "react-redux";
import { GlobalParagraph } from "../Global/GlobalParagraph";
import { GlobalStream } from "../Global/GlobalStream";
import { useEffect } from "react";
import { setArchive } from "../../utils/archive";
import { resultMeetingTitle } from "../../constants/meeting";

export function MeetingStream({ archive }) {
	const	stream = useSelector((state) => state.stream);
	const	user = useSelector((state) => state.user);
	const	agentResponse = archive ? archive.messages[1].text[0] : stream.historyStream[0]; 
	const	dispatch = useDispatch();

	useEffect(() => {
		// TODO: set archive with "administrations concernées" & "thèmes associés"
		if (!stream.isStreaming && stream.historyStream[0] && !archive)
			setArchive(dispatch, stream, user, 'meetings');
	}, [stream.isStreaming])

	return <>
		{resultMeetingTitle}
		{stream.isStreaming ?
			<GlobalStream
				response={stream.response}
			/>
			:
			<GlobalParagraph>
				{agentResponse}
			</GlobalParagraph>
		}
	</>
}