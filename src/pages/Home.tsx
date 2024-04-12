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
import { Tooltip } from 'react-tooltip'

import reactStringReplace from 'react-string-replace'

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
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum has been the industry's standard dummy text ever since the 1500s, when an
        unknown printer took a galley of type and scrambled it to make a type specimen
        book. It has survived SourceTooltip
        <SourceTooltip
          text="Text source test encoreeeeeffffffffffffffffffffffffffffffffffeeeeeeeeee lol"
          source="source text test again afffdddddddddddddddddddddddddddddddddddddffffffffffffffffffffffffffffffnffjifd"
          sourceSite="servicepublic.fr"
          sheetUrl="https://www.google.com"
        />
        not only five centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release of
        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem Ipsu
      </p>
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

function SourceTooltip({
  text,
  source,
  sourceSite,
  sheetUrl,
}: { text: string; source: string; sourceSite: string; sheetUrl: string }) {
  return (
    <div className="no-underline-link">
      <a
        href={sheetUrl}
        id="clickable"
        className="no-underline-link"
        style={{ textDecoration: 'none !important;' }}
      >
        <span className="fr-icon-quote-fill fr-text-action-high--blue-cumulus fr-mr-2v no-underline-link text-decoration-none inline-block" />
      </a>
      <Tooltip
        place="bottom"
        opacity={1}
        style={{
          zIndex: 1000,
          backgroundColor: 'white',
          color: 'black',
          boxShadow:
            'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
          opacity: 1,
        }}
        anchorSelect="#clickable"
        clickable
        noArrow
      >
        <Source text={text} source={source} sourceSite={sourceSite} sheetUrl={sheetUrl} />
      </Tooltip>
    </div>
  )
}

function Source({
  text,
  source,
  sourceSite,
  sheetUrl,
}: { text: string; source: string; sourceSite: string; sheetUrl: string }) {
  return (
    <div className="fr-p-2w max-w-[392px] break-words text-wrap">
      <p className="fr-mb-1w fr-text--sm fr-text-mention--grey">
        Passage utilisé pour générer cette phrase
      </p>
      <p className="fr-text--lg">{text}</p>
      <p className="fr-mb-1w">Extrait de: {source}</p>
      <div className="fr-grid-row w-full">
        <p className="fr-badge fr-badge--sm fr-badge--info fr-badge--no-icon">
          {sourceSite}
        </p>
        <a
          className="external-link-icon ml-auto no-underline-link"
          href={sheetUrl}
          target="_blank"
          rel="noreferrer"
        >
          <span className="fr-icon-arrow-right-line" />
        </a>
      </div>
    </div>
  )
}
