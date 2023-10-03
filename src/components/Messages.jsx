import { Display } from './Display';
import { UserMessage } from '../components/UserMessage';

export function Messages(props) {

    const   { state, dispatch } = props;

	return (
		<div className="wrapper-container">
		 	{/* <UserTools /> */}
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