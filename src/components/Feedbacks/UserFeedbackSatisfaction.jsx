import { useDispatch, useSelector } from "react-redux";
import { primaryButtons, secondaryButtons } from "../../constants/feedback";

export function UserFeedbackSatisfaction({ isFirst, isConfirmed, isArchive }) {
	const	user = useSelector((state) => state.user);
	const	buttons = isFirst ? primaryButtons : secondaryButtons;
	const	dispatch = useDispatch();

	const	handleClick = (index) => {
		dispatch({ type: 'SET_USER_CHOICES', nextKey: 'feedback', nextValue: index });
	}

	return (
		<div className="row-message">
			{buttons.map((button, index) => {
				return <button title={button.type} onClick={() => handleClick(index)} key={index} 
							className={`user-feedback-buttons ${index === user.choices.feedback ? 'bg-purple' : 'bg-white'}`}
							disabled={isConfirmed || isArchive}
					>
						<img className={index === user.choices.feedback ? "mr-2 brightness-0 invert-[1]" : "mr-2"} src={button.img}/>
						<p className={`${index === user.choices.feedback ? 'text-white' : 'text-purple'}`}>{button.name}</p>
					</button>
			})}
		</div>
	);
}