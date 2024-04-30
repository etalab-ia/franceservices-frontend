import { useGetChunk } from '@api'
import { Tooltip } from 'react-tooltip'
import useWindowDimensions from '../../utils/hooks/useWindowDimensions'

export function SourceTooltip({
  id,
  content,
  sourceId,
}: {
  id: string
  content: string
  sourceId: string
}) {
  const windowDimensions = useWindowDimensions()
  return (
    <span className="fr-ml-1v relative inline">
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
          maxHeight: `${windowDimensions.height - 200}px`,
          overflowY: 'auto',
        }}
        anchorSelect={`#${id}`}
        clickable
        noArrow
      >
        <Source sourceId={sourceId} content={content} />
      </Tooltip>
    </span>
  )
}

export function Source({ sourceId, content }: { sourceId: string; content: string }) {
  const { data, error } = useGetChunk(sourceId)

  const handleNavigation = () => {
    window.open(data.url, '_blank')
  }
  if (error) {
    return <p>Erreur: Albert n'a pas pu récupérer cette source.</p>
  }
  if (!data)
    return (
      <div className="flex h-[100%] flex-col items-center justify-center">
        <LoadingSpinner />
      </div>
    )

  const domainName = getDomainFromUrl(data.url)

  return (
    <div className="fr-p-2w flex h-[100%] max-w-[392px] flex-col text-wrap break-words">
      <p className="fr-mb-1w fr-text--sm fr-text-mention--grey">
        Passage utilisé pour générer cette phrase
      </p>
      <p className="fr-text--lg">{content}</p>
      <p className="fr-mb-1w">Extrait de: {data.title}</p>
      <div className="fr-grid-row fr-mt-3w w-full">
        {domainName && domainName.length && (
          <a
            target="_blank"
            rel="noreferrer"
            href={domainName}
            className="fr-badge fr-badge--sm fr-badge--info fr-badge--no-icon"
          >
            {domainName.slice(4, data.url.length - 3)}
          </a>
        )}
        <a
          className="external-link-icon ml-auto no-underline"
          href={data.url}
          target="_blank"
          rel="noreferrer"
        >
          <span className="fr-icon-arrow-right-line" />
        </a>
      </div>
    </div>
  )
}

function LoadingSpinner() {
  return (
    <div
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-e-transparent border-solid align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  )
}

const getDomainFromUrl = (url) => {
  try {
    const newUrl = new URL(url)
    return newUrl.hostname
  } catch (error) {
    console.error('Invalid URL', error)
    return ''
  }
}
