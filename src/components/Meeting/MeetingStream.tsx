import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ArchiveType, InitialFeedback, RootState } from 'types'
import { getChunksUrl } from '../../constants/api'
import { resultMeetingTitle } from '../../constants/meeting'
import { useFetch } from '../../utils/hooks'
import { setHeaders } from '../../utils/setData'
import { Feedback } from '../Feedbacks/Feedback'
import { GlobalParagraph } from '../Global/GlobalParagraph'
import { GlobalSecondaryTitle } from '../Global/GlobalSecondaryTitle'
import { GlobalStream } from '../Global/GlobalStream'

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
  const [feedback, setFeedback] = useState(InitialFeedback)

  const getChunks = async () => {
    const data = {
      uids: archive.rag_sources,
    }
    const chunksRes = await useFetch(getChunksUrl, 'POST', {
      headers: setHeaders(false),
      data: JSON.stringify(data),
    })
    setChunks(chunksRes)
  }

  useEffect(() => {
    if (archive) {
      getChunks()
    }
  }, [])

  useEffect(() => {
    if (!user.chunks.length) return

    setChunks(user.chunks)
  }, [user.chunks])
  return (
    <>
      <GlobalSecondaryTitle extraClass="fr-mb-2w">
        {resultMeetingTitle}
      </GlobalSecondaryTitle>
      {stream.isStreaming ? (
        <GlobalStream response={stream.response} />
      ) : (
        <GlobalParagraph>{agentResponse}</GlobalParagraph>
      )}
      {/* [      {!stream.isStreaming && stream.historyStream.length !== 0 && <MeetingFeedback />}
] */}{' '}
      {!stream.isStreaming && stream.historyStream.length !== 0 && (
        <div className="fr-mt-5w mb-[80px]">
          <Feedback feedback={feedback} setFeedback={setFeedback} />
        </div>
      )}
    </>
  )
}
