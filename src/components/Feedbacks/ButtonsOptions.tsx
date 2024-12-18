import { feedbackButtonsChoice } from '@constants/feedback'
import type {
  NegativeFeedbackArray,
  NegativeReason,
  PositiveFeedbackArray,
  PositiveReason,
} from '@types'
import type React from 'react'

type ButtonsOptionsProps<T extends PositiveReason | NegativeReason> = {
  isFirst: boolean
  buttonsType: Record<string, T>
  reasons: T[]
  setReasons: (reasons: T[]) => void
  setOtherReason: React.Dispatch<React.SetStateAction<string>>
  setButtonsType: React.Dispatch<React.SetStateAction<Record<string, T>>>
}

export function ButtonsOptions<T extends PositiveReason | NegativeReason>({
  isFirst,
  buttonsType,
  reasons,
  setReasons,
  setButtonsType,
  setOtherReason,
}: ButtonsOptionsProps<T>) {
  console.log(
    'isFirst:',
    isFirst,
    'buttonsType:',
    buttonsType,
    'reasons:',
    reasons,
    'setReasons:',
    setReasons,
    'setButtonsType:',
    setButtonsType,
  )

  const handleClick = (reasonValue: T) => {
    console.log('handleclick:', 'reasonValue:', reasonValue)
    if (reasons.includes(reasonValue)) {
      setReasons(reasons.filter((reason) => reason !== reasonValue))
    } else {
      setReasons([...reasons, reasonValue])
    }
  }

  return (
    <div className="wrap-message">
      {isFirst &&
        Object.entries(buttonsType).map(([displayText, reasonValue], index) => {
          const isSelected = reasons.includes(reasonValue)
          const classNames = isSelected
            ? 'fr-background-action-high--blue-france'
            : 'fr-background-default--grey'

          return (
            <div key={index}>
              <button
                type="button"
                role={feedbackButtonsChoice(reasonValue)}
                className={`user-feedback-buttons fr-text-action-high--blue-france ${classNames}`}
                onClick={() => handleClick(reasonValue)}
              >
                <p
                  className={
                    isSelected ? 'text-white' : 'fr-text-action-high--blue-france'
                  }
                >
                  {displayText}
                </p>
              </button>
            </div>
          )
        })}
    </div>
  )
}
