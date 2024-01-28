import { Avatar } from "./Avatar"
import { UserChatTools } from "../User/UserChatTools"

export function AvatarToolsContainer({ archive }) {
	return (
		<div>
			<div className="w-fit">
				<Avatar user="agent" />
			</div>
// @ts-expect-error TS(2304) FIXME: Cannot find name 'type'.
// @ts-expect-error TS(2304): Cannot find name 'type'.
// @ts-expect-error TS(2322): Type '{ type: string; isArchive: any; }' is not as... Remove this comment to see the full error message
// @ts-expect-error TS(2304): Cannot find name 'type'.
// @ts-expect-error TS(2322) FIXME: Type '{ type: string; isArchive: any; }' is not as... Remove this comment to see the full error message
// @ts-expect-error TS(2322): Type '{ type: string; isArchive: any; }' is not as... Remove this comment to see the full error message
			<UserChatTools type="sheets" isArchive={archive} />
		</div>
	)
}
