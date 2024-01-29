import { GlobalRowContainer } from "../Global/GlobalRowContainer"
import { ChatMainContainer } from "./ChatMainContainer"
import { ChatAdditionalContainer } from "./ChatAdditionalContainer"

/**********************************************************************************************
	
	COMPONENTS:
	
	**	ChatMainContainer: chat div between user & agent

	**	ChatAdditionalContainer: additional informations given to user as sheets

 **********************************************************************************************/

// TODO WHEN BACK IS READY: change archive type
export function DisplayChatTab({ archive, setGenerate }) {
	return (
		<GlobalRowContainer extraClass="fr-grid-row--center">
			<ChatMainContainer archive={archive} setGenerate={setGenerate} />
			<ChatAdditionalContainer archive={archive} />
		</GlobalRowContainer>
	)
}
