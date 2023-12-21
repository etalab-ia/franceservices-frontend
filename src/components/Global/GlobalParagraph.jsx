export const GlobalParagraph = ({ children, extraClass }) => {
	return (
	  	<p className={`text-justify fr-my-1w ${extraClass}`}>
			{typeof children !== 'string' ? 
				children
			:
				children.split('\n').map((line, lineIndex) => (
					<span key={lineIndex}>
						{lineIndex > 0 && <br />}
						{line}
					</span>
				))
			}
		</p>
	);
};