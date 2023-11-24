import { GlobalRowContainer } from '../Global/GlobalRowContainer';
import { ChatMainContainer } from './ChatMainContainer';
import { ChatAdditionalContainer } from './ChatAdditionalContainer';

export function DisplayChatTab() {
	return (
		<GlobalRowContainer>
			<ChatMainContainer />
			<ChatAdditionalContainer />
		</GlobalRowContainer>
	);
}