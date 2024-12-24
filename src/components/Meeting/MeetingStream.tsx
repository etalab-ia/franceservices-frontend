import { useEffect, useState, useRef } from 'react'
import type { RootState } from '@types'
import { useSelector } from 'react-redux'
import { TextWithSources } from 'components/Sources/TextWithSources'
import { GlobalParagraph } from 'components/Global/GlobalParagraph'
import Separator from 'components/Global/Separator'
import { Feedback } from '../Feedbacks/Feedback'

export function MeetingStream() {
  const stream = useSelector((state: RootState) => state.stream)
  const agentResponse = stream.historyStream[0]

  // For letter-by-letter text
  const [displayedText, setDisplayedText] = useState('')
  const lastIndexRef = useRef(0)

  // We'll detect a new question/stream by checking user.lastStreamId
  const user = useSelector((state: RootState) => state.user)
  const [prevStreamId, setPrevStreamId] = useState<number | null>(null)

  // 1) Reset on new question
  useEffect(() => {
    // If lastStreamId changed => a brand-new question is being asked
    if (user.lastStreamId && user.lastStreamId !== prevStreamId) {
      setDisplayedText('')
      lastIndexRef.current = 0
      setPrevStreamId(user.lastStreamId)
    }
  }, [user.lastStreamId, prevStreamId])

  // 2) Append text while streaming
  useEffect(() => {
    if (!stream.isStreaming) return

    const intervalId = setInterval(() => {
      if (lastIndexRef.current < stream.response.length) {
        setDisplayedText((prev) => {
          const nextChar = stream.response[lastIndexRef.current]
          lastIndexRef.current += 1
          return prev + nextChar
        })
      }
    }, 0) // speed as desired

    return () => clearInterval(intervalId)
  }, [stream.isStreaming, stream.response])

  // 3) Once streaming is done, ensure full text is displayed
  useEffect(() => {
    if (!stream.isStreaming && stream.response) {
      setDisplayedText(stream.response)
      lastIndexRef.current = stream.response.length
    }
  }, [stream.isStreaming, stream.response])

  return (
    <div>
      <h3>Réponse proposée par Albert</h3>

      {stream.isStreaming ? (
        <TextWithSources text={displayedText} />
      ) : (
        <GlobalParagraph>{agentResponse}</GlobalParagraph>
      )}

      {!stream.isStreaming && stream.historyStream.length !== 0 && (
        <div className="fr-mt-5w">
          <Feedback />
          <Separator extraClass="fr-mt-5w" />
        </div>
      )}
    </div>
  )
}
