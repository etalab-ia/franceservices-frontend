import { notifyArchiving } from "../../constants/chatbotProps"
import { useSelector } from "react-redux"
import { archiveNotificationRole } from "../../constants/archive"

export function NotifyArchiving() {
	// @ts-expect-error TS(2339): Property 'user' does not exist on type 'unknown'.
	const user = useSelector((state) => state.user)
	const title =
		user.messages[user.messages.length - 1].text.length > 40
			? user.messages[user.messages.length - 1].text.slice(0, 40) + "..."
			: user.messages[user.messages.length - 1].text

	return (
		<div role={archiveNotificationRole}>
			<div className="archive-notification-text fr-ml-7w fr-mb-2w">
				{notifyArchiving(`« ${title} »`)}
			</div>
		</div>
	)
}
