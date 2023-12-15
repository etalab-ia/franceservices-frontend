import { ModifyButton } from "../Global/ModifyButton";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { numberOfSelectedSheets, sheetsTitle } from "../../constants/sheets";
import { GlobalSecondaryTitle } from "../Global/GlobalSecondaryTitle";
import { GlobalColContainer } from "../Global/GlobalColContainer";

export const    SheetsAdditionalButtons = ({ isModifiable, setIsModifiable, removedSheets, setRemovedSheets, selectedSheets }) => {
	const	buttonTitle = isModifiable ? "Enregistrer" : "Modifier la section";
	const	buttonIcon = isModifiable ? "fr-icon-save-3-fill fr-icon--sm flex justify-end items-center" : "fr-icon-settings-5-fill fr-icon--sm flex justify-end items-center";
	
	const	handleClick = () => {
		setIsModifiable(!isModifiable);
	}

	const	handleRemoveSheet = () => {
		setRemovedSheets(removedSheets.concat(selectedSheets));
		setIsModifiable(false);
		
		// TODO: POST sheets to remove
	}

	return (
		<GlobalRowContainer>
		<GlobalColContainer>
			<GlobalSecondaryTitle>{sheetsTitle}</GlobalSecondaryTitle>
			{numberOfSelectedSheets(selectedSheets.length)}
			{/* {selectedSheets.length !== 0 && <ModifyButton
				handleClick={handleRemoveSheet}
				text="Supprimer"
			/>} */}
			</GlobalColContainer>
			<GlobalColContainer>
				{removedSheets.length !== 3 && <ModifyButton
					handleClick={handleClick}
					text={buttonTitle}
					extraClass={buttonIcon}
				/>}
			</GlobalColContainer>
		</GlobalRowContainer>
	);
}