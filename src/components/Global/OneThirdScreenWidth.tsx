export function OneThirdScreenWidth({
  children,
  extraClass,
}: { children: React.ReactNode; extraClass?: string }) {
  return <div className={`md:w-1/3 ${extraClass} `}>{children}</div>
}
