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
    <div className="fr-container fr-grid-row fr-grid-row--center h-full">
      <div className="fr-col-8  fr-grid-row--center">
        <div className="fr-h1  fr-mt-5w fr-mb-3w">Bonjour, je suis Albert</div>
        <p className="fr-text--xl fr-mb-4w">
          Je suis un outil d’intelligence artificielle interministériel prêt à répondre à
          vos questions administratives. Quelle est votre question aujourd'hui ?
        </p>
        <ChatInfoCard />
        <div className="fr-grid-row fr-grid-row--gutters">
          <ChatMainContainer archive={archive} setGenerate={setGenerate} />
          {/*         <ChatAdditionalContainer archive={archive} />
           */}{' '}
        </div>
      </div>
    </div>
  )
}

function ChatInfoCard() {
  return (
    <div className="fr-grid-row ">
      <span
        className="fr-icon-info-fill fr-text-action-high--blue-france"
        aria-hidden="true"
      ></span>
    </div>
  )
}
