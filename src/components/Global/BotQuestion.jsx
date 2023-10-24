import { animated } from '@react-spring/web'
import { NOT_SET } from "../../constants/status";
import { useDispatch, useSelector } from "react-redux";

export function	BotQuestion({ id }) {
	const	user = useSelector((state) => state.user);
	const   buttons = ['Oui', 'Non'];
	const	dispatch = useDispatch();

	const	handleClick = async(index) => {
		if (user.choices[id] === index)
			dispatch({ type: 'SET_USER_CHOICES', nextKey: id, nextValue: NOT_SET });
		else
		{
			dispatch({ type: 'SET_USER_CHOICES', nextKey: id, nextValue: index });
			index === 1 && dispatch({ type: 'CONFIRM_RESSOURCE' });
		}
	}

	return (
		<div className="user-feedback-container">
			<div className="row-message">
				{buttons.map((button, index) => {
					const	classNames = index === user.choices[id] ? `bg-purple` : `bg-[white]`;
					const	cursor = user.choices[id] !== NOT_SET ? 'cursor-not-allowed' : 'cursor-pointer';

					return <animated.button disabled={user.choices[id] !== NOT_SET} onClick={() => handleClick(index)} key={index} className={`user-feedback-buttons ${classNames} ${cursor}`}>
							<p className={index === user.choices[id] ? `text-white` : `text-purple`}>{button}</p>
						</animated.button>
				})}
			</div>
		</div>
	);
}