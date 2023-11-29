import { useDispatch, useSelector } from "react-redux";
import { GlobalParagraph } from "../Global/GlobalParagraph";
import { useEffect } from "react";

const Stream = ({ response }) => {
	return <div className="text-justify">
		{response.map((item, index) => (
			<span key={index}>{item}</span>
		))}
	</div>
}

export function MeetingStream() {
	const	stream = useSelector((state) => state.stream);
	const	dispatch = useDispatch();

	useEffect(() => { }, [stream])

	return <>
		<h3 className="text-2xl font-bold fr-mt-1w">Résultat</h3>
		{stream.isStreaming ?
			<Stream response={stream.response}/>
			:
			<GlobalParagraph>{stream.historyStream[0]}</GlobalParagraph>
		}
	</>
}