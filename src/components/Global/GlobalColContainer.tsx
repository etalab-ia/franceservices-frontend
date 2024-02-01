interface GlobalColContainerProps {
  children: React.ReactNode
  extraClass?: string
}

export const GlobalColContainer = ({ children, extraClass }: GlobalColContainerProps) => {
  return (
    <div className={`fr-col fr-mr-2w fr-grid-col--center ${extraClass}`}>{children}</div>
  )
}
