import Input from "@codegouvfr/react-dsfr/Input";
import { ButtonsGroup } from "@codegouvfr/react-dsfr/ButtonsGroup";
import { useState } from "react";
import { signupFields } from "../constants/inputFields";
import { initButtonsSignup } from "../constants/connexion";
import { useFetch } from "../utils/hooks";
import { signupUrl } from "../constants/api";
import { AuthFailed } from "../components/Auth/AuthFailed";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { invalidEmail } from "../constants/errorMessages";

export function Signup() {

	const	auth = useSelector((state) => state.auth);
	const	dispatch = useDispatch();
	const	[password, setPassword] = useState('');
	const	[confPassword, setConfPassword] = useState('');

	const	handleChange = (e) => {
		e.preventDefault();

		if (e.target.name === "username")
			dispatch({ type: 'SET_USERNAME', nextUsername: e.target.value });
		else if (e.target.name === "password")
			setPassword(e.target.value);
		else if (e.target.name === "confirmationPassword")
			setConfPassword(e.target.value);
		else if (e.target.name === "email")
			dispatch({ type: 'SET_EMAIL', nextEmail: e.target.value });
	}

	const	handleValidatePassword = () => {
		return auth.username.length && auth.email.length && auth.email.includes("@") && password.length && confPassword === password;	
	}

	const	handleClick = async() => {
		const	data = {
			username: auth.username,
			email: auth.email,
			password: password
		}

		const	res = await useFetch(signupUrl, 'POST', {
			data: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' }
		});

		if (res.status && res.status !== 200)
			return dispatch({ type: 'AUTH_FAILED' });
		
		return window.location.href = '/albert/login';
	}
	
	return (
		<div className="login-container">
			{auth.authFailed && <AuthFailed>{invalidEmail}</AuthFailed>}
			{signupFields.map((input, key) => {
				return <Input className="w-[500px]"
					key={key}
					hintText={input.hintText}
					nativeInputProps={{...input.nativeInputProps, onChange: handleChange}}
				/>
			})}
			<ButtonsGroup className="container w-[500px]"
				buttons={initButtonsSignup(handleValidatePassword, handleClick, 'Créer un compte')}
			/>
		</div>
	)
}