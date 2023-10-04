import agentAvatar from "../../icons/others/agent-avatar.svg"
import userAvatar from "../../icons/user/user-avatar.svg"

export function Avatar(props) {

	const	{ user } = props;
	
	return (
        <div className={user === 'agent' ? "agent-avatar" : "user-avatar"}>
            {user === 'agent' ? 
                <div><img src={agentAvatar} alt="Logo" /></div> 
                :
                <div><img src={userAvatar} alt="Logo" /></div>
            }
        </div>
	);
}