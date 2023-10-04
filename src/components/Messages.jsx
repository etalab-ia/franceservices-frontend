import { Display } from './Display';
import { UserMessage } from '../components/UserMessage';
import { UserTools } from './UserTools';

export function Messages(props) {

    const   { state, dispatch } = props;

	return (
		<div className="wrapper-container">
			<div className='flex justify-center items-center'>
		 		<UserTools />
			</div>
		 	<div className="chat-container">
		 		<Display
		 			state={state}
		 		/>
		 		<UserMessage 
		 			state={state}
		 			dispatch={dispatch}
		 		/>
		 	</div>
		</div>
	);
}