import { thankFeedback, thankFeedbackRole } from '../../constants/feedback'

export function UserFeedbackThanks() {
  return (
    <div role={thankFeedbackRole} className="fr-mb-2w flex justify-center">
      <div className="py-4">{thankFeedback}</div>
    </div>
  )
}
