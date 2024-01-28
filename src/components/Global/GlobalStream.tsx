export const GlobalStream = ({
	response,
	extraClass,
}: { response: any[]; extraClass?: string }) => {
	return (
		<div className={`text-justify ${extraClass}`}>
			{response.map((item, index) => (
				<span key={index}>
					{item.split("\n").map((line, lineIndex) => (
						<span key={lineIndex}>
							{lineIndex > 0 && <br />}
							{line}
						</span>
					))}
				</span>
			))}
		</div>
	)
}
