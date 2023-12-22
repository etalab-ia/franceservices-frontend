import { GlobalColContainer } from '../Global/GlobalColContainer';
import { SheetsTilesContainer } from './SheetsTilesContainer';
import { useState } from 'react';
import { SheetsAdditionalButtons } from './SheetsAdditionalButtons';

export function	DisplaySheets({ currQuestion, archiveSheets, archiveAdditionalSheets, archiveWebservices }) {
	const	[isModifiable, setIsModifiable] = useState(false);
	
	return (
		<GlobalColContainer>
			<SheetsAdditionalButtons
				isModifiable={isModifiable}
				setIsModifiable={setIsModifiable}
				archive={archiveSheets}
			/>
			<SheetsTilesContainer
				currQuestion={currQuestion}
				archiveSheets={archiveSheets}
				archiveAdditionalSheets={archiveAdditionalSheets}
				archiveWebservices={archiveWebservices}
				isModifiable={isModifiable}
			/>
		</GlobalColContainer>		
	);
}