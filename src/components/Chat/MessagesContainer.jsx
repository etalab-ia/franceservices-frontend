import { SideTabs } from './SideTabs';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { DisplayArchiveTabs } from '../Archive/DisplayArchiveTab';
import { DisplayChatTab } from './DisplayChatTab';

export function MessagesContainer() {
	const	tabs = useSelector((state) => state.tabs);
	const	dispatch = useDispatch();

	return (
		<div className='wrapper-container'>
			<SideTabs state={tabs} dispatch={dispatch}/>
			<div className='chat-container'>
				{tabs.activeTab === 0 && <DisplayChatTab />}
				{tabs.activeTab === 1 && <DisplayArchiveTabs />}
			</div>
		</div>
	);
}
