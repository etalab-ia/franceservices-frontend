export const GlobalSecondaryTitle = ({
  children,
  extraClass,
}: { children: React.ReactNode; extraClass?: string }) => {
  return <h3 className={`text-2xl font-bold ${extraClass}`}>{children}</h3>
}
