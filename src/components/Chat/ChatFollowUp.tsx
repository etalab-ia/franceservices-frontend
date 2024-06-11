import { InitialFeedback, type Feedback, type RootState } from '@types'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { UserExperience } from '../Feedbacks/UserExperience'
import { DisplayStream } from '../Stream/DisplayStream'
import { AvatarToolsContainer } from './AvatarToolsContainer'
import SourcesAccordion from './SourcesAccordion'
import { TextWithSources } from 'components/Sources/TextWithSources'
import { GlobalParagraph } from 'components/Global/GlobalParagraph'

// Last message of the chat with feedback
export function ChatFollowUp() {
  const [feedback, setFeedback] = useState<Feedback>(InitialFeedback)
  const stream = useSelector((state: RootState) => state.stream)
  const conditionDiv = stream.response.length !== 0 || stream.historyStream.length !== 0
  const followUpRef = useRef(null)
  const user = useSelector((state: RootState) => state.user)

  return (
    <>
      {conditionDiv && (
        <div ref={followUpRef}>
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-1 hide-on-smallscreen">
              <AvatarToolsContainer />
            </div>
            <div className="fr-col-10">
              {stream.isStreaming ? (
                <TextWithSources text={stream.response} />
              ) : (
                <GlobalParagraph>{stream.historyStream[0] ?? ''}</GlobalParagraph>
              )}
            </div>
            <div className="fr-col-1 hide-on-smallscreen" />
          </div>

          {!stream.isStreaming && (
            <UserExperience feedback={feedback} setFeedback={setFeedback} />
          )}
        </div>
      )}
    </>
  )
}
