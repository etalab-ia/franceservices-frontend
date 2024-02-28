import Pagination from '@codegouvfr/react-dsfr/Pagination'
import { useState } from 'react'
import { DisplayChunks } from './DisplayChunks'

/*****************************************************************************************************
	
	COMPONENTS:

		**	

 *****************************************************************************************************/

export const ResponseExplanation = ({ chunks }) => {
  const chunksPerPage = 2
  const [currentPage, setCurrentPage] = useState(1)
  const [open, setOpen] = useState(false)

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

  const startIndex = (currentPage - 1) * chunksPerPage
  const endIndex = startIndex + chunksPerPage
  return (
    <div>
      {chunks && chunks.length !== 0 && (
        <>
          <section className="fr-accordion ">
            <h3 className="--text-disabled-grey">
              <button
                onClick={() => setOpen(!open)}
                className="accordion-custom-button flex"
                aria-expanded="false"
                aria-controls="accordion-106"
              >
                Quelles sont les sources utilisées pour générer cette réponse ?
                <span
                  className={`fr-icon-arrow-${open ? 'up' : 'down'}-s-line`}
                  aria-hidden="true"
                ></span>
              </button>
            </h3>{' '}
            <div className="fr-collapse" id="accordion-106">
              {' '}
              <>
                <DisplayChunks chunks={chunks.slice(startIndex, endIndex)} />
                <Pagination
                  count={Math.ceil(chunks.length / chunksPerPage)}
                  defaultPage={currentPage}
                  getPageLinkProps={getPageLinkProps}
                  className="fr-mt-3v"
                />
              </>{' '}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
