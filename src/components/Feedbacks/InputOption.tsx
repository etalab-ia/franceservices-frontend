import { Input } from '@codegouvfr/react-dsfr/Input'
import {
  askingReasons,
  feedbackAdditionalInput,
  type satisfiedButtons,
  type unsatisfiedButtons,
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
  const [inputValue, setInputValue] = useState('')
  const [errorDuplicate, setErrorDuplicate] = useState(false)
  const handleNewReason = (e) => {
    setInputValue(e.target.value)
  }
  const handleEnter = (e) => {
    if (e.key === 'Enter' && e.target.name === 'otherReason') {
      e.preventDefault()
      if (buttonsType.find((r) => r.text === e.target.value)) {
        setErrorDuplicate(true)
        return
      }
      setOtherReason(inputValue)
      setButtonsType((p) => [...p, { text: inputValue, type: `tag-${inputValue}` }])
      e.target.value = ''
      setInputValue('')

      setErrorDuplicate(false)
    }
  }
  function handleClick(e) {
    if (buttonsType.find((r) => r.text === inputValue)) {
      setErrorDuplicate(true)
      return
    }
    setOtherReason(inputValue)
    setButtonsType((p) => [...p, { text: inputValue, type: `tag-${inputValue}` }])
    setInputValue('')
    setErrorDuplicate(false)
  }

  return (
    <>
      {(reasons.includes('other') || !isFirst) && (
        <Input
          addon={
            <button
              type="button"
              className="fr-btn fr-btn-- fr-icon-arrow-right-line"
              onClick={handleClick}
            />
          }
          label=""
          nativeInputProps={{
            role: feedbackAdditionalInput,
            name: 'otherReason',
            placeholder: askingReasons,
            onChange: handleNewReason,
            onKeyDown: handleEnter,
            value: inputValue,
          }}
        />
      )}
      {errorDuplicate && <p className="fr-text--xs">Cet élément est déjà présent</p>}
    </>
  )
}
