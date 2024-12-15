import { useAddFeedback } from '@api'
import { feedbackConfirmationButton } from '@constants/feedback'
import {
  negativeTags,
  positiveTags,
  type Feedback as FeedbackType,
  type NegativeFeedbackArray,
  type PositiveFeedbackArray,
  type RootState,
  type PositiveReason,
  type NegativeReason,
} from '@types'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { GlobalColContainer } from '../Global/GlobalColContainer'
import { ButtonsOptions } from './ButtonsOptions'
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
  const [otherReason, setOtherReason] = useState('')

  // Determine if we're dealing with positive or negative reasons
  const isPositive = activeTab === 0

  // Maintain separate states for positive and negative reasons
  const [positiveReasons, setPositiveReasons] = useState<PositiveFeedbackArray>([])
  const [negativeReasons, setNegativeReasons] = useState<NegativeFeedbackArray>([])

  // Determine which tags to show based on activeTab
  const [buttonsType, setButtonsType] = useState(isPositive ? positiveTags : negativeTags)

  useEffect(() => {
    if (isPositive) {
      setPositiveReasons([])
      setButtonsType(positiveTags)
    } else {
      setNegativeReasons([])
      setButtonsType(negativeTags)
    }
  }, [activeTab])

  return (
    <GlobalColContainer>
      {isPositive ? (
        <ButtonsOptions<PositiveReason>
          isFirst={isFirst}
          buttonsType={buttonsType as Record<string, PositiveReason>}
          reasons={positiveReasons}
          setReasons={setPositiveReasons}
          setButtonsType={
            setButtonsType as React.Dispatch<
              React.SetStateAction<Record<string, PositiveReason>>
            >
          }
          setOtherReason={setOtherReason}
        />
      ) : (
        <ButtonsOptions<NegativeReason>
          isFirst={isFirst}
          buttonsType={buttonsType as Record<string, NegativeReason>}
          reasons={negativeReasons}
          setReasons={setNegativeReasons}
          setButtonsType={
            setButtonsType as React.Dispatch<
              React.SetStateAction<Record<string, NegativeReason>>
            >
          }
          setOtherReason={setOtherReason}
        />
      )}

      <UserFeedbackResume feedback={feedback} />

      <ConfirmationButton
        // Pass the correct reasons array based on activeTab
        reasons={isPositive ? positiveReasons : negativeReasons}
        otherReason={otherReason}
        feedback={feedback}
        setFeedback={setFeedback}
      />
    </GlobalColContainer>
  )
}

const ConfirmationButton = ({
  reasons,
  otherReason,
  feedback,
  setFeedback,
}: {
  reasons: PositiveFeedbackArray | NegativeFeedbackArray
  otherReason: string
  feedback: FeedbackType
  setFeedback: (feedback: FeedbackType) => void
}) => {
  const streamId = useSelector((state: RootState) => state.user.lastStreamId)
  const addFeedback = useAddFeedback()

  const handleConfirm = () => {
    const updatedFeedback = {
      ...feedback,
      positives: !feedback.isGood ? ([...reasons] as PositiveFeedbackArray) : [],
      negatives: !feedback.isGood ? [] : ([...reasons] as NegativeFeedbackArray),
      isConfirmed: true,
    }

    setFeedback(updatedFeedback)
    addFeedback.mutate({ feedback: updatedFeedback, streamId })
  }

  return (
    <button
      type="button"
      role={feedbackConfirmationButton}
      onClick={handleConfirm}
      className="border fr-text-action-high--blue-france"
    >
      <p className="fr-text-action-high--blue-france fr-p-1w">Confirmer</p>
    </button>
  )
}
