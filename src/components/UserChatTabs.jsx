import { animated } from '@react-spring/web'
import { sideButtonsProps, sideInformationProps } from '../constants/sideButtons';

export function UserTools(props) {

	const	{ state, dispatch } = props;

	const handleClick = (index) => {
		dispatch({ type: 'SET_ACTIVE_TAB', nextActiveTab: index})
	};

	return (
		<div className="side-tools-container ">
			{sideButtonsProps.map((buttonProps, index) => (
				<animated.button
					key={index}
					className='side-tools'
					style={{ backgroundColor: index === state.activeTab ? "#6A6AF4" : "#F5F5FE"}}
					onClick={() => handleClick(index)}
				>
					<img 
						style={{filter: index === state.activeTab ? "brightness(0) invert(1)" : "none"}} 
						src={buttonProps.image}
						alt={buttonProps.alt}
						title={buttonProps.title}
					/>
				</animated.button>
			))}
			<animated.div className='side-tools'>
				<img src={sideInformationProps.image}
				alt={sideInformationProps.alt}
				title={sideInformationProps.title}/>
			</animated.div>
		</div>
	);
}