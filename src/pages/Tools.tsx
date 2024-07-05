import {
  MFSressourcesTiles,
  generalistRessourcesTiles,
  toolsTiles,
} from '@constants/inputFields'
import { isMFSContext } from '@utils/context/isMFSContext'
import { useContext } from 'react'
import { GlobalTitle } from '../components/Global/GlobalTitle'
import { HomeTiles } from '../components/Home/HomeTiles'

export function Tools() {
  const isMFS = useContext(isMFSContext)
  const tiles = isMFS ? MFSressourcesTiles : generalistRessourcesTiles

  return (
    <div className="fr-container fr-mb-12w flex flex-col gap-4 fr-pt-4w">
      {/*    <GlobalTitle>Mes outils</GlobalTitle>
      <HomeTiles tiles={isMFS ? MFStoolsTiles : toolsTiles} /> */}
      <GlobalTitle>Mes ressources</GlobalTitle>
      <HomeTiles tiles={tiles} />
    </div>
  )
}
