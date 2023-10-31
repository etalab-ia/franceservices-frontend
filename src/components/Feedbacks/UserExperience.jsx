import { Avatar } from "../Chat/Avatar";
import { UserChatTools } from "../User/UserChatTools";
import { Feedback } from "./Feedback";
import { askingQuality, redoAskingQuality } from "../../constants/feedback";
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { scrollToBottom } from "../../utils/manageEffects";

const	AskingResponseQuality = ({ tabsLen }) => {
	return (
		<div className='ml-4'>
			<div className="py-4">
				{tabsLen > 1 ? redoAskingQuality : askingQuality}
			</div>
		</div>
	);
}

export function UserExperience({ isArchive }) {
	const	stream = useSelector((state) => state.stream);
	const	history = useSelector((state) => state.history);
	const	tabsLen = stream.historyStream.length;

	useEffect(() => { scrollToBottom(); }, [stream, history, tabsLen]);

	return (
		<div className="col-message mt-8">
			{history.activeTab === tabsLen && <div>
				<div className="row-message">
					<UserChatTools type='sheets'/>
					<Avatar user='agent' />
					<AskingResponseQuality tabsLen={tabsLen} />
				</div>
				<Feedback isFirst={tabsLen === 1} isArchive={isArchive}/>
			</div>}
		</div>
	);
}