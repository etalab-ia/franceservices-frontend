import { GlobalDiv } from "../components/Global/GlobalDiv"
import { GlobalRowContainer } from "../components/Global/GlobalRowContainer"
import { ContactForm } from "../components/Contact/ContactForm"
import { Dispatch, SetStateAction } from "react"
import { UserAuth } from "src/utils/auth"

export function Contact({ setUserAuth }: { setUserAuth: Dispatch<SetStateAction<UserAuth>> }) {
	return (
		<GlobalRowContainer extraClass="fr-grid-row--center">
			// @ts-expect-error TS(2304) FIXME: Cannot find name 'children'. // @ts-expect-error TS(2304):
			Cannot find name 'children'.
			<GlobalDiv>
				<ContactForm setUserAuth={setUserAuth} />
			</GlobalDiv>
		</GlobalRowContainer>
	)
}
