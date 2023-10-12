import { useEffect, useState } from "react";
import { satisfiedButtons, unsatisfiedButtons } from "../constants/feedback";
import { animated } from '@react-spring/web';
import { styleButton, styleParagraph } from "../style/style";
import { useDispatch } from 'react-redux';
import { Input } from "@codegouvfr/react-dsfr/Input";

export function	UserFeedbackButtons(props) {

	const	{ activeTab, setIsConfirmed } = props;
	const	[reasons, setReasons] = useState([]);
	const	[otherReason, setOtherReason] = useState('');
	const	[buttonsType, setButtonsType] = useState(activeTab === 0 ? satisfiedButtons : unsatisfiedButtons);
	const	dispatch = useDispatch();

	useEffect(() => {
		setReasons([]);
		setButtonsType(activeTab === 0 ? satisfiedButtons : unsatisfiedButtons);
	}, [activeTab]);

	const	handleClick = (index) => {
		if (reasons.includes(index))
			setReasons(reasons.filter(reason => reason !== index));
		else
			setReasons([...reasons, index]);
	}

	const	handleConfirm = () => {
		buttonsType.map((reason) => dispatch({ type: 'SET_NEW_FEEDBACK', nextFeedback: reason }))
		otherReason && dispatch({ type: 'SET_NEW_FEEDBACK', nextFeedback: otherReason });
		
		setIsConfirmed(true);
	}

	const	handleNewReason = (e) => { setOtherReason(e.target.value); }
	
	return (
		<div className="col-message">
		<div className="user-feedback-buttons-container">
			{buttonsType.map((button, index) => (
				<div key={index}>
					<animated.button
						className="user-feedback-buttons"
						style={styleButton(index, reasons)}
						onClick={() => handleClick(index)}
					>
						<p style={styleParagraph(index, reasons)}>
							{button}
						</p>
					</animated.button>
				</div>
			))}		</div>	
			{reasons.includes(5) &&
				<Input
					className="w-[500px]"
					onChange={handleNewReason}
					iconId="fr-icon-arrow-right-line"
					nativeInputProps={{
						placeholder: 'Donner d’autres raisons, autant que vous le souhaitez.'
					}}
				/>}
			<button
				onClick={handleConfirm}
				className="px-2 py-1 font-bold w-fit"
				style={{
					border: reasons.length ? "1px #000091 solid" : "1px grey solid",
					color:  reasons.length ? "#000091" : "grey"
				}}>
					Confirmer
			</button>
			</div>
	);
}