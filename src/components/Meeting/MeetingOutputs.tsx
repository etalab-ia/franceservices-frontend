import { useContext, useEffect, useState } from 'react'
import { ArchiveType, RootState } from 'types'
import {
  meetingAppointmentInformations,
  meetingAppointmentTitle,
} from '../../constants/meeting'
import { CurrQuestionContext } from '../../utils/context/questionContext'
import { rmContextFromQuestion } from '../../utils/setData'
import { GlobalParagraph } from '../Global/GlobalParagraph'
import { GlobalSubtitle } from '../Global/GlobalSubtitle'
import { GlobalTitle } from '../Global/GlobalTitle'
import { MeetingEditQuestion } from './MeetingEditQuestion'
import { MeetingResponse } from './MeetingResponse'
import { useSelector } from 'react-redux'
import Pagination from '@codegouvfr/react-dsfr/Pagination'

/*****************************************************************************************************
	Displays Albert's response and the modify button
  Archive is undefined when the user is not on an archive

	GENERAL: display:
		- main informations: user prompt, stream response, response explanation / chunks
		- additional informations: sheets, related questions, webservices

	-----------------------------------------------------------------------------------------------

	**	archive: meeting page is not editable when the user is on an archive

 *****************************************************************************************************/

export function MeetingOutputs({
  setGenerate,
  archive,
}: {
  setGenerate: React.Dispatch<React.SetStateAction<boolean>> | undefined
  archive?: ArchiveType
}) {
  const { currQuestion } = useContext(CurrQuestionContext)
  const [query, setQuery] = archive
    ? useState(archive.query)
    : useState<string>(currQuestion.query)

  useEffect(() => {
    rmContextFromQuestion(query, setQuery)
  }, [])

  return (
    <div className="ft-container">
      <GlobalTitle>{meetingAppointmentTitle}</GlobalTitle>
      <GlobalSubtitle>{meetingAppointmentInformations}</GlobalSubtitle>
      <GlobalParagraph>{query}</GlobalParagraph>

      {/*  {!archive ? <MeetingEditQuestion setGenerate={setGenerate} /> : <div></div>} */}
      <History />
      <div className="fr-container w-full  border --border-default-grey  fr-mb-2w"></div>
      <MeetingResponse archive={archive} />
    </div>
  )
}

function History() {
  const user = useSelector((state: RootState) => state.user)
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
    <div className="">
      {user.history.map((h, index) => (
        <div className="mb-5" key={index}>
          <h3 className="fr-background-alt--blue-france">
            <button
              className="fr-accordion__btn text-black"
              aria-expanded="false"
              aria-controls={`history-${index}`}
            >
              {h.query}
            </button>
          </h3>

          <div className="fr-collapse" id={`history-${index}`}>
            <div className="flex flex-col md:flex-row justify-between fr-mt-1w items-center">
              <h6 className="text-xl font-bold">Sources de réponses</h6>
              <Pagination
                count={Math.ceil(h.chunks.length / 3)}
                defaultPage={currentPage}
                getPageLinkProps={getPageLinkProps}
                className="fr-mt-3v"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2 items-stretch  fr-mt-2v fr-mb-2w">
              {' '}
              {h.chunks.slice(startIndex, endIndex).map((c, index) => (
                <SourceTile
                  key={`chunk-${index}`}
                  title={c.title}
                  text={c.text}
                  url={c.url}
                />
              ))}
            </div>
            {h.response}
          </div>
        </div>
      ))}
    </div>
  )
}
function SourceTile({ title, text, url }: { title: string; text: string; url: string }) {
  return (
    /*     <a href={url} target="_blank" rel="noreferrer" className='flex'>
     */
    <div className="flex flex-col fr-col-12 fr-col-sm-4 border border-cyan-400 max-w-[392px]  p-4 h-226 ">
      {' '}
      <h4 className="fr-mb-2w h-1/4">{title}</h4>
      <p className="flex-grow h-2/4">
        {' '}
        {text.slice(0, 95)}
        {text.length > 96 ? '...' : ''}
      </p>
      <a style={{ backgroundImage: 'none', textDecoration: 'none' }} href={url}>
        {url}
      </a>
    </div>
    /*     </a>
     */
  )
}
