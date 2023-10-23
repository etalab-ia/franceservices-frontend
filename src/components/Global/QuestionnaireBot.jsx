import { UserChatTools } from "../User/UserChatTools";
import { Avatar } from "../Chat/Avatar";
import { BotQuestion } from "./BotQuestion";

export function	QuestionnaireBot({ id, question, type }) {

    return (
		<div className="col-message">
			<div className="row-message">
				<UserChatTools type={type}/>
				<Avatar user='agent' />
				<div className='ml-4'>
					<div className="py-4">{question}</div>
				</div>
			</div>
			<BotQuestion id={id} />
		</div>
	);
}