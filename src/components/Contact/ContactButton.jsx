import Button from '@codegouvfr/react-dsfr/Button';
import { useState } from 'react';
import { ButtonInformation } from '../Global/ButtonInformation';

export function ContactButton({ isDisable }) {
	const   [isSend, setIsSend] = useState(false);

	const	handleClick = () => {
		setIsSend(true);

		// TODO: POST message
	}

	return (
		<>
			{isSend && <ButtonInformation>Votre message a bien été envoyé, merci pour votre retour !</ButtonInformation>}
			<Button onClick={handleClick} disabled={isDisable}>Envoyer</Button>
		</>
	)
}