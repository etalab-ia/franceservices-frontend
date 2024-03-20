import { indexesUrl } from '@api'
import { RootState } from '@types'
import { concatQueries } from '@utils/concatQueries'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIndexes } from 'utils/setData'
import { GlobalColContainer } from '../Global/GlobalColContainer'
import { OneThirdScreenWidth } from '../Global/OneThirdScreenWidth'
import { UsefulLinks } from './UsefulLinks'

/*****************************************************************************************
	
	COMPONENTS:

		** The right pan of meeting, sheets and webservices
		
		**	DisplaySheets: set & display sheets cards from GET /indexes sheets

		**	UsefulLinks: set first webservices from GET /indexes sheets

		**	archive is undefined if the user is on editing meeting page	

 *****************************************************************************************/

export function MeetingAdditionalResponse() {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user.streamId) return

    const data = {
      question: concatQueries(user.question.query, user.history),
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
