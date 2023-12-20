import { Avatar } from "./Avatar";
import { UserChatTools } from "../User/UserChatTools";

export function AvatarToolsContainer({ archive }) {
	return (
		<div>
			<div className="w-fit">
				<Avatar user="agent"/>
			</div>
			<UserChatTools
				type='sheets'
				isArchive={archive}
			/>
		</div>
	);
}