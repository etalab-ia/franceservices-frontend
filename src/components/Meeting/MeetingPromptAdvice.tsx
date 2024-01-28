import {
	meetingExamplesTitle,
	meetingParagraph,
	meetingPromptExamples,
} from "../../constants/meeting"
import { GlobalColContainer } from "../Global/GlobalColContainer"
import { GlobalParagraph } from "../Global/GlobalParagraph"
import { GlobalRowContainer } from "../Global/GlobalRowContainer"
import { useState } from "react"

export function MeetingPromptAdvice({}) {
	const [expandedItems, setExpandedItems] = useState([])
	const [isAccordionOpen, setIsAccordionOpen] = useState(false)

	const handleToggleAll = () => {
		setIsAccordionOpen(!isAccordionOpen)
	}

	const handleToggleItem = (index) => {
		const updatedExpandedItems = [...expandedItems]

		updatedExpandedItems[index] = !updatedExpandedItems[index]
		setExpandedItems(updatedExpandedItems)
	}

	return (
		<>
			<GlobalColContainer>
// @ts-expect-error TS(2304) FIXME: Cannot find name 'childr'.
// @ts-expect-error TS(2304): Cannot find name 'childr'.
// @ts-expect-error TS(2741): Property 'extraClass' is missing in type '{ childr... Remove this comment to see the full error message
// @ts-expect-error TS(2304): Cannot find name 'childr'.
// @ts-expect-error TS(2741) FIXME: Property 'extraClass' is missing in type '{ childr... Remove this comment to see the full error message
// @ts-expect-error TS(2741): Property 'extraClass' is missing in type '{ childr... Remove this comment to see the full error message
				<GlobalParagraph>{meetingParagraph}</GlobalParagraph>
				<p className={`fr-my-2w`} onClick={handleToggleAll}>
					{meetingExamplesTitle}
					<span
						className={`fr-icon-arrow-${isAccordionOpen ? "up" : "down"}-s-line fr-my-2w`}
					></span>
				</p>
				{meetingPromptExamples.map((ex, index) => (
					<div key={index} style={{ display: isAccordionOpen ? "block" : "none" }}>
						<GlobalRowContainer>
							<img className="fr-mr-1w" src={ex.img} alt={ex.alt} />
							<p onClick={() => handleToggleItem(index)}>
								{ex.title}
								<span
									className={`fr-icon-arrow-${expandedItems[index] ? "up" : "down"}-s-line`}
									aria-hidden="true"
								></span>
							</p>
						</GlobalRowContainer>
						{expandedItems[index] && <p className="fr-mb-1w text-justify">{ex.description}</p>}
					</div>
				))}
			</GlobalColContainer>
		</>
	)
}
