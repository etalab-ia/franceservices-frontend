import { useGetArchive } from '@api'
import { Button } from '@codegouvfr/react-dsfr/Button'
import type { Chat, UserHistory } from '@types'
import React from 'react'
import ReactToPrint from 'react-to-print'
import ShowError from '../Error/ShowError'
import { GlobalParagraph } from '../Global/GlobalParagraph'
import { GlobalTitle } from '../Global/GlobalTitle'
import { DisplayResponse, History } from '../Meeting/MeetingOutputs'

/**********************************************************************************************
		
	**	Print selected archive thanks to ReactToPrint OR go back to Archive summary

 **********************************************************************************************/

interface DisplayArchiveProps {
  selectedChat: Chat
  setArchiveTab: React.Dispatch<React.SetStateAction<number | null>>
}

export const DisplayArchive = React.forwardRef<HTMLDivElement, DisplayArchiveProps>(
  ({ selectedChat, setArchiveTab }, ref) => {
    const handleClick = () => {
      setArchiveTab(null)
    }
    window.addEventListener('popstate', () => {})

    const { data: archive, error, isLoading, isError } = useGetArchive(selectedChat.id)
    if (isLoading) return null
    if (isError || !archive || !archive.length) {
      return (
        <ShowError
          errorNumber={error && error.cause.status}
          message={`Nous n'avons pas trouvé de messages associés au chat numéro ${selectedChat.id}`}
        />
      )
    }
    return (
      <>
        <div className="fr-mb-4w">
          <Button
            iconId="fr-icon-arrow-left-s-line-double"
            className="fr-mt-4w fr-mr-1w"
            onClick={handleClick}
            priority="tertiary"
          >
            {''}
          </Button>
          <ReactToPrint
            trigger={() => (
              <Button
                iconId="fr-icon-printer-line"
                className="fr-mt-4w"
                priority="tertiary"
              >
                {' '}
              </Button>
            )}
            content={() => (ref && 'current' in ref ? ref.current : null)}
          />
        </div>
        <div ref={ref as React.RefObject<HTMLDivElement>}>
          <DisplayMeetingArchive streams={archive} />
        </div>
      </>
    )
  }
)

function DisplayMeetingArchive({ streams }: { streams: UserHistory[] }) {
  return (
    <>
      <GlobalTitle>Poser une question à Albert</GlobalTitle>
      <h5> Votre question sur la situation de l’usager</h5>
      <GlobalParagraph>{streams[0].query}</GlobalParagraph>

      <div className="ft-container h-full w-full">
        {streams.length > 0 && (
          <DisplayResponse
            chunks={streams[0].chunks}
            response={streams[0].response}
            webservices={streams[0].webservices}
          />
        )}
        <History history={streams.slice(1, streams.length)} />
      </div>
    </>
  )
}
