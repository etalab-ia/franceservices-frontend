import { useState } from "react";
import { animated } from '@react-spring/web'
import { NOT_SET } from "../../constants/status";
import { useDispatch } from "react-redux";

export function	BotQuestion({ setDisplay }) {
	const	[activeTab, setActiveTab] = useState(NOT_SET);
	const   buttons = ['Oui', 'Non'];
	const	dispatch = useDispatch();

	const	handleClick = async(index) => {
		if (activeTab === index)
		{
			setActiveTab(NOT_SET);
			setDisplay(NOT_SET);
		}
		else
		{
			setActiveTab(index);
			index === 0 ? setDisplay(true) : setDisplay(false);
			index === 1 && dispatch({ type: 'CONFIRM_RESSOURCE' });
		}
	}

	return (
		<div className="user-feedback-container">
			<div className="row-message">
				{buttons.map((button, index) => {
					const	classNames = index === activeTab ? "bg-[#6A6AF4]" : "bg-[white]";

					return <animated.button onClick={() => handleClick(index)} key={index} className={`user-feedback-buttons ${classNames}`}>
							<p style={{color: index === activeTab ? "white" : "#6A6AF4" }}>{button}</p>
						</animated.button>
				})}
			</div>
		</div>
	);
}