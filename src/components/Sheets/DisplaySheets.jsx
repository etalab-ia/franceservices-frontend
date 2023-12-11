import { useSelector } from 'react-redux';
import { sheetsTitle } from '../../constants/sheets';
import { GlobalColContainer } from '../Global/GlobalColContainer';
import { SheetsTilesContainer } from './SheetsTilesContainer';

export function	DisplaySheets({ currQuestion, archiveSheets }) {
	const	userToken = useSelector((state) => state.auth.userToken);

	return (
		<GlobalColContainer>
			{sheetsTitle}
			<SheetsTilesContainer
				currQuestion={currQuestion}
				archiveSheets={archiveSheets}
				userToken={userToken}
			/>
		</GlobalColContainer>		
	);
}