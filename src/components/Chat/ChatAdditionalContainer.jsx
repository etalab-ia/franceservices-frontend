import { useSelector } from 'react-redux';
import { DisplaySheets } from '../Sheets/DisplaySheets';
import { GlobalColContainer } from '../Global/GlobalColContainer';
import { OneThirdScreenWidth } from '../Global/OneThirdScreenWidth';

export function ChatAdditionalContainer() {
	const	user = useSelector((state) => state.user);

	return (
		<OneThirdScreenWidth>
			<GlobalColContainer>
				<DisplaySheets
					currQuestion={user.question.query}
				/>
			</GlobalColContainer>
		</OneThirdScreenWidth>
	);
}