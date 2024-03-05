import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@types'
import { emitCloseStream } from 'utils/eventsEmitter'
import { generateStream } from 'utils/hooks'

import { getIndexes } from 'utils/setData'
import { indexesUrl } from 'constants/api'

// Custom Hook
function useMeetingAdditionalResponse() {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    // if (archive) return

    if (!user.chatId) {
      emitCloseStream()
      generateStream(user.question, dispatch, user.chatId, false)
    }

    if (user.streamId) {
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
    }
  }, [user.chatId, user.streamId, user.question])
}

export default useMeetingAdditionalResponse
