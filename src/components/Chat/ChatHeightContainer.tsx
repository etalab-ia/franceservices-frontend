import { GlobalColContainer } from '../Global/GlobalColContainer'

export function ChatHeightContainer({ children }) {
  return (
    <GlobalColContainer>
      <div className="max-h-[calc(100vh-200px)]  fr-col-12">{children}</div>
    </GlobalColContainer>
  )
}
