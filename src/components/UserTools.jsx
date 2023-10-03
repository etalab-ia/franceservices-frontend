import saved from "../../icons/usertools/saved.svg"
import history from "../../icons/usertools/history.svg"
import conversation from "../../icons/usertools/conversation.svg"
import question from "../../icons/usertools/question.svg"

export function UserTools(props) {

	const	{ state, dispatch } = props;

	return (
		<div className="side-tools-container">
			<button className="side-tools bg-[#6A6AF4]" ><img src={conversation} alt="Conversation button" /></button>
			<button className="side-tools"><img src={history} alt="Logo" /></button>
			<button className="side-tools"><img src={saved} alt="Logo" /></button>
			<div className="side-tools"><img src={question} alt="Logo" /></div>
		</div>
	);
}