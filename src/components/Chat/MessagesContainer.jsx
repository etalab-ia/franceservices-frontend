import { SideTabs } from './SideTabs';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { DisplayChatTab } from './DisplayChatTab';
import { useEffect } from 'react';
import { checkConnexion } from '../../utils/localStorage';

export function MessagesContainer() {
	const	tabs = useSelector((state) => state.tabs);
	const	auth = useSelector((state) => state.auth);
	const	dispatch = useDispatch();

  useEffect(() => { checkConnexion(auth, dispatch); }, []);

	//	TODO: change height
	return (
		<div className={`wrapper-container col-message min-h-[654px]`}>
			{tabs.activeTab === 0 && <DisplayChatTab />}
			{/* {tabs.activeTab === 1 && <DisplayArchiveTabs />} */}
		</div>
	);
}
