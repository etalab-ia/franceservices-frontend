import { useSelector } from 'react-redux'
import type { RootState } from 'types'
import { GlobalColContainer } from '../Global/GlobalColContainer'
import { MeetingRelatedQuestions } from './MeetingRelatedQuestions'
import { MeetingStream } from './MeetingStream'

export function MeetingMainResponse(setQuestion) {
  const user = useSelector((state: RootState) => state.user)
  const stream = useSelector((state: RootState) => state.stream)

  return (
    <GlobalColContainer extraClass=" fr-mb-7w flex flex-col  justify-between bg-red-400 ">
      <div>
        {user.chatId !== 0 && (
          <>
            <MeetingStream />
            {!stream.isStreaming && <MeetingRelatedQuestions setQuestion={setQuestion} />}
          </>
        )}
      </div>
    </GlobalColContainer>
  )
}
