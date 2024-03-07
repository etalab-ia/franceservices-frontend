import { ArchiveType, RootState } from 'types'
import { GlobalColContainer } from '../Global/GlobalColContainer'
import { OneThirdScreenWidth } from '../Global/OneThirdScreenWidth'
import { DisplaySheets } from '../Sheets/DisplaySheets'
import { UsefulLinks } from './UsefulLinks'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getIndexes } from 'utils/setData'
import { indexesUrl } from 'constants/api'
import { emitCloseStream } from 'utils/eventsEmitter'

/*****************************************************************************************
	
	COMPONENTS:

		** The right pan of meeting, sheets and webservices
		
		**	DisplaySheets: set & display sheets cards from GET /indexes sheets

		**	UsefulLinks: set first webservices from GET /indexes sheets

		**	archive is undefined if the user is on editing meeting page	

 *****************************************************************************************/

export function MeetingAdditionalResponse({
  archive,
}: { archive: ArchiveType | undefined }) {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user.streamId || archive) return

    const data = {
      question: user.question.query,
      must_not_sids: user.question.must_not_sids,
    }
    getIndexes(
      data,
      dispatch,
      'chunks',
      user.question.limit,
      JSON.stringify(user.streamId),
      indexesUrl
    )
    getIndexes(
      data,
      dispatch,
      'sheets',
      user.question.limit,
      JSON.stringify(user.streamId),
      indexesUrl
    )
  }, [user.streamId, user.question])
  return (
    <OneThirdScreenWidth extraClass="fr-mt-5w">
      {/* <DisplaySheets archive={archive ?? undefined} /> */}
      <GlobalColContainer>
        <UsefulLinks webservices={user.webservices} />
      </GlobalColContainer>
    </OneThirdScreenWidth>
  )
}
