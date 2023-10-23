import { useEffect, useState } from "react";
import { askingSpecificDocumentation } from "../../constants/ressources";
import { DisplayRessources } from "./DisplayRessources";
import { QuestionnaireBot } from "../Global/QuestionnaireBot";
import { NOT_SET } from "../../constants/status";
import { useSelector } from "react-redux";

export function Ressources() {
	const	user = useSelector((state) => state.user);
	const   [display, setDisplay] = useState(user.choices.ressources);
	const	ressources = useSelector((state) => state.ressources);

	useEffect(() => setDisplay(ressources.isConfirmed), [ressources.isConfirmed]);

	return (
		<div>
			{ressources.isConfirmed != NOT_SET ?
				<></>
				:
				<div className="col-message">
					<QuestionnaireBot
						id='ressources'
						question={askingSpecificDocumentation}
						type={'sheets'}
					/>
					<div className="user-feedback-container">
						{!user.choices.ressources && <DisplayRessources/>}
					</div>
				</div>
			}
		</div>
	);
}