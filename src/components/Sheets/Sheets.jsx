import { Avatar } from "../Chat/Avatar";
import { UserChatTools } from "../User/UserChatTools";
import { askingSheetsNeeded } from "../../constants/sheets";
import { AskDisplaySheets } from "./AskDisplaySheets";
import { DisplaySheets } from "./DisplaySheets";

export function Sheets(props) {

    const   { display, setDisplay } = props;

	return (
		<div className="col-message">
			<div className="row-message mt-12">
				<UserChatTools type='sheets'/>
				<Avatar user='agent' />
				<div className='ml-4'>
					<div className="py-4">{askingSheetsNeeded}</div>
				</div>
			</div>
			<AskDisplaySheets setDisplay={setDisplay} />
			{display === true && <DisplaySheets />}
		</div>
	);
}