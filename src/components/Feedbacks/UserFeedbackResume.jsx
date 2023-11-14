import { useSelector } from 'react-redux';
import { feedbackResume } from '../../constants/feedback';

export function	UserFeedbackResume() {
	const	feedback = useSelector((state) => state.feedback);

	return (
		<div role={feedbackResume} className="col-message">
			<div className="wrap-message">
				{feedback.reasons.map((button, index) => (
					<div key={index} className="user-feedback-resume">
						<p>{button}</p>
					</div>
				))}
			</div>
		</div>
	);
}