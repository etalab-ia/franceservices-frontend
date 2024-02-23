import {
  primaryButtons,
  satisfactionButton,
  secondaryButtons,
} from '../../constants/feedback'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { Feedback as FeedbackType } from '../../../types'

/**
 * These are the good or bad buttons that the user can click to give feedback
 */
export function UserFeedbackSatisfaction({
  isFirst,
  feedback,
  setFeedback,
}: {
  isFirst: boolean
  feedback: FeedbackType
  setFeedback: (feedback: FeedbackType) => void
}) {
  const buttons = isFirst ? primaryButtons : secondaryButtons

  const handleClick = (isGood: number) => {
    if (isGood === feedback.isGood) return
    setFeedback({
      ...feedback,
      isGood: isGood,
    })
  }

  return (
    <GlobalRowContainer>
      {buttons.map((button, index) => {
        return (
          <button
            title={button.type}
            onClick={() => handleClick(index)}
            key={index}
            className={`user-feedback-buttons ${
              index === feedback.isGood
                ? 'fr-background-action-high--blue-france'
                : 'bg-white'
            }`}
            disabled={feedback.isConfirmed}
          >
            <img
              alt={satisfactionButton(button.type)}
              className={
                index === feedback.isGood ? 'mr-2 brightness-0 invert-[1]' : 'mr-2'
              }
              src={button.img}
            />
            <p
              className={`${
                index === feedback.isGood
                  ? 'text-white'
                  : 'fr-text-action-high--blue-france'
              }`}
            >
              {button.name}
            </p>
          </button>
        )
      })}
    </GlobalRowContainer>
  )
}
