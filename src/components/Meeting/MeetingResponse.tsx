import { ArchiveType, RootState } from 'types'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { MeetingAdditionalResponse } from './MeetingAdditionalResponse'
import { MeetingMainResponse } from './MeetingMainResponse'
import { useSelector } from 'react-redux'

/*
 *	Contains text response from the bot and additional informations like sheets and chunks, useful links
 */
export function MeetingResponse({ archive }: { archive: ArchiveType | undefined }) {
  const user = useSelector((state: RootState) => state.user)
  console.log('user', user)
  return (
    <>
      <h3 className="font-bold ">Votre question</h3>
      <div className="min-h-12 fr-mb-2w fr-background-alt--blue-france flex items-center fr-px-2w">
        <p>{user.question.query}</p>
      </div>
      <GlobalRowContainer extraClass="fr-grid-row--center">
        <MeetingMainResponse archive={archive} />
        <MeetingAdditionalResponse archive={archive} />
      </GlobalRowContainer>
    </>
  )
}
