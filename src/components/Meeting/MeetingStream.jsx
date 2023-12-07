import { useDispatch, useSelector } from "react-redux";
import { GlobalParagraph } from "../Global/GlobalParagraph";
import { GlobalStream } from "../Global/GlobalStream";
import { useEffect } from "react";
import { setArchive } from "../../utils/archive";

export function MeetingStream() {
	const	stream = useSelector((state) => state.stream);
	const	user = useSelector((state) => state.user);
	const	dispatch = useDispatch();

	useEffect(() => {
		// TODO: set archive with "administrations concernées" & "thèmes associés"
		if (!stream.isStreaming && stream.historyStream[0])
			setArchive(dispatch, stream, user, 'meetings');
	}, [stream.isStreaming])

	return <>
		<h3 className="text-2xl font-bold fr-mt-2w">Résultat</h3>
		{stream.isStreaming ?
			<GlobalStream response={stream.response}/>
			:
			<GlobalParagraph>{stream.historyStream[0]}</GlobalParagraph>
		}
	</>
}