import { redoUserQuestion } from '@constants/chatbotProps'
import type { RootState } from '@types'
import { useSelector } from 'react-redux'
import { NotifyArchiving } from '../Archive/NotifyArchiving'
import { BotQuestion } from '../Global/BotQuestion'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { Avatar } from './Avatar'

export function NewQuestion() {
  const user = useSelector((state: RootState) => state.user)

  return (
    <>
      <GlobalRowContainer>
        <div className="hide-on-smallscreen">
          <Avatar user="agent" />
        </div>
        {redoUserQuestion}
      </GlobalRowContainer>
      {/* <BotQuestion id="newQuestion" choice={user.choices.newQuestion} /> */}
      {/* {!user.choices.newQuestion && <NotifyArchiving />} */}
    </>
  )
}
