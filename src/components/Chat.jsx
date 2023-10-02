import { Messages } from "./Messages";

export function Chat(props) {

    const   { state, dispatch } = props;

	return (
		<div>
			{/* <Avatar /> */}
			<Messages state={state} dispatch={dispatch} />
		</div>
	);
}