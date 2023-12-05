import { sheetsTitle } from '../../constants/sheets';
import { GlobalColContainer } from '../Global/GlobalColContainer';
import { MeetingTiles } from '../Meeting/MeetingTiles';

export function	DisplaySheets({ currQuestion, archiveSheets }) {
	return (
		<GlobalColContainer>
			{sheetsTitle}
			<MeetingTiles
				currQuestion={currQuestion}
				archiveSheets={archiveSheets}
			/>
		</GlobalColContainer>		
	);
}