export const    GlobalStream = ({ response, extraClass }) => {
	return <div className={`text-justify ${extraClass}`}>
		{response.map((item, index) => (
			<span key={index}>{item}</span>
		))}
	</div>
}