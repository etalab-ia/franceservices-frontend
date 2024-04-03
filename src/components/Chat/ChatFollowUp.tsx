import { type Feedback, InitialFeedback, type RootState } from '@types'
import { Stream } from '@types'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { UserExperience } from '../Feedbacks/UserExperience'
// import { NewQuestion } from "./NewQuestion"
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { DisplayStream } from '../Stream/DisplayStream'
import { AvatarToolsContainer } from './AvatarToolsContainer'
import { SourcesAccordion } from './DisplayArrayMessages'

// Last message of the chat
export function ChatFollowUp() {
  const [feedback, setFeedback] = useState<Feedback>(InitialFeedback)
  const stream = useSelector((state: RootState) => state.stream)
  const conditionDiv = stream.response.length !== 0 || stream.historyStream.length !== 0
  const followUpRef = useRef(null)
  // const newQuestionCondition = !stream.isStreaming && feedback.isConfirmed
  const user = useSelector((state: RootState) => state.user)

  // Scroll into view when the component updates

  return (
    <>
      {conditionDiv && (
        <div ref={followUpRef}>
          <div className="fr-grid-row fr-grid-row--center  ">
            <div className="fr-col-1 hide-on-smallscreen">
              <AvatarToolsContainer />
            </div>
            <div className="fr-col-10">
              <DisplayStream stream={stream} />
            </div>
            <div className="fr-col-1 hide-on-smallscreen" />
          </div>

          <div className="fr-grid-row fr-col ">
            <div className="fr-col-1" />
            <div className="fr-col-11">
              <SourcesAccordion chunks={user.chunks} />
            </div>
          </div>
          {!stream.isStreaming && (
            <UserExperience feedback={feedback} setFeedback={setFeedback} />
          )}
          {/* {newQuestionCondition && <NewQuestion />} */}
        </div>
      )}
    </>
  )
}
