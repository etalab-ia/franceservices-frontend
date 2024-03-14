import { ArchiveType, RootState } from '@types'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { MeetingAdditionalResponse } from './MeetingAdditionalResponse'
import { MeetingMainResponse } from './MeetingMainResponse'
import { useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import Separator from 'components/Global/Separator'

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
      <h5 ref={ref} className="fr-mt-5w fr-mb-1w">
        {`Votre question ${user.history.length ? 'complémentaire' : ''}`}
      </h5>
      <div className="min-h-12 fr-mb-2w fr-background-alt--blue-france flex items-center fr-p-2w ">
        <p>{user.question.query}</p>
      </div>

      <GlobalRowContainer extraClass="fr-grid-row--center">
        <MeetingMainResponse />
        <MeetingAdditionalResponse />
      </GlobalRowContainer>
    </>
  )
}
