import { robotAvatarDescription, userAvatarDescription } from '@constants/chatbotProps'
import userAvatar from '../../../icons/chat/Bulle-Utilisateur.svg'
import agentAvatar from '../../../icons/chat/Bulle-Albert.svg'
import { AvatarContainer } from './AvatarContainer'

export function Avatar({ user }) {
  const theme = localStorage.getItem('scheme')
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
