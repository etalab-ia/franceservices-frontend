import Input from "@codegouvfr/react-dsfr/Input";
import { ButtonsGroup } from "@codegouvfr/react-dsfr/ButtonsGroup";
import { useState } from "react";
import { signupFields } from "../constants/inputFields";
import { initButtonsSignup } from "../constants/buttonsConnexion";

export function Signup(props) {

	const	{ state, dispatch } = props;
	const	[confPassword, setConfPassword] = useState('');

	const	handleChange = (e) => {
		e.preventDefault();

		if (e.target.name === "username")
			state.username = e.target.value;
		else if (e.target.name === "password")
			state.password = e.target.value;
		else if (e.target.name === "confirmationPassword")
			setConfPassword(e.target.value);
		else if (e.target.name === "email")
			state.email = e.target.value;
	}

	const	handleValidatePassword = () => {
		return state.username && state.email && state.password && confPassword === state.password;	
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
				buttons={initButtonsSignup(handleValidatePassword)}
			/>
		</div>
	)
}