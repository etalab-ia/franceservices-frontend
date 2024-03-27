import { Input } from '@codegouvfr/react-dsfr/Input'
import {
  askingReasons,
  feedbackAdditionalInput,
  satisfiedButtons,
  unsatisfiedButtons,
} from '@constants/feedback'
import { useState } from 'react'

/**
 * This is the free input from feedback, it allows the user to type in any reason for a good/bad feedback
 */
export function InputOption({
  reasons,
  setOtherReason,
  isFirst,
  setButtonsType,
  buttonsType,
}: {
  reasons: string[]
  setOtherReason: React.Dispatch<React.SetStateAction<string>>
  isFirst: boolean
  setButtonsType: any
  buttonsType: typeof satisfiedButtons | typeof unsatisfiedButtons
}) {
  const [errorDuplicate, setErrorDuplicate] = useState(false)
  const handleNewReason = (e) => {
    setOtherReason(e.target.value)
  }
  const handleEnter = (e) => {
    if (e.key === 'Enter' && e.target.name === 'otherReason') {
      e.preventDefault()
      if (buttonsType.find((r) => r.text === e.target.value)) {
        setErrorDuplicate(true)
        return
      }
      setOtherReason(e.target.value)
      setButtonsType((p) => [
        ...p,
        { text: e.target.value, type: `tag-${e.target.value}` },
      ])
      e.target.value = ''
      setErrorDuplicate(false)
    }
  }
  return (
    <>
      {(reasons.includes('other') || !isFirst) && (
        <Input
          iconId="fr-icon-arrow-right-line"
          label="Autre raison"
          nativeInputProps={{
            role: feedbackAdditionalInput,
            name: 'otherReason',
            placeholder: askingReasons,
            onChange: handleNewReason,
            onKeyDown: handleEnter,
          }}
        />
      )}
      {errorDuplicate && <p className="fr-text--xs">Cet élément est déjà présent</p>}
    </>
  )
}
