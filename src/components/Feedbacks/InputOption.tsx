import { Input } from '@codegouvfr/react-dsfr/Input'
import { askingReasons, feedbackAdditionalInput } from '@constants/feedback'

/**
 * This is the free input from feedback, it allows the user to type in any reason for a good/bad feedback
 */
export function InputOption({
  reasons,
  setOtherReason,
  isFirst,
}: {
  reasons: string[]
  setOtherReason: React.Dispatch<React.SetStateAction<string>>
  isFirst: boolean
}) {
  const handleNewReason = (e) => {
    setOtherReason(e.target.value)
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
          }}
        />
      )}
    </>
  )
}
