import { GlobalDiv } from "../Global/GlobalDiv"
import { GlobalRowContainer } from "../Global/GlobalRowContainer"
import { HalfScreenWidth } from "../Global/HalfScreenWidth"

export const    LoginContainer = ({ children }) => {
    return <GlobalRowContainer extraClass='fr-grid-row--center'>
        <GlobalDiv>
            <GlobalRowContainer extraClass='fr-grid-row--center'>
                <HalfScreenWidth>
                    {children}
                </HalfScreenWidth>
            </GlobalRowContainer>
        </GlobalDiv>
    </GlobalRowContainer>
}