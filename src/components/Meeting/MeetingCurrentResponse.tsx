import type { MeetingInputContext, RootState } from '@types'
import { memo, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { MeetingAdditionalResponse } from './MeetingAdditionalResponse'
import { MeetingFirstQuestionHelper } from './MeetingFirstQuestionSidePanel'
import { MeetingMainResponse } from './MeetingMainResponse'
import { rmContextFromQuestion } from '@utils/setData'

/*
 *	Contains text response from the bot and additional informations like sheets, chunks anduseful links
 */
export const MeetingCurrentResponse = memo(
  function MeetingCurrentResponse({
    setQuestion,
    context,
    setContext,
  }: {
    setQuestion: (question: string) => void
    context: MeetingInputContext
    setContext: React.Dispatch<React.SetStateAction<MeetingInputContext>>
  }) {
    const user = useSelector((state: RootState) => state.user)

    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
      if (ref.current === null) return
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }, [user.messages])
    const refBottom = useRef<HTMLDivElement>(null)
    /*   useEffect(() => {
    if (refBottom.current) {
      console.log('REEEEEF', refBottom.current)
      refBottom.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }, [refBottom.current, stream.isStreaming]) */
    return (
      <div className="h">
        {user.question.query && (
          <>
            <h5 ref={ref} className="fr-mt-5w fr-mb-1w">
              {`Votre question ${user.history.length ? 'complémentaire' : ''}`}
            </h5>
            <div className=" fr-mb-2w fr-background-alt--blue-france fr-p-2w flex min-h-12 items-center">
              <p className="block overflow-hidden text-ellipsis whitespace-nowrap">
                {rmContextFromQuestion(user.question.query)}
              </p>
            </div>
          </>
        )}

        <GlobalRowContainer extraClass="fr-grid-row fr-mt-5w">
          <MeetingMainResponse setQuestion={setQuestion} setContext={setContext} />{' '}
          {user.chatId !== 0 && user.lastStreamId !== 0 && <MeetingAdditionalResponse />}
          {!user.chatId && <MeetingFirstQuestionHelper />}
        </GlobalRowContainer>
        <div ref={refBottom} />
      </div>
    )
  },
  (prevProps, nextProps) => {
    return JSON.stringify(prevProps.setQuestion) === JSON.stringify(nextProps.setQuestion)
  },
)
