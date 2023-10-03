import agentAvatar from "../../icons/others/agent-avatar.svg"
import userAvatar from "../../icons/user/user-avatar.svg"

export function Avatar(props) {

	const	{ user } = props;
	
	return (
        <div className="bg-[#F5F5FE] rounded-[90px] w-[56px] h-[56px] flex justify-center items-center text-center">
            {user === 'agent' ? 
                <div><img src={agentAvatar} alt="Logo" /></div> 
                :
                <div><img src={userAvatar} alt="Logo" /></div>
            }
        </div>
	);
}