import { Tag } from '@codegouvfr/react-dsfr/Tag'
import { feedbackResume } from '../../constants/feedback'
import { Feedback } from 'types'

export function UserFeedbackResume({ feedback }: { feedback: Feedback }) {
  return (
    <div role={feedbackResume} className="wrap-message fr-mb-2w">
      {feedback.reasons.map((button, index) => (
        <Tag key={index} className="fr-m-1v">
          {button}
        </Tag>
      ))}
    </div>
  )
}
