import { Avatar } from "./Avatar";
import { UserChatTools } from "./UserChatTools";
import { Feedback } from "./Feedback";
import { askingQuality } from "../constants/feedback";

export function UserExperience() {
	return (
		<div className="col-message">
			<div className="row-message mt-12">
				<UserChatTools />
				<Avatar user='agent' />
				<div className='ml-4'>
					<div className="py-4">{askingQuality}</div>
				</div>
			</div>
			<Feedback />
		</div>
	);
}