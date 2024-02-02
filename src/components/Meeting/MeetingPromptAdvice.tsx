import { useState } from 'react'
import {
  meetingExamplesTitle,
  meetingInputGuidelines,
  meetingPromptExamples,
} from '../../constants/meeting'
import { GlobalColContainer } from '../Global/GlobalColContainer'
import { GlobalParagraph } from '../Global/GlobalParagraph'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'

/*
 * Advices and examples of good and bad prompts
 */
export function MeetingPromptAdvice({}) {
  const [expandedItems, setExpandedItems] = useState([])
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)

  const handleToggleAll = () => {
    setIsAccordionOpen(!isAccordionOpen)
  }

  /*   const handleToggleItem = (index) => {
    const updatedExpandedItems = [...expandedItems]

    updatedExpandedItems[index] = !updatedExpandedItems[index]
    setExpandedItems(updatedExpandedItems)
  }
 */
  return (
    <>
      <GlobalColContainer>
        <div>{meetingInputGuidelines}</div>
        <div className={'flex '} onClick={handleToggleAll}>
          {meetingExamplesTitle}
          <span
            className={`fr-text-mention--grey fr-icon--sm fr-icon-arrow-${
              isAccordionOpen ? 'up' : 'down'
            }-s-line fr-my-1v`}
          ></span>
        </div>
        {meetingPromptExamples.map((ex, index) => (
          <div
            className="fr-mt-1w"
            key={index}
            style={{ display: isAccordionOpen ? 'block' : 'none' }}
          >
            <div className="flex content-center items-center justify-start">
              <img className="w-6 h-6 mr-2" src={ex.img} alt={ex.alt} />
              <p className="self-center">{ex.title}</p>
            </div>

            <p className="mb-4 text-justify text-xs">{ex.description}</p>
          </div>
        ))}
      </GlobalColContainer>
    </>
  )
}
