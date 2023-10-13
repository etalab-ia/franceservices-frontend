import { thankFeedback } from "../../constants/feedback";

export function	UserFeedbackThanks() {

	return (<div className="row-message">
			<div className="pt-6">{thankFeedback}</div>
		</div>
	);
}