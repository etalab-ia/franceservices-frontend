import { NOT_SET } from "../../constants/status";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { scrollToBottom } from '../../utils/manageEffects';

export function	BotQuestion({ id, choice }) {
	const	user = useSelector((state) => state.user);
	const   buttons = ['Oui', 'Non'];
	const	[buttonChoice, setButtonChoice] = choice === NOT_SET ? useState(NOT_SET) : useState(choice);
	const	dispatch = useDispatch();
	
	useEffect(() => { scrollToBottom(); }, [user]);

	const	handleClick = async(index) => {
		if (user.choices[id] === index)
		{
			setButtonChoice(NOT_SET);
			dispatch({ type: 'SET_USER_CHOICES', nextKey: id, nextValue: NOT_SET });
		}
		else
		{
			setButtonChoice(index);
			dispatch({ type: 'SET_USER_CHOICES', nextKey: id, nextValue: index });
			index === 1 && dispatch({ type: 'CONFIRM_RESSOURCE' });
		}
	}

	return (
		<div className="user-feedback-container">
			<div className="row-message">
				{buttons.map((button, index) => {
					const	classNames = index === buttonChoice ? `bg-purple` : `bg-[white]`;
					const	cursor = buttonChoice !== NOT_SET ? 'cursor-not-allowed' : 'cursor-pointer';

					return <button disabled={buttonChoice !== NOT_SET} onClick={() => handleClick(index)} key={index} className={`user-feedback-buttons ${classNames} ${cursor}`}>
							<p className={index === buttonChoice ? `text-white text-center` : `text-purple text-center`}>{button}</p>
						</button>
				})}
			</div>
		</div>
	);
}