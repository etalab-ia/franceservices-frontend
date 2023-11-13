import { Avatar } from "./Avatar";

export const	DisplaySingleMessage = ({ sender, text }) => {
	const	isUser = sender === "user";
	const	classNames = isUser ? "user-message" : "row-message";

	return (
		<div className={classNames}>
			<div className={`w-[648px] ${isUser ? "mr-4" : "ml-4"}`}>
				<div className={isUser ? "user-chat" : "agent-chat"}>{text}</div>
			</div>
			{isUser && <Avatar user={sender} />}
		</div>
	);
}