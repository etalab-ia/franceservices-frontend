import { useEffect, useState } from 'react'
import { Feedback } from 'types'
import {
  askingQualityPrecisions,
  primaryButtons,
  secondaryButtons,
} from '../../constants/feedback'
import { UserFeedbackOptions } from './UserFeedbackOptions'
import { UserFeedbackResume } from './UserFeedbackResume'
import { UserFeedbackThanks } from './UserFeedbackThanks'

/**
 * Prints options
 */
export function UserFeedbackInput({
  isFirst,
  feedback,
  setFeedback,
}: { isFirst: boolean; feedback: Feedback; setFeedback: (feedback: Feedback) => void }) {
  const buttons = isFirst ? primaryButtons : secondaryButtons
  const activeTab = feedback.isGood
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
        <div>
          <p className="mt-4">{askingQualityPrecisions(buttons[activeTab].type)}</p>
          <UserFeedbackOptions
            activeTab={activeTab}
            isFirst={isFirst}
            feedback={feedback}
            setFeedback={setFeedback}
          />
        </div>
      ) : (
        <div>
          <UserFeedbackResume feedback={feedback} />
          {showThanks && <UserFeedbackThanks />}
        </div>
      )}
    </>
  )
}
