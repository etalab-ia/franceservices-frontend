import { ModifyButton } from "../Global/ModifyButton";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { numberOfSelectedSheets } from "../../constants/sheets";

export const    SheetsAdditionalButtons = ({ isModifiable, setIsModifiable, removedSheets, setRemovedSheets, selectedSheets }) => {
	
	const	handleClick = () => {
		setIsModifiable(!isModifiable);
	}

	const	handleRemoveSheet = () => {
		setRemovedSheets(removedSheets.concat(selectedSheets));
		setIsModifiable(false);
		
		// TODO: POST sheets to remove
	}

	return <>
		{numberOfSelectedSheets(selectedSheets.length)}
		<GlobalRowContainer>
			{selectedSheets.length !== 0 && <ModifyButton
				handleClick={handleRemoveSheet}
				text="Supprimer"
			/>}
			{removedSheets.length !== 3 && <ModifyButton
				handleClick={handleClick}
				text="Modifier"
			/>}
		</GlobalRowContainer>
	</>
}