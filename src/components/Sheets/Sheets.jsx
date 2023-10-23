import { useSelector } from "react-redux";
import { askingSheetsNeeded } from "../../constants/sheets";
import { QuestionnaireBot } from "../Global/QuestionnaireBot";
import { DisplaySheets } from "./DisplaySheets";

export function Sheets() {
	const	user = useSelector((state) => state.user);

	return (
		<div className="col-message mt-8">
			<QuestionnaireBot 
				id='sheets'
				question={askingSheetsNeeded}
				type={'sheets'}
			/>
			{!user.choices.sheets && <DisplaySheets />}
		</div>
	);
}