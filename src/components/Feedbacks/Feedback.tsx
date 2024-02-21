import { useEffect, useState } from 'react'
import { Feedback as FeedbackType, InitialFeedback, RootState } from '../../../types'
import { GlobalColContainer } from '../Global/GlobalColContainer'
import { UserFeedbackInput } from './UserFeedbackInput'
import { UserFeedbackSatisfaction } from './UserFeedbackSatisfaction'
import { useSelector } from 'react-redux'

/**
 * This component is the feedback form that the user will see after receiving a response
 * isFirst is a bolean that is :
 * true when giving feedback on a regular response and
 * false when giving feedback on a question that has been regenerated
 */
export function Feedback({
  feedback,
  setFeedback,
}: { feedback: FeedbackType; setFeedback: (feedback: FeedbackType) => void }) {
  console.log('feedback', feedback)
  const user = useSelector((state: RootState) => state.user)
  console.log('streamID in feedback', user.lastStreamId)
  useEffect(() => {
    setFeedback(InitialFeedback)
  }, [])
  return (
    <GlobalColContainer>
      <UserFeedbackSatisfaction
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
