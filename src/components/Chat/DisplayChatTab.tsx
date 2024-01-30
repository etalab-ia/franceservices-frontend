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
		<div className="fr-container fr-py-3w ">
			<div className="fr-grid-row fr-grid-row--gutters">
				<ChatMainContainer archive={archive} setGenerate={setGenerate} />
				<ChatAdditionalContainer archive={archive} />
			</div>
		</div>
	)
}
