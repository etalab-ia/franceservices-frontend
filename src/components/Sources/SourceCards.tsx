import Pagination from '@codegouvfr/react-dsfr/Pagination'
import type { Chunk } from '@types'
import { useState } from 'react'

/**
 * Display an array of chunks in cards with a pagination
 */
export function DisplaySourceCards({ chunks }: { chunks: Chunk[] }) {
  const [currentPage, setCurrentPage] = useState(1)

  const startIndex = (currentPage - 1) * 3
  const endIndex = startIndex + 3

  const getPageLinkProps = (pageNumber) => {
    const linkProps = {
      href: `#page-${pageNumber}`,
      title: `Page ${pageNumber}`,
      onClick: () => {
        setCurrentPage(pageNumber)
      },
    }

    return linkProps
  }
  return (
    <>
      <div className="fr-grid-row fr-col-12 fr-mt-1w w-full items-center justify-between">
        <h3 className="fr-mb-3v">Sources utilisées pour générer la réponse</h3>
        <Pagination
          count={Math.ceil(chunks.length / 3)}
          defaultPage={currentPage}
          getPageLinkProps={getPageLinkProps}
          className="fr-mt-3v"
        />
      </div>
      <div className="fr-grid-row fr-col-12 fr-mb-2w gap-2">
        {chunks.slice(startIndex, endIndex).map((c, index) => (
          <SourceCard key={`chunk-${index}`} title={c.title} text={c.text} url={c.url} />
        ))}
      </div>
    </>
  )
}

/**
 * A card that display the source of a response, we get informations for this from the chunks
 */
function SourceCard({ title, text, url }: { title: string; text: string; url: string }) {
  const domain = new URL(url).hostname.replace('www.', '')
  return (
    <div
      className="fr-col-12 fr-col-sm-4 221, 221, 1)] fr-px-4w fr-py-2w fr-background-action--high-blue relative max-w-[392px] border border-[rgba(221,"
      style={{ position: 'relative' }}
    >
      <p className="fr-mb-2w line-clamp-2 font-bold">{title}</p>
      <p className="fr-mb-4w line-clamp-3">{text}</p>
      <a
        className="fr-mb-2w no-external-link-icon absolute bottom-0 mt-auto font-bold"
        style={{ backgroundImage: 'none', textDecoration: 'none' }}
        href={url}
        rel="noopener noreferrer"
      >
        <Badge text={domain} />
      </a>
    </div>
  )
}

function Badge({ text }: { text: string }) {
  return (
    <div className="fr-background-contrast--info fr-py-0.5v fr-px-2v rounded">
      <p className="fr-text-action-high--blue-france">{text}</p>
    </div>
  )
}
