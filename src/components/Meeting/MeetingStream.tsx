import { useEffect, useState, useRef } from 'react'
import type { RootState } from '@types'
import { useSelector } from 'react-redux'
import { TextWithSources } from 'components/Sources/TextWithSources'
import { GlobalParagraph } from 'components/Global/GlobalParagraph'
import Separator from 'components/Global/Separator'
import { Feedback } from '../Feedbacks/Feedback'
import { useStreamText } from 'hooks/useStreamText'

export function MeetingStream() {
  const stream = useSelector((state: RootState) => state.stream)
  const agentResponse = stream.historyStream[0]
  const user = useSelector((state: RootState) => state.user)

  const displayedText = useStreamText({
    text: stream.response,
    isStreaming: stream.isStreaming,
    streamId: user.lastStreamId,
  })

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
