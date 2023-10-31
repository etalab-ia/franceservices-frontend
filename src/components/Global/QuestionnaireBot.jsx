import { UserChatTools } from "../User/UserChatTools";
import { Avatar } from "../Chat/Avatar";
import { BotQuestion } from "./BotQuestion";
import { useEffect } from "react";
import { scrollToBottom } from "../../utils/manageEffects";

export function	QuestionnaireBot({ id, question, type, choice }) {
	useEffect(() => { scrollToBottom(); }, [question]);

    return (
		<div className="col-message">
			<div className="row-message">
				<UserChatTools type={type}/>
				<Avatar user='agent' />
				<div className='ml-4'>
					<div className="py-4">{question}</div>
				</div>
			</div>
			<BotQuestion id={id} choice={choice}/>
		</div>
	);
}