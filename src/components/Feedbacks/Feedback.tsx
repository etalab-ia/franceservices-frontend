import { InitialFeedback, type Feedback as FeedbackType } from '@types'
import { useEffect, useState } from 'react'
import { GlobalColContainer } from '../Global/GlobalColContainer'
import { UserFeedbackInput } from './UserFeedbackInput'
import { UserSatisfactionButtons } from './UserSatisfactionButtons'

/**
 * This component is the feedback form that the user will see after receiving a response
 * isFirst is a bolean that is :
 * true when giving feedback on a regular response and
 * false when giving feedback on a question that has been regenerated
 */
export function Feedback() {
  const [feedback, setFeedback] = useState<FeedbackType>(InitialFeedback)

  useEffect(() => {
    setFeedback(InitialFeedback)
  }, [])
  return (
    <GlobalColContainer>
      <UserSatisfactionButtons
        isFirst={true}
        feedback={feedback}
        setFeedback={setFeedback}
      />
      {feedback.isGood !== undefined && (
        <UserFeedbackInput isFirst={true} feedback={feedback} setFeedback={setFeedback} />
      )}
    </GlobalColContainer>
  )
}
