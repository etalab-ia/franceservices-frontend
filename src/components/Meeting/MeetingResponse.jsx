import { useSelector } from "react-redux";
import { GlobalParagraph } from "../Global/GlobalParagraph";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { GlobalColContainer } from "../Global/GlobalColContainer";
import { MeetingTiles } from "./MeetingTiles";

const Stream = ({ response }) => {
	return <div className="text-justify">
		{response.map((item, index) => (
			<span key={index}>{item}</span>
		))}
	</div>
}

export function MeetingResponse() {
	const	stream = useSelector((state) => state.stream);

	return <GlobalRowContainer>
			<GlobalColContainer>
				<h3 className="text-2xl font-bold fr-pt-3w fr-pb-3w">Résultat</h3>
				{stream.isStreaming ?
					<Stream response={stream.response}/>
					:
					<GlobalParagraph>{stream.historyStream[0]}</GlobalParagraph>
				}
			</GlobalColContainer>
			<div  className="w-1/3">
				<GlobalColContainer>
					<h3 className="text-2xl font-bold fr-pt-3w fr-pb-3w">Liens pratiques</h3>
					{!stream.isStreaming && <MeetingTiles />}
				</GlobalColContainer>
			</div>
	</GlobalRowContainer>
}