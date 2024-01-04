import { useDispatch, useSelector } from 'react-redux';
import { Display } from './Display';
import { UserMessage } from '../User/UserMessage';
import { useEffect } from 'react';
import { scrollToBottom } from '../../utils/manageEffects';
import { DefaultQuestions } from '../Global/DefaultQuestions';
import { ChatOverflowManagementContainer } from './ChatOverflowManagementContainer';
import { ChatHeightContainer } from './ChatHeightContainer';

export function ChatMainContainer({ archive }) {
	const	user = useSelector((state) => state.user);
	const	feedback = useSelector((state) => state.feedback);
	const	stream = useSelector((state) => state.stream);
	const   dispatch = useDispatch();

	useEffect(() => {
		!archive && dispatch({ type: 'SET_INITIAL_CHAT' });
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [user, feedback, stream, dispatch]);

	return (
		<ChatHeightContainer>
			<ChatOverflowManagementContainer>
				{archive ?
					<Display
						messages={archive.messages}
						archive={true}
					/>
					:
					<Display
						messages={user.messages}
						archive={false}
					/>
				}
			</ChatOverflowManagementContainer>
			{!archive && <DefaultQuestions />}
			{!archive && <UserMessage />}
		</ChatHeightContainer>
	);
}