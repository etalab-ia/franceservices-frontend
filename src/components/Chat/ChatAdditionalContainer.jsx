import { useSelector } from 'react-redux';
import { DisplaySheets } from '../Sheets/DisplaySheets';
import { GlobalColContainer } from '../Global/GlobalColContainer';
import { OneThirdScreenWidth } from '../Global/OneThirdScreenWidth';

export function ChatAdditionalContainer({ archive }) {
	const	user = useSelector((state) => state.user);

	return (
		<OneThirdScreenWidth>
			<GlobalColContainer>
				{archive ? 
					<DisplaySheets
						archiveSheets={archive.sheets}
						archiveAdditionalSheets={archive.additionalSheets}
					/>
					:
					<DisplaySheets
						currQuestion={user.question.query}
					/>
				}
			</GlobalColContainer>
		</OneThirdScreenWidth>
	);
}