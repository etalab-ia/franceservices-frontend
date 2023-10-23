import { Avatar } from "../Chat/Avatar";
import { UserChatTools } from "../User/UserChatTools";
import { Feedback } from "./Feedback";
import { askingQuality, redoAskingQuality } from "../../constants/feedback";
import { useSelector } from 'react-redux';

const	AskingResponseQuality = ({ tabsLen }) => {

	return (
	<div className='ml-4'>
		<div className="py-4">
			{tabsLen > 1 ? redoAskingQuality : askingQuality}
		</div>
	</div>
	);
}

export function UserExperience() {
	const	stream = useSelector((state) => state.stream);
	const	history = useSelector((state) => state.history);
	const	tabsLen = stream.historyStream.length;

	return (
		<div className="col-message mt-8">
			{history.activeTab === tabsLen && <div>
				<div className="row-message">
					<UserChatTools type='sheets'/>
					<Avatar user='agent' />
					<AskingResponseQuality tabsLen={tabsLen}/>
				</div>
				<Feedback isFirst={tabsLen === 1}/>
			</div>}
		</div>
	);
}