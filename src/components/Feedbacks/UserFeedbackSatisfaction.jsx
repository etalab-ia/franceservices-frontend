import { useDispatch, useSelector } from "react-redux";
import { primaryButtons, secondaryButtons } from "../../constants/feedback";
import { animated } from '@react-spring/web'
import { NOT_SET } from "../../constants/status";

export function UserFeedbackSatisfaction(props) {

	const	{ isFirst, isConfirmed } = props;
	const	user = useSelector((state) => state.user);
	const	dispatch = useDispatch();
	const	buttons = isFirst ? primaryButtons : secondaryButtons;

	const	handleClick = (index) => {
		if (user.choices.feedback === index)
			dispatchEvent({ type: 'SET_USER_CHOICES', nextKey: 'feedback', nextValue: NOT_SET });
		else
			dispatch({ type: 'SET_USER_CHOICES', nextKey: 'feedback', nextValue: index });
	}

	return (
		<div className="row-message">
			{buttons.map((button, index) => {
				return <animated.button title={button.type} onClick={() => handleClick(index)} key={index} 
							className={`user-feedback-buttons border-solid ${index === user.choices.feedback ? 'bg-purple' : 'bg-white'}`}
							disabled={isConfirmed}
					>
						<img className="mr-2" style={{ filter: index === user.choices.feedback ? "brightness(0) invert(1)" : "none" }} src={button.img}/>
						<p className={`${index === user.choices.feedback ? 'text-white' : 'text-purple'}`}>{button.name}</p>
					</animated.button>
			})}
		</div>
	);
}