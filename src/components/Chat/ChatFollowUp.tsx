import { useState } from 'react'
import { Feedback, InitialFeedback } from '../../utils/feedback'
import { UserExperience } from '../Feedbacks/UserExperience'
// import { NewQuestion } from "./NewQuestion"
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { DisplayStream } from '../Stream/DisplayStream'
import { AvatarToolsContainer } from './AvatarToolsContainer'
import { StreamState } from 'types'

export function ChatFollowUp({ stream }: { stream: StreamState }) {
  const [feedback, setFeedback] = useState<Feedback>(InitialFeedback)
  const conditionDiv = stream.response.length !== 0 || stream.historyStream.length !== 0
  // const newQuestionCondition = !stream.isStreaming && feedback.isConfirmed

  return (
    <>
      {conditionDiv && (
        <div>
          <GlobalRowContainer extraClass="fr-grid-row--center">
            <AvatarToolsContainer />
            <DisplayStream stream={stream} />
          </GlobalRowContainer>
          {!stream.isStreaming && (
            <UserExperience feedback={feedback} setFeedback={setFeedback} />
          )}
          {/* {newQuestionCondition && <NewQuestion />} */}
        </div>
      )}
    </>
  )
}
