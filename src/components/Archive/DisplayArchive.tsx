import { Button } from '@codegouvfr/react-dsfr/Button'
import { Chat, UserHistory } from '@types'
import React, { useEffect, useState } from 'react'
import ReactToPrint from 'react-to-print'
import { getChunksUrl, getStreamsUrl } from '../../constants/api'
import {
  meetingAppointmentInformations,
  meetingAppointmentTitle,
} from '../../constants/meeting'
import { useFetch } from '../../utils/hooks'
import { setHeaders } from '../../utils/setData'
import { GlobalParagraph } from '../Global/GlobalParagraph'
import { GlobalSubtitle } from '../Global/GlobalSubtitle'
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
    const [archive, setArchive] = useState<UserHistory[]>()
    const token = localStorage.getItem('authToken')
    const [isLoading, setIsLoading] = useState(true)

    const fetchStreamsAndSetHistory = async () => {
      setIsLoading(true)
      try {
        // Fetch streams for the selected chat
        const streamsResponse = await fetch(`${getStreamsUrl}/${selectedChat.id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }).then((res) => res.json())

        if (
          !streamsResponse ||
          !streamsResponse.streams ||
          streamsResponse.streams.length === 0
        ) {
          console.log('No streams found')
          setIsLoading(false)
          return
        }

        // Fetch chunks for each stream
        const streamsHistory = await Promise.all(
          streamsResponse.streams.map(async (stream) => {
            const chunksResponse = stream.rag_sources
              ? await fetch(getChunksUrl, {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ uids: stream.rag_sources }),
                }).then((res) => res.json())
              : []

            return {
              query: stream.query,
              chunks: chunksResponse,
              response: stream.response,
              webservices: [],
            }
          })
        )

        setArchive(streamsHistory)
      } catch (error) {
        console.error('Failed to fetch streams or chunks:', error)
      } finally {
        setIsLoading(false)
      }
    }

    useEffect(() => {
      fetchStreamsAndSetHistory()
    }, [selectedChat.id])

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
          <DisplayMeetingArchive streams={archive} />
        </div>
      </>
    )
  }
)

function DisplayMeetingArchive({ streams }: { streams: UserHistory[] }) {
  return (
    <>
      <GlobalTitle>{meetingAppointmentTitle}</GlobalTitle>
      <GlobalSubtitle>{meetingAppointmentInformations}</GlobalSubtitle>
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

async function streamsToHistory(streams: any[]) {
  let history: UserHistory[] = []
  const token = localStorage.getItem('authToken')
  streams.forEach(async (stream, index) => {
    await useFetch(getChunksUrl, 'POST', {
      headers: setHeaders(false),
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
