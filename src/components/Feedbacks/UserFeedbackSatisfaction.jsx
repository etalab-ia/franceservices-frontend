import { primaryButtons, secondaryButtons } from "../../constants/feedback";
import { animated } from '@react-spring/web'

export function UserFeedbackSatisfaction(props) {

	const	{ activeTab, isFirst, setActiveTab, isConfirmed } = props;
	const	buttons = isFirst ? primaryButtons : secondaryButtons;

	const	handleClick = (index) => {
		activeTab === index ? setActiveTab(-1) : setActiveTab(index);
	}

	return (
		<div className="row-message">
			{buttons.map((button, index) => {
				return <animated.button title={button.type} onClick={() => handleClick(index)} key={index} className="user-feedback-buttons"
							disabled={isConfirmed}
						style={{ 
							backgroundColor: index === activeTab ? "#6A6AF4" : "white", 
							borderStyle: "solid"
						}}
					>
						<img className="mr-2" style={{ filter: index === activeTab ? "brightness(0) invert(1)" : "none" }} src={button.img}/>
						<p style={{color: index === activeTab ? "white" : "#6A6AF4" }}>{button.name}</p>
					</animated.button>
			})}
		</div>
	);
}