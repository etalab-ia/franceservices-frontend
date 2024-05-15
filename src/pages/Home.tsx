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

export function Home() {
  const isMFS = useContext(isMFSContext)
  const tiles = isMFS ? MFSressourcesTiles : generalistRessourcesTiles

  return (
    <div className="fr-container">
      <GlobalDiv>
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
