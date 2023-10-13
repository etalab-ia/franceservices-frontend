import { useSelector } from 'react-redux';

export function	UserFeedbackResume() {

	const	feedback = useSelector((state) => state.feedback);

	return (
		<div className="col-message">
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