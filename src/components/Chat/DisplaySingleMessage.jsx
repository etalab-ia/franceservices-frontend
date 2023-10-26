import { UserChatTools } from "../User/UserChatTools";
import { Avatar } from "./Avatar";

export const	DisplaySingleMessage = ({ sender, text, isArchive }) => {
	const	isUser = sender === "user";
	const	classNames = isUser ? "user-message" : "row-message";

	return (
		<div className={classNames}>
			{!isUser && <div className="row-message">
				{isArchive && <UserChatTools type='sheets' />}
				{!isArchive && <UserChatTools />}
				<Avatar user={sender} />
			</div>}
			<div className={`w-[648px] ${isUser ? "mr-4" : "ml-4"}`}>
				<div className={isUser ? "user-chat" : "agent-chat"}>{text}</div>
			</div>
			{isUser && <Avatar user={sender} />}
		</div>
	);
}