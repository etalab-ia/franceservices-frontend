import { ressourcesTitle, toolsTitle } from '@constants/home'
import {
  MFSressourcesTiles,
  MFStoolsTiles,
  generalistRessourcesTiles,
  toolsTiles,
} from '@constants/inputFields'
import { isMFSContext } from '@utils/context/isMFSContext'
import { useContext } from 'react'
import { GlobalDiv } from '../components/Global/GlobalDiv'
import { GlobalTitle } from '../components/Global/GlobalTitle'
import { HomeTiles } from '../components/Home/HomeTiles'
import { fr } from '@codegouvfr/react-dsfr'

export function Home() {
  const isMFS = useContext(isMFSContext)
  const tiles = isMFS ? MFSressourcesTiles : generalistRessourcesTiles
  const chat = {
    title: 'Chat',
    numberOfMessages: 3,
  }
  return (
    <div className="fr-container">
      <GlobalDiv>
        <ChatListRow chat={chat} />
        <GlobalTitle>{toolsTitle}</GlobalTitle>
        <HomeTiles tiles={isMFS ? MFStoolsTiles : toolsTiles} />
      </GlobalDiv>
      <div className="fr-mb-12w">
        <GlobalTitle>{ressourcesTitle}</GlobalTitle>
        <HomeTiles tiles={tiles} />
      </div>
    </div>
  )
}

function ChatListRow({ chat }) {
  return (
    <div className="fr-grid-row bg-red-500">
      <div>
        <p className="fr-text--lg">{chat.title}</p>
      </div>
      <div>
        <div>
          <p className="fr-tag fr-tag--sm fr-text-action-high--blue-france fr-background-action-low--blue-france">
            {chat.numberOfMessages} messages
          </p>
        </div>
      </div>
    </div>
  )
}
