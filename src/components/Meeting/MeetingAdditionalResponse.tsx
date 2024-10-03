import { indexesUrl } from '@api'
import type { RootState } from '@types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIndexes } from 'utils/setData'
import { GlobalColContainer } from '../Global/GlobalColContainer'
import { OneThirdScreenWidth } from '../Global/OneThirdScreenWidth'
import { UsefulLinks } from './UsefulLinks'

/*****************************************************************************************
	
	COMPONENTS:

		** The right pan of meeting, sheets and webservices
		
		**	UsefulLinks: set first webservices from GET /indexes sheets

 *****************************************************************************************/

export function MeetingAdditionalResponse() {
  const { webservices, streamId, question } = useSelector((state: RootState) => ({
    webservices: state.user.webservices,
    streamId: state.user.streamId,
    question: state.user.question,
  }))
  const dispatch = useDispatch()

  useEffect(() => {
    if (!streamId) return

    const data = {
      question: question.query,
      must_not_sids: question.must_not_sids,
    }
    getIndexes(data, dispatch, question.limit, JSON.stringify(streamId), indexesUrl)
  }, [streamId, question])
  return (
    <OneThirdScreenWidth>
      <GlobalColContainer>
        {webservices?.length > 0 && <UsefulLinks webservices={webservices} />}
      </GlobalColContainer>
    </OneThirdScreenWidth>
  )
}
