import { useGetChunk } from '@api'
import useWindowDimensions from '@hooks/useWindowDimensions'
import { Tooltip } from 'react-tooltip'

export function SourceTooltip({
  id,
  text,
  sourceId,
}: {
  id: string
  text: string
  sourceId: string
}) {
  const sheetUrl = `https://example.com/${sourceId}`
  const source = 'sourceId'
  const sourceSite = 'Source Site Name'
  //const { data, error } = useGetChunk(sourceId)
  //console.log('chunk',data, error)
  const handleNavigation = () => {
    window.open(sheetUrl, '_blank')
  }
  const { width, height } = useWindowDimensions()
  return (
    <span className="fr-ml-1v" style={{ position: 'relative', display: 'inline' }}>
      <div
        id={id}
        style={{
          cursor: 'pointer',
          display: 'inline',
          color: 'inherit',
          borderBottom: '0px solid !important',
        }}
      >
        <span className="fr-text--xs fr-icon-quote-fill fr-text-action-high--blue-cumulus fr-mr-2v" />
      </div>
      <Tooltip
        place="bottom"
        opacity={1}
        style={{
          position: 'absolute',
          zIndex: 1000,
          backgroundColor: 'white',
          borderRadius: '0px',
          color: 'black',
          boxShadow:
            'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
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
    <div className="fr-p-2w inline-block max-w-[392px] text-wrap break-words">
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
          className="external-link-icon ml-auto no-underline"
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
