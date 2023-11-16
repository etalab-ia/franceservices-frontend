import { Avatar } from "../Chat/Avatar";
import { BotQuestion } from "./BotQuestion";

export function	QuestionnaireBot({ id, question, type, choice }) {

    return (
		<div className="col-message">
			<div className="row-message ml-[56px]">
				<Avatar user='agent' />
				<div className='ml-4'>
					<div className="py-4">{question}</div>
				</div>
			</div>
			<BotQuestion id={id} choice={choice}/>
		</div>
	);
}