import { feedbackButtonsChoice } from '../../constants/feedback'

export const ButtonsOptions = ({ isFirst, buttonsType, reasons, setReasons }) => {
  const handleClick = (index) => {
    if (reasons.includes(buttonsType[index])) {
      setReasons(reasons.filter((reason) => reason !== buttonsType[index]))
    } else {
      setReasons([...reasons, buttonsType[index]])
      if (buttonsType[index] === 'Autre raison') return
    }
  }

  return (
    <div className="wrap-message">
      {isFirst &&
        buttonsType.map((button, index) => {
          const classNames = reasons.includes(buttonsType[index])
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
                    reasons.includes(buttonsType[index])
                      ? 'text-white'
                      : 'fr-text-action-high--blue-france'
                  }
                >
                  {button}
                </p>
              </button>
            </div>
          )
        })}
    </div>
  )
}
