import { useState } from "react";
import { askingSpecificDocumentation } from "../../constants/ressources";
import { DisplayRessources } from "./DisplayRessources";
import { QuestionnaireBot } from "../Global/QuestionnaireBot";

export function Ressources() {
	const   [display, setDisplay] = useState(false);

	return (
		<div className="col-message">
			<QuestionnaireBot
				setDisplay={setDisplay}
				question={askingSpecificDocumentation}
				type={'quality'}
			/>
			<div className="user-feedback-container">
				{display === true && <DisplayRessources/>}
			</div>
		</div>
	);
}