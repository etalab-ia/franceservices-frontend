import {
  feedbackButtonsChoice,
  satisfiedButtons,
  unsatisfiedButtons,
} from '@constants/feedback'

export function ButtonsOptions({
  isFirst,
  buttonsType,
  reasons,
  setReasons,
  setButtonsType,
}: {
  isFirst: boolean
  buttonsType: typeof satisfiedButtons | typeof unsatisfiedButtons
  reasons: string[]
  setReasons: (reasons: string[]) => void
  setButtonsType: any
}) {
  const handleClick = (index: number) => {
    if (isOtherReasonButton(buttonsType[index])) {
      const newArray = buttonsType.filter((b) => b.type !== buttonsType[index].type)
      console.log('newArray', newArray)
      setButtonsType(newArray)
    }
    const reasonValue = buttonsType[index].type
    console.log('buttonsType', buttonsType)
    if (reasons.includes(reasonValue)) {
      setReasons(reasons.filter((reason) => reason !== reasonValue))
    } else {
      setReasons([...reasons, reasonValue])
    }
  }

  return (
    <div className="wrap-message">
      {isFirst &&
        buttonsType.map((button: { text: string; type: string }, index: number) => {
          const reasonValue = buttonsType[index].type
          const classNames =
            reasons.includes(reasonValue) || isOtherReasonButton(button)
              ? 'fr-background-action-high--blue-france'
              : 'bg-[white]'

          return (
            <div key={index}>
              <button
                role={feedbackButtonsChoice(button)}
                className={`user-feedback-buttons fr-text-action-high--blue-france ${classNames}`}
                onClick={() => handleClick(index)}
              >
                <p
                  className={
                    reasons.includes(reasonValue) || isOtherReasonButton(button)
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
  console.log('button', button)
  return button.type.includes('tag-')
}
