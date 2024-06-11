import {
  MFStoolsTiles,
  generalistRessourcesTiles,
  toolsTiles,
} from '@constants/inputFields'
import { isMFSContext } from '@utils/context/isMFSContext'
import { useContext } from 'react'
import { GlobalTitle } from '../components/Global/GlobalTitle'
import { HomeTiles } from '../components/Home/HomeTiles'

export function Home() {
  const isMFS = useContext(isMFSContext)
  const tiles = isMFS ? MFStoolsTiles : generalistRessourcesTiles

  return (
    <div className="fr-container fr-mb-12w flex flex-col gap-4">
      <GlobalTitle>Mes outils</GlobalTitle>
      <HomeTiles tiles={isMFS ? MFStoolsTiles : toolsTiles} />
      <GlobalTitle>Mes ressources</GlobalTitle>
      <HomeTiles tiles={tiles} />
    </div>
  )
}
