import { Avatar } from "./Avatar";

export const	DisplaySingleMessage = ({ sender, text }) => {
	const	isUser = sender === "user";
	const	classNames = isUser ? "user-message" : "row-message";

	return (
		<div className={classNames}>
			{!isUser && <div className=""><Avatar user="agent" /></div>}
			<div className={`${isUser ? "mr-4" : "ml-4"}`}>
				<div className={isUser ? "user-chat" : "agent-chat"}>{text}</div>
			</div>
			{isUser && <Avatar user={sender} />}
		</div>
	);
}