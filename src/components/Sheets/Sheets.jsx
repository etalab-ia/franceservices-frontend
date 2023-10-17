import { askingSheetsNeeded } from "../../constants/sheets";
import { QuestionnaireBot } from "../Global/QuestionnaireBot";
import { DisplaySheets } from "./DisplaySheets";

export function Sheets({ display, setDisplay }) {

	return (
		<div className="col-message">
			<QuestionnaireBot 
				setDisplay={setDisplay}
				question={askingSheetsNeeded}
				type={'sheets'}
			/>
			{display === true && <DisplaySheets />}
		</div>
	);
}