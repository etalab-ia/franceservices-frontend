import { animated } from '@react-spring/web'
import { sideButtonsProps } from '../constants/sideButtons';
import { useState } from 'react';

export function UserTools(props) {

	const	{ state, dispatch } = props;
	const [activeButton, setActiveButton] = useState(0);

	const handleClick = (index) => {
		setActiveButton(index);
	};

	return (
		<div className="side-tools-container">
			{sideButtonsProps.map((buttonProps, index) => (
				<animated.button
				key={index}
				className='side-tools'
				style={{ backgroundColor: index === activeButton ? "#6A6AF4" : "#F5F5FE"}}
				onClick={() => handleClick(index)}
				>
					<img 
						style={{filter: index === activeButton ? "brightness(0) invert(1)" : "none"}} 
						src={buttonProps.image} alt={buttonProps.alt}
					/>
				</animated.button>
			))}
		</div>
	);
}