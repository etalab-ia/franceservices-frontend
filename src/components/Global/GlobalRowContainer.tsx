interface GlobalRowContainerProps {
	children: React.ReactNode
	extraClass?: string
}

export const GlobalRowContainer = ({ children, extraClass }: GlobalRowContainerProps) => {
	return <div className={`fr-grid-row fr-grid-row-gutters ${extraClass}`}>{children}</div>
}
