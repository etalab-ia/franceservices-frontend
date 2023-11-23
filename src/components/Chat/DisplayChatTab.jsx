import { useDispatch, useSelector } from 'react-redux';
import { NOT_SET } from '../../constants/status';
import { Display } from './Display';
import { UserMessage } from '../User/UserMessage';
import { useEffect } from 'react';
import { scrollToBottom } from '../../utils/manageEffects';
import { DisplaySheets } from '../Sheets/DisplaySheets';
import { initialChatbotMessage } from '../../constants/chatbotProps';
import { checkConnexion } from '../../utils/localStorage';

export function DisplayChatTab() {
	const	auth = useSelector((state) => state.auth);
	const	user = useSelector((state) => state.user);
	const	feedback = useSelector((state) => state.feedback);
	const	stream = useSelector((state) => state.stream);
	const   dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: 'SET_INITIAL_STREAM' });
		dispatch({ type: 'SET_INITIAL_USER' });
		dispatch({ type: 'SET_USER_MODEL_NAME_CHOICE', nextModelName: 'albert-light', nextMode: 'rag', nextLimit: 9 });
		dispatch({ type: 'SET_MESSAGES', nextMessage: { text: initialChatbotMessage, sender: 'agent' } });
		checkConnexion(auth, dispatch);
	}, []);

	useEffect(() => { scrollToBottom(); }, [user, feedback, stream, dispatch]);

	return (
		<div className='row-message'>
			<div className='my-10 w-3/5 mx-14'>
				<Display messages={user.messages} archive={NOT_SET}/>
				{/* <DefaultQuestions /> */}
				<UserMessage />
			</div>
			<DisplaySheets />
		</div>
	);
}