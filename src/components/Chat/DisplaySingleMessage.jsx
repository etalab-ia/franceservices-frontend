import { Avatar } from "./Avatar";

export const	DisplaySingleMessage = ({ sender, text }) => {
	const	isUser = sender === "user";
	const	classNames = isUser ? "user-message" : "";

	return (
		<div className={classNames}>
			<div className={`${isUser ? "fr-mr-2w" : "fr-ml-2w"}`}>
				<div className={isUser ? "user-chat fr-mb-4w" : "agent-chat fr-mb-4w"}>{text}</div>
			</div>
			{isUser && <Avatar user={sender} />}
		</div>
	);
}