import { useSelector } from 'react-redux'
import { RootState } from '@types'
import { redoUserQuestion } from '@constants/chatbotProps'
import { NotifyArchiving } from '../Archive/NotifyArchiving'
import { BotQuestion } from '../Global/BotQuestion'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { Avatar } from './Avatar'

export function NewQuestion() {
  const user = useSelector((state: RootState) => state.user)

  return (
    <>
      <GlobalRowContainer>
        <Avatar user="agent" />
        {redoUserQuestion}
      </GlobalRowContainer>
      {/* <BotQuestion id="newQuestion" choice={user.choices.newQuestion} /> */}
      {/* {!user.choices.newQuestion && <NotifyArchiving />} */}
    </>
  )
}
