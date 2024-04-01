import { GlobalColContainer } from '../Global/GlobalColContainer'

export function StreamingMessage({ children }) {
  return (
    <GlobalColContainer>
      <div className="streaming fr-mb-4w  w-full ">
        <p>{children}</p>
      </div>
    </GlobalColContainer>
  )
}
