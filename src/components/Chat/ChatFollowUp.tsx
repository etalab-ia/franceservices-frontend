import type { RootState } from '@types'
import { GlobalParagraph } from 'components/Global/GlobalParagraph'
import { TextWithSources } from 'components/Sources/TextWithSources'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { UserExperience } from '../Feedbacks/UserExperience'
import { AvatarToolsContainer } from './AvatarToolsContainer'

// Last message of the chat with feedback
export function ChatFollowUp() {
  const stream = useSelector((state: RootState) => state.stream)
  const conditionDiv = stream.response.length !== 0 || stream.historyStream.length !== 0
  const followUpRef = useRef(null)

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

          {!stream.isStreaming && <UserExperience />}
        </div>
      )}
    </>
  )
}
