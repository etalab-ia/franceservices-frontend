import {
  feedbackButtonsChoice,
  satisfiedButtons,
  unsatisfiedButtons,
} from '../../constants/feedback'

export function ButtonsOptions({
  isFirst,
  buttonsType,
  reasons,
  setReasons,
}: {
  isFirst: boolean
  buttonsType: typeof satisfiedButtons | typeof unsatisfiedButtons
  reasons: string[]
  setReasons: (reasons: string[]) => void
}) {
  buttonsType
  const handleClick = (index: number) => {
    const reasonValue = Object.values(buttonsType[index])[0]

    if (reasons.includes(reasonValue)) {
      setReasons(reasons.filter((reason) => reason !== reasonValue))
    } else {
      setReasons([...reasons, reasonValue])
      if (reasonValue === 'other') return
    }
  }

  return (
    <div className="wrap-message">
      {isFirst &&
        buttonsType.map((button, index: number) => {
          const reasonValue = Object.values(buttonsType[index])[0]
          const classNames = reasons.includes(reasonValue)
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
                    reasons.includes(reasonValue)
                      ? 'text-white'
                      : 'fr-text-action-high--blue-france'
                  }
                >
                  {Object.keys(button)[0]}
                </p>
              </button>
            </div>
          )
        })}
    </div>
  )
}
