import { thankFeedback, thankFeedbackRole } from "../../constants/feedback";

export function	UserFeedbackThanks() {

	return (
		<div role={thankFeedbackRole} className="row-message">
			<div className="pt-6">{thankFeedback}</div>
		</div>
	);
}