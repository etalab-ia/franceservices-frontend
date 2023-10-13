import { useEffect, useState } from "react";
import { satisfiedButtons, unsatisfiedButtons } from "../../constants/feedback";
import { animated } from '@react-spring/web';
import { styleButton, styleParagraph } from "../../style/style";
import { useDispatch } from 'react-redux';
import { Input } from "@codegouvfr/react-dsfr/Input";
import { useKeyPress } from "../../utils/manageEffects";
import { UserFeedbackResume } from "./UserFeedbackResume";
import { useSelector } from 'react-redux';

export function	UserFeedbackOptions(props) {

	const	{ activeTab, setIsConfirmed } = props;
	const	[reasons, setReasons] = useState([]);
	const	[otherReason, setOtherReason] = useState('');
	const	[buttonsType, setButtonsType] = useState(activeTab === 0 ? satisfiedButtons : unsatisfiedButtons);
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

	const	handleClick = (index) => {
		if (reasons.includes(buttonsType[index]))
		{
			setReasons(reasons.filter(reason => reason !== buttonsType[index]));
			dispatch({ type: 'RM_FEEDBACK', rmFeedback: buttonsType[index] });
		}
		else
		{
			setReasons([...reasons, buttonsType[index]]);
			if (buttonsType[index] === 'Autre raison')
				return ;
			dispatch({ type: 'SET_NEW_FEEDBACK', nextFeedback: buttonsType[index] });
		}
	}

	const	handleConfirm = () => {
		otherReason && !reasons.includes(otherReason) && dispatch({ type: 'SET_NEW_FEEDBACK', nextFeedback: otherReason });		
		setIsConfirmed(true);
	}

	const	handleNewReason = (e) => { setOtherReason(e.target.value); }

	return (
		<div className="col-message">
			<div className="wrap-message">
				{buttonsType.map((button, index) => (
					<div key={index}>
						<animated.button
							className="user-feedback-buttons"
							style={styleButton(buttonsType[index], reasons)}
							onClick={() => handleClick(index)}
						>
							<p style={styleParagraph(buttonsType[index], reasons)}>
								{button}
							</p>
						</animated.button>
					</div>
				))}
			</div>	
			{reasons.includes('Autre raison') &&
				<Input
					className="w-[500px]"
					onChange={handleNewReason}
					iconId="fr-icon-arrow-right-line"
					nativeInputProps={{
						name: 'otherReason',
						placeholder: 'Donner d’autres raisons, autant que vous le souhaitez.'
					}}
				/>}
			<UserFeedbackResume />
			<button
				onClick={handleConfirm}
				className="px-2 py-1 mt-2 font-bold w-fit"
				style={{
					border: reasons.length ? "1px #000091 solid" : "1px grey solid",
					color:  reasons.length ? "#000091" : "grey"
				}}>
					Confirmer
			</button>
			</div>
	);
}