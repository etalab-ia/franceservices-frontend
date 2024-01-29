export const GlobalDiv = ({ children, props }: { children: React.ReactNode; props?: any }) => {
	return <div className={`fr-my-5w w-3/4 ${props}`}>{children}</div>
}
