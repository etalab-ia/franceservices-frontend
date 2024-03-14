import { thankFeedback, thankFeedbackRole } from '@constants/feedback'

export function FeedbackThanksMessage() {
  return (
    <div role={thankFeedbackRole} className="fr-mb-2w ">
      <span
        className="fr-icon-success-line fr-text-default--success flex flex-row gap-2"
        aria-hidden="true"
      >
        {thankFeedback}
      </span>
    </div>
  )
}
