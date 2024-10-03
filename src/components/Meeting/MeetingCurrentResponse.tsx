import type { MeetingInputContext, RootState } from '@types'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { MeetingAdditionalResponse } from './MeetingAdditionalResponse'
import { MeetingFirstQuestionHelper } from './MeetingFirstQuestionSidePanel'
import { MeetingMainResponse } from './MeetingMainResponse'
import { rmContextFromQuestion } from '@utils/setData'

/*
 *	Contains text response from the bot and additional informations like sheets, chunks and useful links
 */
export const MeetingCurrentResponse = function MeetingCurrentResponse({
  setQuestion,
  setContext,
}: {
  setQuestion: (question: string) => void
  setContext: React.Dispatch<React.SetStateAction<MeetingInputContext>>
}) {
  // Select all the necessary state in a single useSelector call
  const { history, chatId, lastStreamId, messages, question } = useSelector(
    (state: RootState) => ({
      history: state.user.history,
      chatId: state.user.chatId,
      lastStreamId: state.user.lastStreamId,
      messages: state.user.messages,
      question: state.user.question,
    }),
  )

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current === null) return
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const refBottom = useRef<HTMLDivElement>(null)

  return (
    <div className="h">
      {question.query && (
        <>
          <h5 ref={ref} className="fr-mt-5w fr-mb-1w">
            {`Votre question ${history.length ? 'complémentaire' : ''}`}
          </h5>
          <div className="fr-mb-2w fr-background-alt--blue-france fr-p-2w flex min-h-12 items-center">
            <p className="block overflow-hidden text-ellipsis whitespace-nowrap">
              {rmContextFromQuestion(question.query)}
            </p>
          </div>
        </>
      )}

      <GlobalRowContainer extraClass="fr-grid-row fr-mt-5w">
        <MeetingMainResponse setQuestion={setQuestion} setContext={setContext} />
        {chatId !== 0 && lastStreamId !== 0 && <MeetingAdditionalResponse />}
        {!chatId && <MeetingFirstQuestionHelper />}
      </GlobalRowContainer>
      <div ref={refBottom} />
    </div>
  )
}
