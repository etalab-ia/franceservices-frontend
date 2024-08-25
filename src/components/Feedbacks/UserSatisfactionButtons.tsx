import { InitialFeedback, type Feedback as FeedbackType } from '@types'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { fr } from '@codegouvfr/react-dsfr'

/**
 * These are the good or bad buttons that the user can click to give feedback
 */
export function UserSatisfactionButtons({
  isFirst,
  feedback,
  setFeedback,
}: {
  isFirst: boolean
  feedback: FeedbackType
  setFeedback: (feedback: FeedbackType) => void
}) {
  const handleClick = (isGood: number) => {
    if (isGood === feedback.isGood) setFeedback(InitialFeedback)
    else {
      setFeedback({
        ...feedback,
        isGood: isGood,
      })
    }
  }
  return (
    <GlobalRowContainer>
      <button
        type="button"
        title={'satisfaisant'}
        onClick={() => handleClick(0)}
        className={`user-feedback-buttons ${
          feedback.isGood || feedback.isGood === undefined
            ? 'fr-background-default--grey fr-text-action-high--blue-france'
            : 'fr-background-action-high--blue-france text-white'
        }`}
        disabled={feedback.isConfirmed}
      >
        <span
          className={`fr-icon-thumbs-up ${feedback.isGood === 0 ? 'text-white' : ''}`}
        />
        <p
          className={`${
            feedback.isGood || feedback.isGood === undefined
              ? 'fr-text-action-high--blue-france'
              : 'text-white'
          }`}
        >
          La réponse est pertinente
        </p>
      </button>

      <button
        type="button"
        title={'insatisfaisant'}
        onClick={() => handleClick(1)}
        className={`user-feedback-buttons  ${
          feedback.isGood
            ? 'fr-background-action-high--blue-france text-white'
            : 'fr-background-default--grey  fr-text-action-high--blue-france'
        }`}
        disabled={feedback.isConfirmed}
      >
        <span
          className={` ${feedback.isGood === 1 ? 'text-white' : ''} fr-icon-thumbs-down`}
        />
        <p
          className={`${
            feedback.isGood ? 'text-white' : 'fr-text-action-high--blue-france'
          }`}
        >
          La réponse n'est pas pertinente
        </p>
      </button>
    </GlobalRowContainer>
  )
}
