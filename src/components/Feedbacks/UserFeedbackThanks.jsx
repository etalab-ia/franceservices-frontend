import { thankFeedback, thankFeedbackRole } from "../../constants/feedback";

export function	UserFeedbackThanks() {

	return (
		<div role={thankFeedbackRole} className="row-message">
			<div className="py-4">{thankFeedback}</div>
		</div>
	);
}