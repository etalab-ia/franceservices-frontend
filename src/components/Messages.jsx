import { UserTools } from './UserChatTabs';
import { InitTabs, TabContent } from '../utils/manageTabs';
import { UserChatTools } from './UserChatTools';
export function Messages(props) {

    const   { state, dispatch } = props;

	return (
		<div className="wrapper-container">
			<div className='flex justify-center items-center'>
		 		<UserTools state={state} dispatch={dispatch} />
			</div>
			<div className='chat-container'>
				{state.activeTab === 0 && <TabContent content={InitTabs(props)[0]} />}
				{state.activeTab === 1 && <TabContent content={InitTabs(props)[1]} />}
				{state.activeTab === 2 && <TabContent content={InitTabs(props)[2]} />}
			</div>
		</div>
	);
}