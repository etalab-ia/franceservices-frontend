import type { RootState } from '@types'
import { UserMessage } from 'components/User/UserMessage'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { ChatAdditionalContainer } from './ChatAdditionalContainer'
import { ChatMainContainer } from './ChatMainContainer'

/**********************************************************************************************
	
	COMPONENTS:
	
	**	ChatMainContainer: chat div between user & agent

	**	ChatAdditionalContainer: additional informations given to user as sheets

 **********************************************************************************************/

export function DisplayChatTab({
  archive,
  setGenerate,
}: { archive: boolean; setGenerate: any }) {
  const user = useSelector((state: RootState) => state.user)
  const [questionInput, setQuestionInput] = useState('')

  return (
    <div className="fr-container fr-grid-row fr-grid-row--center h-full">
      <div className="fr-col-md-8 h-[85vh] overflow-scroll ">
        {user.messages.length <= 0 && <NewChatHeader />}
        <ChatMainContainer archive={archive} setQuestionInput={setQuestionInput} />
      </div>
      <UserMessage
        setGenerate={setGenerate}
        questionInput={questionInput}
        setQuestionInput={setQuestionInput}
      />
    </div>
  )
}

function NewChatHeader() {
  return (
    <div>
      <div className="fr-h1 fr-mt-5w  fr-mb-3w">Bonjour, je suis Albert</div>
      <p className="fr-text--xl fr-mb-4w">
        Je suis un outil d’intelligence artificielle interministériel prêt à répondre à
        vos questions administratives. Quelle est votre question aujourd'hui ?
      </p>
      <div className="fr-grid-row fr-grid-row--middle fr-mb-4w fr-background-alt--blue-france fr-p-2w">
        <span
          className="fr-col-1 fr-icon-info-fill fr-text-action-high--blue-france "
          aria-hidden="true"
        ></span>
        <p className="fr-col">
          Je suis toujours en plein développement, et ne demande qu'à m'améliorer !
          N’hésitez pas à faire des retours sur les résultats que je vous propose pour me
          dire vous les trouvez bien 👍 ou non 👎.
        </p>
      </div>
      <div className="fr-mb-3v fr-text--lg">
        Si vous ne savez pas quelle question me poser, voici quelques suggestions :
      </div>
    </div>
  )
}
