import { askingQualityPrecisions, primaryButtons, secondaryButtons } from "../../constants/feedback";
import { UserFeedbackOptions } from "./UserFeedbackOptions";
import { UserFeedbackThanks } from "./UserFeedbackThanks";
import { UserFeedbackResume } from "./UserFeedbackResume";

export function	UserFeedbackInput({ activeTab, isFirst, isConfirmed, setIsConfirmed }) {
	const	buttons = isFirst ? primaryButtons : secondaryButtons;
	
	return (
		<>
			{!isConfirmed ?
				<div>
					<p className="mt-4">{askingQualityPrecisions(buttons[activeTab].type)}</p>
					<UserFeedbackOptions activeTab={activeTab} isFirst={isFirst} setIsConfirmed={setIsConfirmed}/>
				</div>
				:
				<div>
					<UserFeedbackResume />
					<UserFeedbackThanks />
				</div>
			}	
		</>
	);
}