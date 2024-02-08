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
            <div className="flex  overflow-auto max-w-full fr-mt-2v">
              {h.chunks.map((c, index) => (
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
    <a href={url} target="_blank" rel="noreferrer">
      <div className="--border-default-grey min-w-96">
        <h4 className="fr-mb-2w min-h-18">{title}</h4>
        <p>
          {text.slice(0, 95)}
          {text.length > 96 ? '...' : ''}
        </p>
        <a href={url}>{url}</a>
      </div>
    </a>
  )
}
