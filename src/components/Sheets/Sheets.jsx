import { useSelector } from "react-redux";
import { askingSheetsNeeded } from "../../constants/sheets";
import { QuestionnaireBot } from "../Global/QuestionnaireBot";
import { DisplaySheets } from "./DisplaySheets";
import { NOT_SET } from "../../constants/status";

export function Sheets({ archive }) {
	const	user = useSelector((state) => state.user);
	const	choice = archive === NOT_SET ? NOT_SET : archive.choices.sheets;

	return (
		<div className="col-message mt-8">
			<QuestionnaireBot 
				id='sheets'
				question={askingSheetsNeeded}
				type={'sheets'}
				choice={choice}
			/>
			{!user.choices.sheets && <DisplaySheets />}
		</div>
	);
}