import { GlobalDiv } from '../components/Global/GlobalDiv';
import { GlobalRowContainer } from '../components/Global/GlobalRowContainer';
import { ContactForm } from '../components/Contact/ContactForm';

export function Contact() {
	return (<GlobalRowContainer extraClass='fr-grid-row--center'>
		<GlobalDiv>
			<ContactForm/>
		</GlobalDiv>
	</GlobalRowContainer>);
}