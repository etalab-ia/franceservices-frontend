import { useDispatch, useSelector } from 'react-redux';
import { NOT_SET } from '../../constants/status';
import { Display } from './Display';
import { UserMessage } from '../User/UserMessage';
import { useEffect } from 'react';
import { scrollToBottom } from '../../utils/manageEffects';
import { DisplaySheets } from '../Sheets/DisplaySheets';
import { DefaultQuestions } from '../Global/DefaultQuestions';
export function DisplayChatTab() {
	const	user = useSelector((state) => state.user);
	const	feedback = useSelector((state) => state.feedback);
	const	stream = useSelector((state) => state.stream);
	const   dispatch = useDispatch();

	useEffect(() => { scrollToBottom(); }, [user, feedback, stream, dispatch]);

	// console.log(user.messages)
	return (
		<div className='row-message'>
			<div className='my-10 w-3/5 px-6 mx-14 border'>
				<Display messages={user.messages} archive={NOT_SET}/>
				<DefaultQuestions />
				<UserMessage />
			</div>
			<DisplaySheets />
		</div>
	);
}