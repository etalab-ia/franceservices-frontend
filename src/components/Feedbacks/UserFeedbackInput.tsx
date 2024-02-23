import {
  askingQualityPrecisions,
  primaryButtons,
  secondaryButtons,
} from '../../constants/feedback'
import { UserFeedbackOptions } from './UserFeedbackOptions'
import { UserFeedbackThanks } from './UserFeedbackThanks'
import { UserFeedbackResume } from './UserFeedbackResume'
import { useEffect, useState } from 'react'

/**
 * Prints options
 */
export function UserFeedbackInput({ isFirst, feedback, setFeedback }) {
  const buttons = isFirst ? primaryButtons : secondaryButtons
  const activeTab = feedback.isGood
  const [showThanks, setShowThanks] = useState(false)
  useEffect(() => {
    if (feedback.isConfirmed) {
      setShowThanks(true) // Show thanks immediately when confirmed
      const timer = setTimeout(() => {
        setShowThanks(false) // Hide after 3 seconds
      }, 3000) // 3000ms = 3 seconds

      return () => clearTimeout(timer) // Ensure timer is cleared on component unmount or before the next effect runs
    }
    // Optionally, reset the showThanks state if feedback.isConfirmed is false.
    // This depends on your application's logic and how feedback confirmation is handled.
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
