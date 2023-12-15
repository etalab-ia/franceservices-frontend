export const    GlobalSecondaryTitle = ({ children, extraClass }) => {
	return (
		<h3 className={`text-2xl font-bold ${extraClass}`}>
			{children}
		</h3>
	);
}