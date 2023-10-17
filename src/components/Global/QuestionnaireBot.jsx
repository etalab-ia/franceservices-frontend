import { UserChatTools } from "../User/UserChatTools";
import { Avatar } from "../Chat/Avatar";
import { BotQuestion } from "./BotQuestion";

export function	QuestionnaireBot({ setDisplay, question, type }) {

    return (
		<div className="col-message">
			<div className="row-message mt-12">
				<UserChatTools type={type}/>
				<Avatar user='agent' />
				<div className='ml-4'>
					<div className="py-4">{question}</div>
				</div>
			</div>
			<BotQuestion setDisplay={setDisplay} />
		</div>
	);
}