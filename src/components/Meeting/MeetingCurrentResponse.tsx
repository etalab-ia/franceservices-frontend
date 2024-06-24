import type { RootState } from '@types'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { MeetingAdditionalResponse } from './MeetingAdditionalResponse'
import { MeetingFirstQuestionHelper } from './MeetingFirstQuestionSidePanel'
import { MeetingMainResponse } from './MeetingMainResponse'

/*
 *	Contains text response from the bot and additional informations like sheets, chunks anduseful links
 */
export function MeetingCurrentResponse({
  setQuestion,
}: { setQuestion: (question: string) => void }) {
  const user = useSelector((state: RootState) => state.user)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current === null) return
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }, [user.messages])
  return (
    <>
      {user.question.query && (
        <>
          <h5 ref={ref} className="fr-mt-5w fr-mb-1w">
            {`Votre question ${user.history.length ? 'complémentaire' : ''}`}
          </h5>
          <div className="fr-mb-2w fr-background-alt--blue-france fr-p-2w flex min-h-12 items-center">
            <p>{user.question.query}</p>
          </div>
        </>
      )}

      <GlobalRowContainer extraClass="fr-grid-row fr-mt-5w">
        <MeetingMainResponse setQuestion={setQuestion} />
        {user.chatId !== 0 && <MeetingAdditionalResponse />}
        {!user.chatId && <MeetingFirstQuestionHelper />}
      </GlobalRowContainer>
    </>
  )
}
