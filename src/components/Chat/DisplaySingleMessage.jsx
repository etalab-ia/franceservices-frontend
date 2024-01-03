import { Avatar } from "./Avatar";

export const	DisplaySingleMessage = ({ sender, text }) => {
	const	isUser = sender === "user";
	const	classNames = isUser ? "user-message" : "";

	return (
		<div className={classNames}>
			<div className={`${isUser ? "fr-mr-2w" : "fr-ml-2w"}`}>
				<p className={isUser ? "user-chat fr-mb-4w fr-p-2w" : "agent-chat fr-mb-4w fr-p-2w"}>{text}</p>
			</div>
			{isUser && <Avatar user={sender} />}
		</div>
	);
}