import { Avatar } from "../Chat/Avatar";
import { Feedback } from "./Feedback";
import { askingQuality, redoAskingQuality } from "../../constants/feedback";
import { useSelector } from 'react-redux';

const	AskingResponseQuality = ({ tabsLen }) => {
	return (
		<div className='streaming my-2 mb-4'>
			<div className="">
				{tabsLen > 1 ? redoAskingQuality : askingQuality}
			</div>
		</div>
	);
}

export function UserExperience({ isArchive }) {
	const	stream = useSelector((state) => state.stream);
	const	tabsLen = stream.historyStream.length;

	return (
		<div className="col-message">
			{stream.activeTab === tabsLen && <div>
				<div className="row-message ml-[56px]">
					<Avatar user='agent' />
					<AskingResponseQuality tabsLen={tabsLen} />
				</div>
				<Feedback isFirst={tabsLen === 1} isArchive={isArchive}/>
			</div>}
		</div>
	);
}