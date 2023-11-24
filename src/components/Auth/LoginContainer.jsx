import { GlobalDiv } from "../Global/GlobalDiv"
import { GlobalRowContainer } from "../Global/GlobalRowContainer"
import { HalfScreenWidth } from "../Global/HalfScreenWidth"

export const    LoginContainer = ({ children }) => {
    return <GlobalRowContainer>
        <GlobalDiv>
            <GlobalRowContainer>
                <HalfScreenWidth>
                    {children}
                </HalfScreenWidth>
            </GlobalRowContainer>
        </GlobalDiv>
    </GlobalRowContainer>
}