import { sideButtonsProps, sideInformationProps } from '../../constants/sideButtons';

export function SideTabs(props) {
	const	{ state, dispatch } = props;

	const handleClick = (index) => {
		dispatch({ type: 'SET_ACTIVE_TAB', nextActiveTab: index});
	};

	return (
		<div className="side-tools-container ">
			{sideButtonsProps.map((buttonProps, index) => (
				<button
					key={index}
					className={`side-tools ${index === state.activeTab ? 'bg-purple' : ''}`}
					onClick={() => handleClick(index)}
				>
					<img 
						style={{filter: index === state.activeTab ? "brightness(0) invert(1)" : "none"}} 
						src={buttonProps.image}
						alt={buttonProps.alt}
						title={buttonProps.title}
					/>
				</button>
			))}
			{/* <div className='side-tools'>
				<img src={sideInformationProps.image}
				alt={sideInformationProps.alt}
				title={sideInformationProps.title}/>
			</div> */}
		</div>
	);
}