import agentAvatar from '../../../icons/chat/Bulle-Albert.svg'
import userAvatar from '../../../icons/chat/Bulle-Utilisateur.svg'

export function Avatar({ user }) {
  const theme = localStorage.getItem('scheme')
  return (
    <div className="avatar">
      {user === 'agent' ? (
        theme === 'dark' ? (
          <div>
            <img src={agentAvatar} alt="Avatar de Albert" />
          </div>
        ) : (
          <div>
            <img src={agentAvatar} alt="Avatar de Albert" />
          </div>
        )
      ) : theme === 'dark' ? (
        <div>
          <img src={userAvatar} alt="Avatar de l'utilisateur" />
        </div>
      ) : (
        <div>
          <img src={userAvatar} alt="Avatar de l'utilisateur" />
        </div>
      )}
    </div>
  )
}
