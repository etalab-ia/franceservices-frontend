import Input from "@codegouvfr/react-dsfr/Input";
import { ButtonsGroup } from "@codegouvfr/react-dsfr/ButtonsGroup";
import { useState } from "react";
import { signupFields } from "../constants/inputFields";
import { initButtonsSignup } from "../constants/buttonsConnexion";
import { useFetch } from "../utils/hooks";
import { signupUrl } from "../constants/api";

export function Signup(props) {

	const	{ state, dispatch } = props;
	const	[confPassword, setConfPassword] = useState('');

	const	handleChange = (e) => {
		e.preventDefault();

		if (e.target.name === "username")
			dispatch({ type: 'SET_USERNAME', nextUsername: e.target.value });
		else if (e.target.name === "password")
			dispatch({ type: 'SET_PASSWORD', nextPassword: e.target.value });
		else if (e.target.name === "confirmationPassword")
			setConfPassword(e.target.value);
		else if (e.target.name === "email")
			dispatch({ type: 'SET_EMAIL', nextEmail: e.target.value });
	}

	const	handleValidatePassword = () => {
		return state.username && state.email && state.password && confPassword === state.password;	
	}

	const	handleClick = async() => {

		const data = {
			username: state.username,
			email: state.email,
			password: state.password
		}

		await useFetch(signupUrl, 'POST', {data: JSON.stringify(data), headers: { 'Content-Type': 'application/json' }});
	}
	
	return (
		<div className="login-container">
			{signupFields.map((input, key) => {
				return <Input className="w-[500px]"
					key={key}
					hintText={input.hintText}
					nativeInputProps={{...input.nativeInputProps, onChange: handleChange}}
				/>
			})}
			<ButtonsGroup className="container" style={{width: 500}}
				buttons={initButtonsSignup(handleValidatePassword, handleClick)}
			/>
		</div>
	)
}