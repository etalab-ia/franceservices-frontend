import Input from "@codegouvfr/react-dsfr/Input";
import { ButtonsGroup } from "@codegouvfr/react-dsfr/ButtonsGroup";
import { useState } from "react";
import { signupFields } from "../constants/inputFields";
import { initButtonsSignup } from "../constants/connexion";
import { useFetch } from "../utils/hooks";
import { resetPasswordUrl } from "../constants/api";
import { AuthFailed } from "../components/Auth/AuthFailed";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changePasswordFailed } from "../constants/errorMessages";

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
		});

		if (res.status && res.status !== 200)
			return dispatch({ type: 'AUTH_FAILED' });

		return window.location.href = '/albert/login';
	}
	
	return (
		<div className="login-container">
			{signupFields.map((input, key) => {
				if (key < 2)
					return null;
				return <Input className="basic-width"
					key={key}
					hintText={input.hintText}
					nativeInputProps={{...input.nativeInputProps, onChange: handleChange}}
				/>
			})}
			{auth.authFailed && <AuthFailed>{changePasswordFailed}</AuthFailed>}
			<ButtonsGroup className="basic-width"
				buttons={initButtonsSignup(handleValidatePassword, handleClick, 'Changer de mot de passe')}
			/>
		</div>
	)
}