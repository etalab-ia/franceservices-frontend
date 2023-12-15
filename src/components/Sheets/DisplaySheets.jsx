import { useSelector } from 'react-redux';
import { sheetsTitle } from '../../constants/sheets';
import { GlobalColContainer } from '../Global/GlobalColContainer';
import { SheetsTilesContainer } from './SheetsTilesContainer';
import { GlobalSecondaryTitle } from '../Global/GlobalSecondaryTitle';
import { useState } from 'react';
import { SheetsAdditionalButtons } from './SheetsAdditionalButtons';
import { GlobalRowContainer } from '../Global/GlobalRowContainer';

export function	DisplaySheets({ currQuestion, archiveSheets }) {
	const	[isModifiable, setIsModifiable] = useState(false);
	const	[selectedSheets, setSelectedSheets] = useState([]);
	const	[removedSheets, setRemovedSheets] = useState([]);
	
	return (
		<GlobalColContainer>
			<SheetsAdditionalButtons
				isModifiable={isModifiable}
				setIsModifiable={setIsModifiable}
				removedSheets={removedSheets}
				setRemovedSheets={setRemovedSheets}
				selectedSheets={selectedSheets}
			/>
			<SheetsTilesContainer
				currQuestion={currQuestion}
				archiveSheets={archiveSheets}
				isModifiable={isModifiable}
				setIsModifiable={setIsModifiable}
				removedSheets={removedSheets}
				setRemovedSheets={setRemovedSheets}
				selectedSheets={selectedSheets}
				setSelectedSheets={setSelectedSheets}
			/>
		</GlobalColContainer>		
	);
}