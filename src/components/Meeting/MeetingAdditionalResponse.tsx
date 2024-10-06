import { indexesUrl } from '@api'
import type { RootState } from '@types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIndexes } from 'utils/setData'
import { GlobalColContainer } from '../Global/GlobalColContainer'
import { OneThirdScreenWidth } from '../Global/OneThirdScreenWidth'
import { UsefulLinks } from './UsefulLinks'
import { createSelector } from 'reselect'

/*****************************************************************************************
	
	COMPONENTS:

		** The right pan of meeting, sheets and webservices
		
		**	UsefulLinks: set first webservices from GET /indexes sheets

 *****************************************************************************************/

const AdditionnalResponseSelector = createSelector(
  (state: RootState) => state.user.webservices,
  (webservices) => webservices,
  (state: RootState) => state.user.streamId,
  (streamId) => streamId,
  (state: RootState) => state.user.question,
  (question) => question,
)

export function MeetingAdditionalResponse() {
  const user = useSelector(AdditionnalResponseSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user.streamId) return

    const data = {
      question: user.question.query,
      must_not_sids: user.question.must_not_sids,
    }
    getIndexes(
      data,
      dispatch,
      user.question.limit,
      JSON.stringify(user.streamId),
      indexesUrl,
    )
  }, [user.streamId, user.question])
  return (
    <OneThirdScreenWidth>
      <GlobalColContainer>
        {user.webservices?.length > 0 && <UsefulLinks webservices={user.webservices} />}
      </GlobalColContainer>
    </OneThirdScreenWidth>
  )
}
