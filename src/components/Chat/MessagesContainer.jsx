import { SideTabs } from './SideTabs';
import { initTabs, TabContent } from '../../utils/manageTabs';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export function MessagesContainer() {
	const	tabs = useSelector((state) => state.tabs);
	const	dispatch = useDispatch();
	
	return (
		<div className="wrapper-container">
			<div className='flex justify-center items-center'>
		 		<SideTabs state={tabs} dispatch={dispatch}/>
			</div>
			<div className='chat-container'>
				{tabs.activeTab === 0 && <TabContent content={initTabs()[0]} />}
				{tabs.activeTab === 1 && <TabContent content={initTabs()[1]} />}
				{/* {tabs.activeTab === 2 && <TabContent content={initTabs()[2]} />} */}
			</div>
		</div>
	);
}