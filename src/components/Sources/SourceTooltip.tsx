import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Tooltip } from 'react-tooltip'
import useWindowDimensions from '../../utils/hooks/useWindowDimensions'

// This is needed to display the tooltip on top of every other element
const domNode = document.createElement('div')
document.body.appendChild(domNode)

export function SourceTooltip({
  id,
  title,
  text,
  sourceUrl,
}: {
  id: string
  title: string
  text: string
  sourceUrl: string
}) {
  const windowDimensions = useWindowDimensions()
  const scheme = localStorage.getItem('scheme')
  const [isOpen, setIsOpen] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      setIsOpen(true)
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <span className="fr-ml-1v relative inline">
      <div
        id={id}
        tabIndex={0}
        role="button"
        aria-pressed={isOpen}
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onKeyDown={handleKeyDown}
        style={{
          cursor: 'pointer',
          display: 'inline',
          color: 'inherit',
          borderBottom: '0px solid !important',
        }}
      >
        <span className="fr-text--xs fr-icon-quote-fill fr-text-action-high--blue-cumulus fr-mr-2v" />
      </div>

      {createPortal(
        <Tooltip
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          place="bottom"
          opacity={1}
          className={`${scheme === 'dark' ? 'fr-background-alt--grey' : ''} `}
          style={{
            padding: '0px',
            position: 'absolute',
            zIndex: 99999,
            backgroundColor: 'white',
            borderRadius: '0px',
            color: 'black',
            boxShadow:
              'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
            maxHeight: `${windowDimensions.height - 200}px`,
            overflowY: 'auto',
          }}
          anchorSelect={`#${id}`}
          imperativeModeOnly
          clickable
          noArrow
        >
          <div
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setIsOpen(false)
              }
            }}
          >
            <Source sourceUrl={sourceUrl} text={text} title={title} />
          </div>
        </Tooltip>,
        domNode,
      )}
    </span>
  )
}

export function Source({
  sourceUrl,
  text,
  title,
}: { sourceUrl: string; text: string; title: string }) {
  const domainName = getDomainFromUrl(sourceUrl)

  return (
    <div
      className="fr-p-4w flex h-[100%] max-w-[392px] flex-col text-wrap break-words fr-text-default--grey"
      style={{ zIndex: 10000 }}
    >
      <p className="fr-mb-1w fr-text--sm fr-text-mention--grey">
        Passage utilisé pour générer cette phrase
      </p>
      {text.split('\n').map((line, index) => (
        <p key={index} className="fr-text--lg">
          {line}
        </p>
      ))}
      <p className="fr-mb-1w">Extrait de: {title}</p>
      <div className="fr-grid-row fr-mt-3w w-full">
        {domainName?.origin && (
          <a
            target="_blank"
            rel="noreferrer"
            href={sourceUrl}
            className="fr-badge fr-badge--sm fr-badge--info fr-badge--no-icon external-link-icon"
          >
            {domainName.hostname.slice(4)}
          </a>
        )}
        <a
          className="external-link-icon ml-auto no-underline"
          href={sourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          <span className="fr-icon-arrow-right-line" />
        </a>
      </div>
    </div>
  )
}

const getDomainFromUrl = (url: string) => {
  try {
    const newUrl = new URL(url)
    return { hostname: newUrl.hostname, origin: newUrl.origin }
  } catch (error) {
    console.error('Invalid URL', error)
    return null
  }
}
