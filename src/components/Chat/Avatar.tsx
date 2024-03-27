import { robotAvatarDescription, userAvatarDescription } from '@constants/chatbotProps'
import agentAvatar from '../../../icons/others/agent-avatar.svg'
import userAvatar from '../../../icons/user/user-avatar.svg'
import { AvatarContainer } from './AvatarContainer'

export function Avatar({ user }) {
  const theme = localStorage.getItem('scheme')
  console.log('theme', theme)
  return (
    <AvatarContainer>
      {user === 'agent' ? (
        theme === 'dark' ? (
          <div>
            <img src={agentAvatar} alt={robotAvatarDescription} />
          </div>
        ) : (
          <div>
            <img src={agentAvatar} alt={robotAvatarDescription} />
          </div>
        )
      ) : theme === 'dark' ? (
        <div>
          <img src={userAvatar} alt={userAvatarDescription} />
        </div>
      ) : (
        <div>
          <img src={userAvatar} alt={userAvatarDescription} />
        </div>
      )}
    </AvatarContainer>
  )
}
