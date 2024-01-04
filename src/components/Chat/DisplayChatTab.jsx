import { GlobalRowContainer } from "../Global/GlobalRowContainer"
import { ChatMainContainer } from "./ChatMainContainer"
import { ChatAdditionalContainer } from "./ChatAdditionalContainer"

export function DisplayChatTab({ archive }) {
	return (
		<GlobalRowContainer extraClass="fr-grid-row--center">
			<ChatMainContainer archive={archive} />
			<ChatAdditionalContainer archive={archive} />
		</GlobalRowContainer>
	)
}
