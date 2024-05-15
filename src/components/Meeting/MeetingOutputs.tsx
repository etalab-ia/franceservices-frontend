import Pagination from '@codegouvfr/react-dsfr/Pagination'
import { meetingAppointmentTitle } from '@constants/meeting'
import type { Chunk, RootState, UserHistory, WebService } from '@types'
import { CurrQuestionContext } from '@utils/context/questionContext'
import { rmContextFromQuestion } from '@utils/setData'
import Separator from 'components/Global/Separator'
import { TextWithSources } from 'components/Sources/TextWithSources'
import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MeetingCurrentResponse } from './MeetingCurrentResponse'
import { UsefulLinks } from './UsefulLinks'
import { GlobalRowContainer } from 'components/Global/GlobalRowContainer'
import { OneThirdScreenWidth } from 'components/Global/OneThirdScreenWidth'
import { GlobalColContainer } from 'components/Global/GlobalColContainer'

/*****************************************************************************************************
    Displays Albert's response and the modify button
    Archive is undefined when the user is not on an archive

    GENERAL: display:
      - main informations: user prompt, stream response, response explanation / chunks
      - additional informations: sheets, related questions, webservices

    -----------------------------------------------------------------------------------------------

    **	archive: meeting page is not editable when the user is on an archive

  *****************************************************************************************************/

export function MeetingOutputs() {
  const { currQuestion } = useContext(CurrQuestionContext)
  const user = useSelector((state: RootState) => state.user)

  const [query, setQuery] = useState<string>(currQuestion.query)

  useEffect(() => {
    rmContextFromQuestion(query, setQuery)
  }, [])

  return (
    <div className="ft-container">
      <div className="fr-mb-5w">
        <h2 className="fr-my-2w">{meetingAppointmentTitle}</h2>
      </div>
      <History history={user.history} />
      <MeetingCurrentResponse />
    </div>
  )
}

/**
 * Display a list of accordion, each one contains a user query and the bot's response with sources and useful links
 */
export function History({ history }: { history: UserHistory[] }) {
  const [openedAccordion, setOpenedAccordion] = useState(-1)
  return (
    <div className="fr-mt-5w">
      {history.map((h, index) => (
        <div className="fr-mb-1w" key={index}>
          <h3 className="fr-background-alt--blue-france">
            <button
              className="fr-accordion__btn fr-text-default--grey"
              aria-expanded="false"
              aria-controls={`history-${index}`}
              onClick={() => setOpenedAccordion((prev) => (prev === -1 ? index : -1))}
            >
              <p
                className={`${
                  openedAccordion === index
                    ? ''
                    : 'block overflow-hidden text-ellipsis whitespace-nowrap'
                }fr-text--lg`}
              >
                {h.query}
              </p>
            </button>
          </h3>
          <div className="fr-collapse" id={`history-${index}`}>
            <div className="fr-mb-2w">
              <DisplayResponse
                chunks={h.chunks}
                response={h.response}
                webservices={h.webservices}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Display the response of the bot with the sources and useful links
 */
export function DisplayResponse({
  chunks,
  response,
  webservices,
}: { chunks: Chunk[]; response: string; webservices: WebService[] }) {
  return (
    <GlobalRowContainer extraClass="fr-mt-2w">
      <GlobalColContainer>
        <div key={response}>
          <h3>Réponse proposée par Albert</h3>
          <TextWithSources text={response} />
        </div>
      </GlobalColContainer>
      {webservices && webservices.length > 0 && (
        <OneThirdScreenWidth extraClass="fr-mt-5w">
          <GlobalColContainer>
            <UsefulLinks webservices={webservices} />
          </GlobalColContainer>
        </OneThirdScreenWidth>
      )}
      <Separator extraClass="fr-mt-5w" />
    </GlobalRowContainer>
  )
}

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
