import { useSelector } from "react-redux"
import { GlobalParagraph } from "../Global/GlobalParagraph"
import { GlobalStream } from "../Global/GlobalStream"
import { resultMeetingTitle } from "../../constants/meeting"
import { GlobalSecondaryTitle } from "../Global/GlobalSecondaryTitle"
import { MeetingFeedback } from "./MeetingFeedback"
import { ResponseExplanation } from "../Global/ResponseExplanation"
import { ArchiveType, RootState } from "types"
import { useEffect, useState } from "react"
import { useFetch } from "../../utils/hooks"
import { useApiUrls } from "../../constants/api"
import { setHeaders } from "../../utils/setData"

/*****************************************************************************************

		** MeetingStream 
			Prints answer stream with GlobalStream
			
		** MeetingFeedback: set isGood & send feedback with thumbs icons
		** ResponseExplanation: display chunks associated to response

 *****************************************************************************************/
export function MeetingStream({ archive }: { archive: ArchiveType | undefined }) {
	const stream = useSelector((state: RootState) => state.stream)
	const user = useSelector((state: RootState) => state.user)
	const agentResponse = archive !== undefined ? archive.response : stream.historyStream[0]
	const [chunks, setChunks] = useState([])
	const { getChunksUrl } = useApiUrls()

	const getChunks = async () => {
		const data = {
			uids: archive.rag_sources,
		}
		const chunksRes = await useFetch(getChunksUrl, "POST", {
			headers: setHeaders(false),
			data: JSON.stringify(data),
		})

		setChunks(chunksRes)
	}

	useEffect(() => {
		if (archive !== undefined) {
			getChunks()
		}
	}, [])

	useEffect(() => {
		if (!user.chunks.length) return

		setChunks(user.chunks)
	}, [user.chunks])

	return (
		<>
			<GlobalSecondaryTitle extraClass="fr-mb-2w">{resultMeetingTitle}</GlobalSecondaryTitle>
			{stream.isStreaming ? (
				// @ts-expect-error TS(2741): Property 'extraClass' is missing in type '{ respon... Remove this comment to see the full error message
				<GlobalStream response={stream.response} />
			) : (
				// @ts-expect-error TS(2741): Property 'extraClass' is missing in type '{ childr... Remove this comment to see the full error message
				<GlobalParagraph>{agentResponse}</GlobalParagraph>
			)}
			{!stream.isStreaming && stream.historyStream.length !== 0 && <MeetingFeedback />}
			<ResponseExplanation chunks={chunks} />
		</>
	)
}
