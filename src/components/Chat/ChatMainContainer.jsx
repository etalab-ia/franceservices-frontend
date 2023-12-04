import { useDispatch, useSelector } from 'react-redux';
import { NOT_SET } from '../../constants/status';
import { Display } from './Display';
import { UserMessage } from '../User/UserMessage';
import { useEffect } from 'react';
import { scrollToBottom } from '../../utils/manageEffects';
import { initialChatbotMessage } from '../../constants/chatbotProps';
import { checkConnexion } from '../../utils/localStorage';
import { DefaultQuestions } from '../Global/DefaultQuestions';
import { ChatOverflowManagementContainer } from './ChatOverflowManagementContainer';
import { ChatHeightContainer } from './ChatHeightContainer';

export function ChatMainContainer({ archive }) {
	const	auth = useSelector((state) => state.auth);
	const	user = useSelector((state) => state.user);
	const	feedback = useSelector((state) => state.feedback);
	const	stream = useSelector((state) => state.stream);
	const   dispatch = useDispatch();

	useEffect(() => {
		if (archive)
			return ;
		dispatch({ type: 'SET_INITIAL_STREAM' });
		dispatch({ type: 'SET_INITIAL_USER' });
		dispatch({ type: 'SET_MESSAGES', nextMessage: { text: initialChatbotMessage, sender: 'agent' } });
		checkConnexion(auth, dispatch);
	}, []);

	useEffect(() => { scrollToBottom(); }, [user, feedback, stream, dispatch]);

	return (
		<ChatHeightContainer>
			<ChatOverflowManagementContainer>
				{archive ?
					<Display
						messages={[{text: archive.question.query, sender: 'user'}, {text: archive.agentResponse, sender: 'agent'}]}
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