import { meetingInputGuidelines, meetingPromptExamples } from '@constants/meeting'
import { useState } from 'react'

/*
 * Advices and examples of good and bad prompts
 */
export function MeetingPromptAdvice() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)

  const handleToggleAll = () => {
    setIsAccordionOpen(!isAccordionOpen)
  }

  return (
    <>
      <div>{meetingInputGuidelines}</div>
      <div className={'flex '} onClick={handleToggleAll}>
        <p
          className="fr-text-mention--grey fr-text--xs hover:cursor-pointer "
          style={{ margin: 0, padding: 0 }}
        >
          Voir des exemples
        </p>
        <span
          className={`fr-text-mention--grey fr-icon--sm fr-icon-arrow-${
            isAccordionOpen ? 'up' : 'down'
          }-s-line fr-my-1v hover:cursor-pointer`}
        ></span>
      </div>
      {meetingPromptExamples.map((ex, index) => (
        <div
          className="fr-mt-1w"
          key={index}
          style={{ display: isAccordionOpen ? 'block' : 'none' }}
        >
          <div className="flex ">
            <img src={ex.img} alt={ex.alt} className="mr-2" />

            {ex.title}
          </div>
          <div className="mb-4 text-justify fr-text--xs">{ex.description}</div>
        </div>
      ))}
    </>
  )
}
