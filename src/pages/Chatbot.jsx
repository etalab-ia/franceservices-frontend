import { DisplayChatTab } from '../components/Chat/DisplayChatTab';
import { GlobalDiv } from '../components/Global/GlobalDiv';
import { GlobalRowContainer } from '../components/Global/GlobalRowContainer';

export function Chatbot({ archive }) {
	return (
		<GlobalRowContainer extraClass='fr-grid-row--center'>
			<GlobalDiv>
				<DisplayChatTab archive={archive}/>
			</GlobalDiv>
		</GlobalRowContainer>
	);
}