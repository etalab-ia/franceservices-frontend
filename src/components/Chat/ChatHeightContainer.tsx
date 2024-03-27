import { GlobalColContainer } from '../Global/GlobalColContainer'

export function ChatHeightContainer({ children }) {
  return (
    <GlobalColContainer>
      <div className="max-h-[calc(100vh-100px)] bg-blue-200">{children}</div>
    </GlobalColContainer>
  )
}
