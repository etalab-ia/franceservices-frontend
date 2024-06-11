import { InitialFeedback, type RootState } from '@types'
import Separator from 'components/Global/Separator'
import { TextWithSources } from 'components/Sources/TextWithSources'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Feedback } from '../Feedbacks/Feedback'
import { GlobalParagraph } from 'components/Global/GlobalParagraph'

export function MeetingStream() {
  const stream = useSelector((state: RootState) => state.stream)
  const agentResponse = stream.historyStream[0]
  const [feedback, setFeedback] = useState(InitialFeedback)

  return (
    <>
      <h3>Réponse proposée par Albert</h3>
      {stream.isStreaming ? (
        <TextWithSources text={stream.response} />
      ) : (
        <GlobalParagraph>{agentResponse}</GlobalParagraph>
      )}
      {!stream.isStreaming && stream.historyStream.length !== 0 && (
        <div className="fr-mt-5w">
          <Feedback feedback={feedback} setFeedback={setFeedback} />
          <Separator extraClass="fr-mt-5w" />
        </div>
      )}
    </>
  )
}
