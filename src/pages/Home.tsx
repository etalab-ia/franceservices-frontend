import { ressourcesTitle, toolsTitle } from '@constants/home'
import {
  MFSressourcesTiles,
  MFStoolsTiles,
  generalistRessourcesTiles,
  toolsTiles,
} from '@constants/inputFields'
import { isMFSContext } from '@utils/context/isMFSContext'
import { TextWithSources } from 'components/Sources/TextWithSources'
import { useContext } from 'react'
import { GlobalDiv } from '../components/Global/GlobalDiv'
import { GlobalTitle } from '../components/Global/GlobalTitle'
import { HomeTiles } from '../components/Home/HomeTiles'

const testText = `La procédure de rétablissement en cas de surendettement comporte plusieurs étapes.\
 Tout d'abord, la personne concernée doit répondre à certaines conditions pour être éligible à cette procédure.\
  Ensuite, la commission de surendettement ouvre la procédure avec l'accord du surendetté.\
  Si le surendetté possède un patrimoine pouvant être vendu, une liquidation judiciaire est prononcée\
  <ref text="Lorsque le surendetté possède un patrimoine pouvant être vendu,\
   la procédure de rétablissement consiste à effacer les dettes et est prononcée avec liquidation judiciaire (vente des biens).">\
  [28e7fcf81deee0ff_0]</ref>. \n
  Dans le cas contraire, une procédure sans liquidation judiciaire est engagée\
  <ref text="Elle est prononcée sans liquidation judiciaire (c'est-à-dire sans vente des biens) lorsque la personne surendettée\
  ne possède pas de patrimoine.">[4c4511d1c0e6dc4c_0]</ref>. `

export function Home() {
  const isMFS = useContext(isMFSContext)
  const tiles = isMFS ? MFSressourcesTiles : generalistRessourcesTiles
  return (
    <div className="fr-container">
      <TextWithSources text={testText} />
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
