import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { satisfiedButtons, unsatisfiedButtons } from '../../constants/feedback'
import { InitialFeedback } from '../../utils/feedback'
import { useKeyPress } from '../../utils/manageEffects'
import { GlobalColContainer } from '../Global/GlobalColContainer'
import { ButtonsOptions } from './ButtonsOptions'
import { ConfirmationButton } from './ConfirmationButton'
import { InputOption } from './InputOption'
import { UserFeedbackResume } from './UserFeedbackResume'

export function UserFeedbackOptions({ activeTab, isFirst, feedback, setFeedback }) {
  const [reasons, setReasons] = useState([])
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
      setReasons(reasons.filter((reason) => reason !== 'Autre raison'))
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
      />
      <InputOption reasons={reasons} setOtherReason={setOtherReason} isFirst={isFirst} />
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
