import { ArchiveType, RootState } from '@types'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { MeetingAdditionalResponse } from './MeetingAdditionalResponse'
import { MeetingMainResponse } from './MeetingMainResponse'
import { useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'

/*
 *	Contains text response from the bot and additional informations like sheets and chunks, useful links
 */
export function MeetingCurrentResponse() {
  const user = useSelector((state: RootState) => state.user)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current === null) return
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }, [user.messages])
  return (
    <>
      {user.history.length !== 0 && (
        <>
          <h3 ref={ref} className="font-bold ">
            Votre question
          </h3>
          <div className="min-h-12 fr-mb-2w fr-background-alt--blue-france flex items-center fr-p-2w ">
            <p>{user.question.query}</p>
          </div>
        </>
      )}
      <GlobalRowContainer extraClass="fr-grid-row--center gap-[24px] ">
        <MeetingMainResponse archive={undefined} />
        <MeetingAdditionalResponse archive={undefined} />
      </GlobalRowContainer>
    </>
  )
}
