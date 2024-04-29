import { getChunksUrl } from '@api'
import { resultMeetingTitle } from '@constants/meeting'
import { ArchiveType, InitialFeedback, type RootState } from '@types'
import { useFetch } from '@utils/hooks'
import { setHeaders } from '@utils/setData'
import Separator from 'components/Global/Separator'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Feedback } from '../Feedbacks/Feedback'
import { GlobalParagraph } from '../Global/GlobalParagraph'
import { GlobalSecondaryTitle } from '../Global/GlobalSecondaryTitle'
import { CurrentStream } from '../Global/CurrentStream'
import { TextWithSources } from 'components/Sources/TextWithSources'

/*****************************************************************************************

		** MeetingStream 
			Prints answer stream with CurrentStream
			
		** MeetingFeedback: set isGood & send feedback with thumbs icons
		** ResponseExplanation: display chunks associated to response

 *****************************************************************************************/
export function MeetingStream() {
  const stream = useSelector((state: RootState) => state.stream)
  const user = useSelector((state: RootState) => state.user)
  const agentResponse = stream.historyStream[0]
  const [chunks, setChunks] = useState([])
  const [feedback, setFeedback] = useState(InitialFeedback)

  useEffect(() => {
    if (!user.chunks.length) return

    setChunks(user.chunks)
  }, [user.chunks])
  return (
    <>
      <h3>Réponse proposée par Albert</h3>
      {stream.isStreaming ? (
        <TextWithSources text={stream.response} />
      ) : (
        <TextWithSources text={agentResponse}></TextWithSources>
      )}
      {/* [      {!stream.isStreaming && stream.historyStream.length !== 0 && <MeetingFeedback />}
] */}
      {!stream.isStreaming && stream.historyStream.length !== 0 && (
        <div className="fr-mt-5w">
          <Feedback feedback={feedback} setFeedback={setFeedback} />
          <Separator extraClass="fr-mt-5w" />
        </div>
      )}
    </>
  )
}
