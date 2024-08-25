import type { Feedback } from '@types'
import { useEffect, useState } from 'react'
import { FeedbackThanksMessage } from './FeedbackThanksMessage'
import { UserFeedbackOptions } from './UserFeedbackOptions'
import { UserFeedbackResume } from './UserFeedbackResume'

/**
 * Prints options
 */

export function UserFeedbackInput({
  isFirst,
  feedback,
  setFeedback,
}: { isFirst: boolean; feedback: Feedback; setFeedback: (feedback: Feedback) => void }) {
  const [showThanks, setShowThanks] = useState(false)
  useEffect(() => {
    if (feedback.isConfirmed) {
      setShowThanks(true)
      const timer = setTimeout(() => {
        setShowThanks(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [feedback.isConfirmed])
  return (
    <>
      {!feedback.isConfirmed ? (
        <>
          <p className="mt-4">
            Pour quelles raisons trouvez-vous ce résultat{' '}
            {feedback.isGood ? 'insatisfaisant' : 'satisfaisant'} ?
          </p>
          <UserFeedbackOptions
            activeTab={feedback.isGood}
            isFirst={isFirst}
            feedback={feedback}
            setFeedback={setFeedback}
          />
        </>
      ) : (
        <>
          <UserFeedbackResume feedback={feedback} />
          {showThanks && <FeedbackThanksMessage />}
        </>
      )}
    </>
  )
}
