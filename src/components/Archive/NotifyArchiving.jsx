import { useEffect } from "react";
import { notifyArchiving } from "../../constants/chatbotProps";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setArchive } from "../../utils/archive";
import { archiveNotificationRole } from "../../constants/archive";

export function NotifyArchiving() {
	const   user = useSelector((state) => state.user);
	const   stream = useSelector((state) => state.stream);
	const	title = user.messages[user.messages.length - 1].text.length > 40 ? user.messages[user.messages.length - 1].text.slice(0, 40) + '...' : user.messages[user.messages.length - 1].text;
	const	dispatch = useDispatch();

	useEffect(() => {
		setArchive(dispatch, stream, user, 'qr');
	}, [user.choices.newQuestion])

	return (
		<div role={archiveNotificationRole}>
			<div className="archive-notification-text fr-mb-2w">{notifyArchiving(`« ${title} »`)}</div>
		</div>
	);
}