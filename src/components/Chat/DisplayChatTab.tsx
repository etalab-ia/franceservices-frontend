import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { ChatAdditionalContainer } from './ChatAdditionalContainer'
import { ChatMainContainer } from './ChatMainContainer'

/**********************************************************************************************
	
	COMPONENTS:
	
	**	ChatMainContainer: chat div between user & agent

	**	ChatAdditionalContainer: additional informations given to user as sheets

 **********************************************************************************************/

// TODO WHEN BACK IS READY: change archive type
export function DisplayChatTab({
  archive,
  setGenerate,
}: { archive: boolean; setGenerate: any }) {
  return (
    <div className="fr-container fr-py-3w ">
      <div className="fr-grid-row fr-grid-row--gutters">
        <ChatMainContainer archive={archive} setGenerate={setGenerate} />
        <ChatAdditionalContainer archive={archive} />
      </div>
    </div>
  )
}
