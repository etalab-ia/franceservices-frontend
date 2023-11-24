import { DisplayChatTab } from '../components/Chat/DisplayChatTab';
import { GlobalDiv } from '../components/Global/GlobalDiv';
import { GlobalRowContainer } from '../components/Global/GlobalRowContainer';

export function Chatbot() {
	return (<GlobalRowContainer>
		<GlobalDiv>
			<DisplayChatTab />
		</GlobalDiv>
	</GlobalRowContainer>);
}