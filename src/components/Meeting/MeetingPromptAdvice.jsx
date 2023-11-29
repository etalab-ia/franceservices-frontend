import Input from "@codegouvfr/react-dsfr/Input";
import { meetingParagraph, meetingPromptExamples, meetingSubtitle } from "../../constants/meeting";
import { GlobalColContainer } from "../Global/GlobalColContainer";
import { GlobalParagraph } from "../Global/GlobalParagraph";
import { GlobalSubtitle } from "../Global/GlobalSubtitle";
import { handleTextareaResize } from "../../utils/manageEffects";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { useState } from "react";

export function	MeetingPromptAdvice({ }) {

	const [expandedItems, setExpandedItems] = useState([]);

	const handleToggle = (index) => {
		const updatedExpandedItems = [...expandedItems];
		updatedExpandedItems[index] = !updatedExpandedItems[index];
		setExpandedItems(updatedExpandedItems);
	};

	return <GlobalParagraph>
		<GlobalColContainer>
			{meetingParagraph}
			{meetingPromptExamples.map((ex, index) => (
				<div key={index}>
					<GlobalRowContainer>
						<img className="fr-mr-1w" src={ex.img} alt={ex.alt} />
						<p onClick={() => handleToggle(index)}>
							{ex.title}
							<span className={`fr-icon-arrow-${expandedItems[index] ? 'up' : 'down'}-s-line`} aria-hidden="true"></span>
						</p>
					</GlobalRowContainer>
					{expandedItems[index] && (<p className="fr-mb-1w text-justify">{ex.description}</p>)}
				</div>
			))}
		</GlobalColContainer>
	</GlobalParagraph>
}