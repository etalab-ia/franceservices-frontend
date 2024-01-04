import { GlobalColContainer } from "../Global/GlobalColContainer";
import { MeetingStream } from "./MeetingStream";
import { MeetingQR } from "./MeetingQR";

/*****************************************************************************************************
	
	COMPONENTS:

		**	MeetingStream: display stream & chunks from GET /indexes chunks used to generate response

		**	MeetingQR: set related questions cards from sheets informations

 *****************************************************************************************************/

export function MeetingMainResponse({ archive }) {
	return <GlobalColContainer>
		<MeetingStream
			archive={archive}
		/>
		<MeetingQR 
			archive={archive}
		/>
	</GlobalColContainer>
}