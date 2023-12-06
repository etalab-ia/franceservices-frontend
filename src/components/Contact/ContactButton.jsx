import Button from '@codegouvfr/react-dsfr/Button';
import { useState } from 'react';
import { ButtonInformation } from '../Global/ButtonInformation';
import { contactUrl } from '../../constants/api';
import { useDispatch, useSelector } from 'react-redux';
import { setContactData, setHeaders } from '../../utils/setData';
import { setUserInfos } from '../../utils/manageConnexion';
import { useFetch } from '../../utils/hooks';

export function ContactButton({ isDisable, administration, message, name, title }) {
	const   [isSend, setIsSend] = useState(false);
	const	auth = useSelector((state) => state.auth);
	const	dispatch = useDispatch();

	const	handleClick = async() => {
		if (!auth.email.length || !auth.username)
			setUserInfos(auth.userToken, dispatch);
		
		await useFetch(contactUrl, 'POST', {
			data: setContactData(title + ' from: ' + name + ' | ' + auth.email, message, administration), 
			headers: setHeaders(auth.userToken, false)
		}, dispatch);

		setIsSend(true);
	}

	return (
		<>
			{isSend && <ButtonInformation>Votre message a bien été envoyé, merci pour votre retour !</ButtonInformation>}
			<Button onClick={handleClick} disabled={isDisable}>Envoyer</Button>
		</>
	)
}