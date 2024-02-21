import { Button } from '@codegouvfr/react-dsfr/Button'
import React, { useEffect, useState } from 'react'
import ReactToPrint from 'react-to-print'
import { ArchiveType, Chat, UserHistory } from '../../../types'
import { getChunksUrl, useApiUrls } from '../../constants/api'
import {
  meetingAppointmentInformations,
  meetingAppointmentTitle,
} from '../../constants/meeting'
import { useFetch } from '../../utils/hooks'
import { GlobalParagraph } from '../Global/GlobalParagraph'
import { GlobalSubtitle } from '../Global/GlobalSubtitle'
import { GlobalTitle } from '../Global/GlobalTitle'
import { DisplayResponse, History } from '../Meeting/MeetingOutputs'

/**********************************************************************************************
		
	**	Print selected archive thanks to ReactToPrint OR go back to Archive summary

 **********************************************************************************************/

interface PrintProps {
  selectedChat: Chat
  setArchiveTab: React.Dispatch<React.SetStateAction<number | null>>
}

export const Print = React.forwardRef<HTMLDivElement, PrintProps>(
  ({ selectedChat, setArchiveTab }, ref) => {
    const handleClick = () => {
      setArchiveTab(null)
    }
    window.addEventListener('popstate', () => {})
    const { getStreamsUrl } = useApiUrls()
    const [archive, setArchive] = useState<ArchiveType[]>()
    const token = localStorage.getItem('authToken')
    const [isLoading, setIsLoading] = useState(true)
    const getStreamsFromChat = async () => {
      const res = await useFetch(getStreamsUrl + `/${selectedChat.id}`, 'GET', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: null,
      })
      console.log('archive', res)

      setArchive(res.streams)
      setIsLoading(false)
    }

    useEffect(() => {
      getStreamsFromChat()
    }, [])

    if (isLoading) return <div>loading...</div>
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
          {/* {selectedChat.type === "qa" && <Chatbot archive={archive} />}*/}
          {/* {selectedChat.type === 'meeting' && <MeetingOutputs archive={archive} />} */}
          <DisplayMeetingArchive streams={streamsToHistory(archive)} />
        </div>
      </>
    )
  }
)

function DisplayMeetingArchive({ streams }: { streams: UserHistory[] }) {
  return (
    <>
      {streams.map((stream, index) => (
        <>
          <GlobalTitle>{meetingAppointmentTitle}</GlobalTitle>
          <GlobalSubtitle>{meetingAppointmentInformations}</GlobalSubtitle>
          <GlobalParagraph>{stream.query}</GlobalParagraph>
          {streams.length > 0 && (
            <DisplayResponse
              chunks={streams[0].chunks}
              response={streams[0].response}
              webservices={streams[0].webservices}
            />
          )}
          <History history={streams.slice(1, streams.length - 1)} />
        </>
      ))}
    </>
  )
}

function streamsToHistory(streams: any[]) {
  let history: UserHistory[] = []
  const token = localStorage.getItem('authToken')
  streams.forEach((stream, index) => {
    console.log('rag_sources', stream.rag_sources)
    useFetch(getChunksUrl, 'POST', {
      headers: {
        Authorization: `Bearer ${token} `,
      },
      data: JSON.stringify({ uids: stream.rag_sources }),
    }).then((res) => {
      history.push({
        query: stream.query,
        chunks: res,
        response: stream.response,
        webservices: [],
      })
    })
  })
  return history
}
