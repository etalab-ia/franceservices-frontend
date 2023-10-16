import { Avatar } from "../Chat/Avatar";
import { UserChatTools } from "../User/UserChatTools";
import { Feedback } from "./Feedback";
import { askingQuality, redoAskingQuality } from "../../constants/feedback";
import { useSelector } from 'react-redux';

const	AskingResponseQuality = ({ history, historyLocal, tabsLen }) => {

	return (
	<div className='ml-4'>
		<div className="py-4">
			{tabsLen > 1 ? redoAskingQuality : askingQuality}
		</div>
	</div>
	);
}

export function UserExperience() {
	const	history = useSelector((state) => state.history);

	// TODO: delete local variables
	// const	historyLocal = [];
	const	historyLocal = ["tab 1", "tab 2", "tab 3"];
	const	tabsLen = historyLocal.length + 1;

	return (
		<div className="col-message mt-12">
			{history.activeTab === tabsLen && <div>
				<div className="row-message">
					<UserChatTools type='quality'/>
					<Avatar user='agent' />
					<AskingResponseQuality history={history} historyLocal={historyLocal} tabsLen={tabsLen}/>
				</div>
				<Feedback isFirst={tabsLen === 1}/>
			</div>}
		</div>
	);
}