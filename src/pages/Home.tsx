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
  [28e7fcf81deee0ff_0]</ref>. \
  Dans le cas contraire, une procédure sans liquidation judiciaire est engagée\
  <ref text="Elle est prononcée sans liquidation judiciaire (c'est-à-dire sans vente des biens) lorsque la personne surendettée\
  ne possède pas de patrimoine.">[4c4511d1c0e6dc4c_0]</ref>. `
/* const replacedText = reactStringReplace(
  testText,
  /<ref text="(.*?)">(.*?)<\/ref>/g,
  (match, i) => {
    const tooltipText = match[1] // Text for the tooltip content
    const displayText = match[2] // Text to display where the ref was
    return (
      <SourceTooltip
        key={i}
        id={`tooltip-${i}`} // Unique ID for each tooltip
        text={tooltipText}
        source={displayText}
        sourceSite="service-public.fr"
        sheetUrl="https://www.google.com"
      />
    )
  }
) */

const replacedText = reactStringReplace(
  testText,
  /<ref text="([^"]+)">[^<]*<\/ref>/g,
  (match, i) => (
    <div>
      <SourceTooltip
        id={`tooltip-${i}`}
        text={match}
        source="Source Name"
        sourceSite="Source Site Name"
        sheetUrl={`https://example.com/${match[2]}`}
      />
    </div>
  )
)

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
      {replacedText.map((content, index) => (
        <div key={index}>{content}</div>
      ))}
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
  id,
  text,
  source,
  sourceSite,
  sheetUrl,
}: { id: string; text: string; source: string; sourceSite: string; sheetUrl: string }) {
  return (
    // Ensure everything in this span is styled to stay inline
    <span style={{ position: 'relative', display: 'inline' }}>
      <a href={sheetUrl} id={id} style={{ textDecoration: 'none', display: 'inline' }}>
        <span
          className="fr-icon-quote-fill fr-text-action-high--blue-cumulus fr-mr-2v"
          style={{ display: 'inline' }}
        />
      </a>
      <Tooltip
        place="bottom"
        opacity={1}
        style={{
          position: 'absolute', // Ensure the tooltip is positioned absolutely to not affect layout
          zIndex: 1000,
          backgroundColor: 'white',
          borderRadius: '0px',
          color: 'black',
          boxShadow:
            'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
          opacity: 1,
        }}
        anchorSelect={`#${id}`}
        clickable
        noArrow
      >
        <Source text={text} source={source} sourceSite={sourceSite} sheetUrl={sheetUrl} />
      </Tooltip>
    </span>
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
          className="external-link-icon ml-auto"
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

function addSourcesToText(text: string) {
  return <></>
}
