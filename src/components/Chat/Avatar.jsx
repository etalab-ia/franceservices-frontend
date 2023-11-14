import agentAvatar from "../../../icons/others/agent-avatar.svg"
import userAvatar from "../../../icons/user/user-avatar.svg"
import { robotAvatarDescription, userAvatarDescription } from "../../constants/chatbotProps";

export function Avatar({ user }) {
	
	return (
        <div className="avatar">
            {user === 'agent' ? 
                <div><img src={agentAvatar} alt={robotAvatarDescription} /></div> 
                :
                <div><img src={userAvatar} alt={userAvatarDescription} /></div>
            }
        </div>
	);
}