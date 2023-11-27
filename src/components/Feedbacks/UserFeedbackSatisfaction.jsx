import { useDispatch, useSelector } from "react-redux";
import { primaryButtons, satisfactionButton, secondaryButtons } from "../../constants/feedback";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";

export function UserFeedbackSatisfaction({ isFirst, isConfirmed, isArchive }) {
	const	user = useSelector((state) => state.user);
	const	buttons = isFirst ? primaryButtons : secondaryButtons;
	const	dispatch = useDispatch();

	const	handleClick = (index) => {
		dispatch({ type: 'SET_USER_CHOICES', nextKey: 'feedback', nextValue: index });
	}

	return (
		<GlobalRowContainer>
			{buttons.map((button, index) => {
				return <button title={button.type} onClick={() => handleClick(index)} key={index} 
							className={`user-feedback-buttons ${index === user.choices.feedback ? 'bg-purple' : 'bg-white'}`}
							disabled={isConfirmed || isArchive}
					>
						<img alt={satisfactionButton(button.type)} className={index === user.choices.feedback ? "mr-2 brightness-0 invert-[1]" : "mr-2"} src={button.img}/>
						<p className={`${index === user.choices.feedback ? 'text-white' : 'text-purple'}`}>{button.name}</p>
					</button>
			})}
		</GlobalRowContainer>
	);
}