export function ChatOverflowManagementContainer({ children }) {
  return (
    <div className="flex flex-grow overflow-y-scroll overflow-x-hidden">{children}</div>
  )
}
