import { DisplayChatTab } from '../components/Chat/DisplayChatTab';
import { GlobalDiv } from '../components/Global/GlobalDiv';
import { GlobalRowContainer } from '../components/Global/GlobalRowContainer';

export function Chatbot() {
	return (<GlobalRowContainer extraClass='fr-grid-row--center'>
		<GlobalDiv>
			<DisplayChatTab />
		</GlobalDiv>
	</GlobalRowContainer>);
}