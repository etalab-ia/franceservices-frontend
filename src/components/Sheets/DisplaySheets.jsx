import { GlobalColContainer } from '../Global/GlobalColContainer';
import { MeetingTiles } from '../Meeting/MeetingTiles';

export function	DisplaySheets({ currQuestion, archiveSheets }) {

	return (
		<GlobalColContainer>
			<h3 className="text-2xl font-bold fr-pb-3w">Liens pratiques</h3>
			<MeetingTiles
				currQuestion={currQuestion}
				archiveSheets={archiveSheets}
			/>
		</GlobalColContainer>		
	);
}