import { ModifyButton } from "../Global/ModifyButton";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";
import { sheetsTitle } from "../../constants/sheets";
import { GlobalSecondaryTitle } from "../Global/GlobalSecondaryTitle";
import { GlobalColContainer } from "../Global/GlobalColContainer";

export const    SheetsAdditionalButtons = ({ isModifiable, setIsModifiable }) => {
	const	buttonTitle = isModifiable ? "Enregistrer" : "Modifier la section";
	const	buttonIcon = isModifiable ? "fr-icon-save-3-fill fr-icon--sm flex justify-end items-center" : "fr-icon-settings-5-fill fr-icon--sm flex justify-end items-center";

	const	handleClick = () => {
		setIsModifiable(!isModifiable);
	}

	return (
		<GlobalRowContainer>
			<GlobalSecondaryTitle>{sheetsTitle}</GlobalSecondaryTitle>
			<GlobalColContainer>
				<ModifyButton
					handleClick={handleClick}
					text={buttonTitle}
					extraClass={buttonIcon}
				/>
			</GlobalColContainer>
		</GlobalRowContainer>
	);
}