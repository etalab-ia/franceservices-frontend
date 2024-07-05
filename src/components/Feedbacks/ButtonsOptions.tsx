import {
  feedbackButtonsChoice,
  type satisfiedButtons,
  type unsatisfiedButtons,
} from '@constants/feedback'

export function ButtonsOptions({
  isFirst,
  buttonsType,
  reasons,
  setReasons,
  setButtonsType,
  setOtherReason,
}: {
  isFirst: boolean
  buttonsType: typeof satisfiedButtons | typeof unsatisfiedButtons
  reasons: string[]
  setReasons: (reasons: string[]) => void
  setOtherReason: React.Dispatch<React.SetStateAction<string>>
  setButtonsType: any
}) {
  const handleClick = (index: number) => {
    if (isOtherReasonButton(buttonsType[index])) {
      const newArray = buttonsType.filter((b) => b.type !== buttonsType[index].type)
      setButtonsType(newArray)
    }
    const reasonValue = buttonsType[index].type
    if (!reasonValue.includes('tag-')) {
      if (reasons.includes(reasonValue)) {
        setReasons(reasons.filter((reason) => reason !== reasonValue))
      } else {
        setReasons([reasonValue])
      }
    }
  }

  return (
    <div className="wrap-message">
      {isFirst &&
        buttonsType.map((button: { text: string; type: string }, index: number) => {
          const reasonValue = buttonsType[index].type
          const classNames =
            reasons.includes(reasonValue) ||
            (isOtherReasonButton(button) && reasons.includes('other'))
              ? 'fr-background-action-high--blue-france'
              : 'fr-background-default--grey'

          return (
            <div key={index}>
              <button
                type="button"
                role={feedbackButtonsChoice(button)}
                className={`user-feedback-buttons fr-text-action-high--blue-france ${classNames}`}
                onClick={() => handleClick(index)}
              >
                <p
                  className={
                    reasons.includes(reasonValue) ||
                    (isOtherReasonButton(button) && reasons.includes('other'))
                      ? 'text-white'
                      : 'fr-text-action-high--blue-france'
                  }
                >
                  {button.text}
                </p>
              </button>
            </div>
          )
        })}
    </div>
  )
}

function isOtherReasonButton(button) {
  return button.type.includes('tag-')
}
