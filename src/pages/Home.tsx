import { ressourcesTitle, toolsTitle } from '@constants/home'
import {
  MFSressourcesTiles,
  MFStoolsTiles,
  generalistRessourcesTiles,
  toolsTiles,
} from '@constants/inputFields'
import { isMFSContext } from '@utils/context/isMFSContext'
import { TextWithSources } from 'components/Sources/TextWithSources'
import { useContext, useState } from 'react'
import { GlobalDiv } from '../components/Global/GlobalDiv'
import { GlobalTitle } from '../components/Global/GlobalTitle'
import { HomeTiles } from '../components/Home/HomeTiles'

const temperature = import.meta.env.VITE_MODEL_TEMPERATURE as number
console.log('temperature', temperature)
const testText = `SANS CROCHETS \
  <ref text="Lorsque le surendetté possède un patrimoine pouvant être vendu,\
   la procédure de rétablissement consiste à effacer les dettes et est prononcée avec liquidation judiciaire (vente des biens).">72e183f2620ab27a</ref>. \n
  AVEC CROCHETS\
  <ref text="Elle est prononcée sans liquidation judiciaire (c'est-à-dire sans vente dprononcée sans liquidation judiciaire (c'est-à-dire sans vente dprononcée sans liquidation judiciaire (c'est-à-dire sans vente dprononcée sans liquidation judiciaire (c'est-à-dire sans vente dprononcée sans liquidation judiciaire (c'est-à-dire sans vente dprononcée sans liquidation judiciaire (c'est-à-dire sans vente dprononcée sans liquidation judiciaire (c'est-à-dire sans vente dprononcée sans liquidation judiciaire (c'est-à-dire sans vente dprononcée sans liquidation judiciaire (c'est-à-dire sans vente dprononcée sans liquidation judiciaire (c'est-à-dire sans vente dprononcée sans liquidation judiciaire (c'est-à-dire sans vente dprononcée sans liquidation judiciaire (c'est-à-dire sans vente dprononcée sans liquidation judiciaire (c'est-à-dire sans vente dprononcée sans liquidation judiciaire (c'est-à-dire sans vente dprononcée sans liquidation judiciaire (c'est-à-dire sans vente dprononcée sans liquidation judiciaire (c'est-à-dire sans vente dprononcée sans liquidation judiciaire (c'est-à-dire sans vente dprononcée sans liquidation judiciaire (c'est-à-dire sans vente dprononcée sans liquidation judiciaire (c'est-à-dire sans vente dprononcée sans liquidation judiciaire (c'est-à-dire sans vente dprononcée sans liquidation judiciaire (c'est-à-dire sans vente des biens) lorsque la personne surendettée\
  ne possède pas de patrimoine.">[72e183f2620ab27a]</ref>. \
  AVEC :TEXT
  <ref text="Elle est prononcée sans liquidation judiciaire (c'est-à-dire sans vente des biens) lorsque la personne surendettée\
  ne possède pas de patrimoine.">72e183f2620ab27a: random text</ref>
  `

export function Home() {
  const isMFS = useContext(isMFSContext)
  const tiles = isMFS ? MFSressourcesTiles : generalistRessourcesTiles

  return (
    <div className="fr-container">
      {/*       <TextWithSources text={testText} />
       */} <GlobalDiv>
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
