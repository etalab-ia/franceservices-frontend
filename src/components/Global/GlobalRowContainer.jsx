export const GlobalRowContainer = ({ children, extraClass }) => {
	return <div className={`fr-grid-row fr-grid-row-gutters ${extraClass}`}>{children}</div>
}
