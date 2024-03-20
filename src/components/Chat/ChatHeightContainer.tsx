import { GlobalColContainer } from '../Global/GlobalColContainer'

export function ChatHeightContainer({ children }) {
  return (
    <GlobalColContainer>
      <div className="max-h-[calc(100vh-200px)] flex flex-col">{children}</div>
    </GlobalColContainer>
  )
}
