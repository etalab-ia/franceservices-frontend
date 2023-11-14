import { useEffect, useState } from "react";
import { satisfiedButtons, unsatisfiedButtons } from "../../constants/feedback";
import { useDispatch } from 'react-redux';
import { useKeyPress } from "../../utils/manageEffects";
import { UserFeedbackResume } from "./UserFeedbackResume";
import { useSelector } from 'react-redux';
import { ButtonsOptions } from "./ButtonsOptions";
import { ConfirmationButton } from "./ConfirmationButton";
import { InputOption } from "./InputOption";

export function	UserFeedbackOptions({ activeTab, isFirst }) {
	const	[reasons, setReasons] = useState([]);
	const	[otherReason, setOtherReason] = useState('');
	const	[buttonsType, setButtonsType] = useState(activeTab === 0 ? satisfiedButtons : unsatisfiedButtons);
	const	feedback = useSelector((state) => state.feedback);
	const	dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: 'RESET_FEEDBACK'});
		setReasons([]);
		setButtonsType(activeTab === 0 ? satisfiedButtons : unsatisfiedButtons);
	}, [activeTab]);

	useKeyPress((e) => {
		if (e.key === 'Enter' && e.target.name === 'otherReason' && otherReason) {
			otherReason && !reasons.includes(otherReason) && dispatch({ type: 'SET_NEW_FEEDBACK', nextFeedback: otherReason });
			e.target.value = '';
			setOtherReason('');
			setReasons(reasons.filter(reason => reason !== 'Autre raison'));
		}
	});

	return (
		<div className="col-message">
			<ButtonsOptions
				isFirst={isFirst}
				buttonsType={buttonsType}
				reasons={reasons}
				setReasons={setReasons}
				dispatch={dispatch}
			/>
			<InputOption 
				reasons={reasons} 
				setOtherReason={setOtherReason} 
				isFirst={isFirst}
			/>
			<UserFeedbackResume />
			<ConfirmationButton 
				reasons={reasons}
				otherReason={otherReason}
				feedback={feedback}
				dispatch={dispatch}
			/>
		</div>
	);
}