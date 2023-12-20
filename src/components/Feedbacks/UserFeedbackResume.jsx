import { useSelector } from 'react-redux';
import { feedbackResume } from '../../constants/feedback';
import { Tag } from "@codegouvfr/react-dsfr/Tag";

export function	UserFeedbackResume() {
	const	feedback = useSelector((state) => state.feedback);

	return (
		<div role={feedbackResume} className="wrap-message fr-mb-2w">
			{feedback.reasons.map((button, index) => (
				<Tag key={index} className='fr-m-1v'>{button}</Tag>
			))}
		</div>
	);
}