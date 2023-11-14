import { useState } from "react";
import { askingDocumentationChoice } from "../../constants/ressources";
import { ConfirmationButton } from "./ConfirmationButton";
import { RessourceOptions } from "./RessourceOptions";
import { NOT_SET } from "../../constants/status";

export function	DisplayRessources({ archive }) {
	const	[isConfirmed, setIsConfirmed] = useState(false);

	return (
		<>
		{!isConfirmed &&
			<div>
				<p>{askingDocumentationChoice}</p>
				<RessourceOptions archive={archive}/>
				{archive === NOT_SET && <ConfirmationButton setIsConfirmed={setIsConfirmed}/>}
			</div>
		}
		</>
	);
}