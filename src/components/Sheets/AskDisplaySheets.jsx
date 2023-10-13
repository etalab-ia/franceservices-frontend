import { useState } from "react";
import { animated } from '@react-spring/web'
import { styleButton } from "../../style/style";
import { NOT_SET } from "../../constants/status";

export function	AskDisplaySheets(props) {

	const	{ setDisplay } = props;
	const	[activeTab, setActiveTab] = useState(NOT_SET);
	const   buttons = ['Oui', 'Non'];

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
		}
	}

	return (
		<div className="user-feedback-container">
			<div className="row-message">
				{buttons.map((button, index) => {
					return (<animated.button onClick={() => handleClick(index)} key={index} className="user-feedback-buttons"
							style={styleButton(index, activeTab)}
						>
							<p style={{color: index === activeTab ? "white" : "#6A6AF4" }}>{button}</p>
						</animated.button>
				)})}
			</div>
		</div>
	);
}