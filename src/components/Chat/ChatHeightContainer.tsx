import { GlobalColContainer } from '../Global/GlobalColContainer'

export function ChatHeightContainer({ children }) {
  return (
    <GlobalColContainer>
      <div className="max-h-screen flex flex-col">{children}</div>
    </GlobalColContainer>
  )
}
