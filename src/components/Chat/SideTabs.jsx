import { sideButtonsProps } from '../../constants/sideButtons';

export function SideTabs({ state, dispatch }) {
	const	handleClick = (index) => {
		dispatch({ type: 'RESET_ARCHIVE_TAB', nextActiveTab: index});
		dispatch({ type: 'SET_ACTIVE_TAB', nextActiveTab: index});
	};

	return (
		<div>
			<div className="side-tools-container">
				{sideButtonsProps.map((buttonProps, index) => (
					<button
						key={index}
						className={`side-tools ${index === state.activeTab ? 'bg-purple' : ''}`}
						onClick={() => handleClick(index)}
					>
						<img
							className={index === state.activeTab ? "brightness-0 invert-[1]" : ""}
							src={buttonProps.image}
							alt={buttonProps.alt}
							title={buttonProps.title}
						/>
					</button>
				))}
			</div>
		</div>
	);
}