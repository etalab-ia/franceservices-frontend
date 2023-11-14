import { useEffect } from "react";
import { notifyArchiving } from "../../constants/chatbotProps";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setArchive } from "../../utils/archive";
import { archiveNotificationRole } from "../../constants/archive";

export function NotifyArchiving() {
	const   archive = useSelector((state) => state.archive);
	const   user = useSelector((state) => state.user);
	const   stream = useSelector((state) => state.stream);
	const	title = user.messages[user.messages.length - 1].text.length > 50 ? user.messages[user.messages.length - 1].text.slice(0, 50) + '...' : user.messages[user.messages.length - 1].text;
	const	dispatch = useDispatch();

	useEffect(() => {
		if (user.choices.oldQuestion === user.choices.newQuestion)
			return ;

		setArchive(dispatch, stream, user.choices.newQuestion, user.choices);	
	}, [user.choices.newQuestion])

	return (
		<div role={archiveNotificationRole}>
			<div className="archive-notification-text">{notifyArchiving(`« ${title} »`)}</div>
			<div className="archive-separation"></div>
		</div>
	);
}