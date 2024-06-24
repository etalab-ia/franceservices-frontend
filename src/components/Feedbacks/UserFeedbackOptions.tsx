import { useAddFeedback } from '@api'
import {
  feedbackConfirmationButton,
  satisfiedButtons,
  unsatisfiedButtons,
} from '@constants/feedback'
import type { Feedback as FeedbackType, RootState } from '@types'
import { useKeyPress } from '@utils/manageEffects'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { GlobalColContainer } from '../Global/GlobalColContainer'
import { ButtonsOptions } from './ButtonsOptions'
import { InputOption } from './InputOption'
import { UserFeedbackResume } from './UserFeedbackResume'

export function UserFeedbackOptions({
  activeTab,
  isFirst,
  feedback,
  setFeedback,
}: {
  activeTab: number
  isFirst: boolean
  feedback: FeedbackType
  setFeedback: (feedback: FeedbackType) => void
}) {
  const [reasons, setReasons] = useState<string[]>([])
  const [otherReason, setOtherReason] = useState('')
  const [buttonsType, setButtonsType] = useState(
    activeTab === 0 ? satisfiedButtons : unsatisfiedButtons
  )
  useEffect(() => {
    setReasons([])
    setButtonsType(activeTab === 0 ? satisfiedButtons : unsatisfiedButtons)
  }, [activeTab])

  useKeyPress((e) => {
    if (e.key === 'Enter' && e.target.name === 'otherReason' && otherReason) {
      otherReason &&
        !reasons.includes(otherReason) &&
        setFeedback({
          ...feedback,
          message: otherReason,
        })
      e.target.value = ''
    }
  })

  useEffect(() => {
    setFeedback({
      ...feedback,
      message: otherReason,
    })
  }, [otherReason])

  return (
    <GlobalColContainer>
      <ButtonsOptions
        isFirst={isFirst}
        buttonsType={buttonsType}
        reasons={reasons}
        setReasons={setReasons}
        setButtonsType={setButtonsType}
        setOtherReason={setOtherReason}
      />
      <InputOption
        reasons={reasons}
        setOtherReason={setOtherReason}
        setButtonsType={setButtonsType}
        isFirst={isFirst}
        buttonsType={buttonsType}
      />
      <UserFeedbackResume feedback={feedback} />
      <ConfirmationButton
        reasons={reasons}
        otherReason={otherReason}
        feedback={feedback}
        setFeedback={setFeedback}
      />
    </GlobalColContainer>
  )
}

//TODO: Send the full reasons array to the backend when back is ready
const ConfirmationButton = ({ reasons, otherReason, feedback, setFeedback }) => {
  const streamId = useSelector((state: RootState) => state.user.lastStreamId)
  const addFeedback = useAddFeedback()

  const handleConfirm = () => {
    otherReason &&
      !reasons.includes(otherReason) &&
      setFeedback({
        ...feedback,
        message: otherReason,
      })
    addFeedback.mutate({ feedback, streamId, reasons })
    setFeedback({
      ...feedback,
      isConfirmed: true,
    })
  }
  return (
    <button
      role={feedbackConfirmationButton}
      onClick={handleConfirm}
      className={`border fr-text-action-high--blue-france`}
    >
      <p className="fr-text-action-high--blue-france fr-p-1w"> Confirmer </p>
    </button>
  )
}
