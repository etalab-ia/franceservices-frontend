import { useState } from 'react'
import { type Feedback, InitialFeedback, type RootState } from '@types'
import { UserExperience } from '../Feedbacks/UserExperience'
// import { NewQuestion } from "./NewQuestion"
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { DisplayStream } from '../Stream/DisplayStream'
import { AvatarToolsContainer } from './AvatarToolsContainer'
import { Stream } from '@types'
import { useSelector } from 'react-redux'
import { SourcesAccordion } from './DisplayArrayMessages'

// Last message of the chat
export function ChatFollowUp() {
  const [feedback, setFeedback] = useState<Feedback>(InitialFeedback)
  const stream = useSelector((state: RootState) => state.stream)
  const conditionDiv = stream.response.length !== 0 || stream.historyStream.length !== 0
  // const newQuestionCondition = !stream.isStreaming && feedback.isConfirmed
  const user = useSelector((state: RootState) => state.user)
  return (
    <>
      {conditionDiv && (
        <div>
          <GlobalRowContainer extraClass="fr-grid-row--center ">
            <AvatarToolsContainer />
            <DisplayStream stream={stream} />
          </GlobalRowContainer>
          <SourcesAccordion chunks={user.chunks} />
          {!stream.isStreaming && (
            <UserExperience feedback={feedback} setFeedback={setFeedback} />
          )}
          {/* {newQuestionCondition && <NewQuestion />} */}
        </div>
      )}
    </>
  )
}
