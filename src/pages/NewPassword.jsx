import { ButtonsGroup } from "@codegouvfr/react-dsfr/ButtonsGroup";
import { useState } from "react";
import { signupFields } from "../constants/inputFields";
import { initButtonsSignup } from "../constants/connexion";
import { useFetch } from "../utils/hooks";
import { resetPasswordUrl } from "../constants/api";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changePasswordFailed } from "../constants/errorMessages";
import { LoginContainer } from "../components/Auth/LoginContainer";
import { LoginFields } from "../components/Auth/LoginFields";
import { ButtonInformation } from "../components/Global/ButtonInformation";

export function NewPassword() {
	const	auth = useSelector((state) => state.auth);
	const	dispatch = useDispatch();
	const	[password, setPassword] = useState('');
	const	[confPassword, setConfPassword] = useState('');
	const	urlParams = new URL(window.location.href);
  	const	token = urlParams.searchParams.get('token');

	const	handleChange = (e) => {
		e.preventDefault();

		if (e.target.name === "password")
			setPassword(e.target.value);
		else if (e.target.name === "confirmationPassword")
			setConfPassword(e.target.value);
	}

	const	handleValidatePassword = () => {
		return password.length && confPassword === password;	
	}

	const	handleClick = async() => {
		const	data = {
			token: token,
			password: password
		}

		const	res = await useFetch(resetPasswordUrl, 'POST', {
			data: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' }
		}, dispatch);

		if (res.status && res.status !== 200)
			return dispatch({ type: 'AUTH_FAILED' });

		return window.location.href = '/albert/login';
	}
	const	fields = signupFields.slice(2, signupFields.length);
	
	return (
		<LoginContainer>
			<LoginFields
				fields={fields}
				handleChange={handleChange}
			/>
			{auth.authFailed && <ButtonInformation>{changePasswordFailed}</ButtonInformation>}
			<ButtonsGroup 
				buttons={initButtonsSignup(handleValidatePassword, handleClick, 'Changer de mot de passe')}
			/>
		</LoginContainer>
	)
}