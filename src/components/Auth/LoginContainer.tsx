import { GlobalDiv } from '../Global/GlobalDiv'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'

export const LoginContainer = ({ children }) => {
  return (
    <GlobalRowContainer extraClass="fr-grid-row--center">
      <GlobalDiv>
        <GlobalRowContainer extraClass="fr-grid-row--center">
          <div className="w-1/2">{children}</div>
        </GlobalRowContainer>
      </GlobalDiv>
    </GlobalRowContainer>
  )
}
