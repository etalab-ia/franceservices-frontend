import { primaryButtons } from "../constants/feedback";
import { animated } from '@react-spring/web'

export function UserSatisfaction(props) {

	const	{ activeTab, setActiveTab } = props;

	const	handleClick = (index) => {
		if (activeTab === index)
			setActiveTab(-1);
		else
			setActiveTab(index);
	}

	return (
		<div className="row-message">
			{primaryButtons.map((button, index) => {
				return <animated.button title={button.type} onClick={() => handleClick(index)} key={index} className="user-feedback-buttons"
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