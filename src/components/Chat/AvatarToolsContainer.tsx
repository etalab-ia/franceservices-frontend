import { Avatar } from "./Avatar"
import { UserChatTools } from "../User/UserChatTools"

export function AvatarToolsContainer() {
	return (
		<div>
			<div className="w-fit">
				<Avatar user="agent" />
			</div>
			<UserChatTools isArchive={false} />
		</div>
	)
}
