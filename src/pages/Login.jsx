import Input from "@codegouvfr/react-dsfr/Input";
import { ButtonsGroup } from "@codegouvfr/react-dsfr/ButtonsGroup";
import { initButtonsLogin } from "../constants/buttonsConnexion";
import { loginFields } from "../constants/inputFields";
import { useState } from "react";
import { signinUrl } from "../constants/api";
import { useFetch } from "../utils/hooks";
import { Navigate } from "react-router-dom";

export function	Login(props) {

	const	{ state, dispatch } = props;
	const	[isDisable, setIsDisable] = useState(true);
	const	[id, setId] = useState('');

	const	checkId = () => {
		if (id.includes("@"))
			dispatch({ type: 'SET_USER', nextUsername: '', nextEmail: id })
		else 
			dispatch({ type: 'SET_USER', nextUsername: id, nextEmail: '' })
	}

	const	checkIfCompletedFields = () => {
		if (state.password.length && (state.username.length || state.email.length))
			setIsDisable(false);
		else
			setIsDisable(true);
	}

	const	handleChange = (e) => {
		e.preventDefault();

		if (e.target.name === "username")
			setId(e.target.value);
		else
			dispatch({ type: 'SET_PASSWORD', nextPassword: e.target.value })

		checkIfCompletedFields();
		checkId();
	}

	const handleClick = async() => {
		const data = {
			username: state.username,
			email: state.email,
			password: state.password
		}

		await useFetch(signinUrl, 'POST', {
			data: JSON.stringify(data), 
			headers: { 'Content-Type': 'application/json' }
		})
		.then(res => dispatch({ type: 'LOGIN', nextUserToken: res.token }));
	}

	return (
		<div className="login-container">
			{loginFields.map((field, key) => {
				return <Input className="w-[500px]"
					key={key}
					hintText={field.hintText}
					nativeInputProps={{...field.nativeInputProps, onChange: handleChange}}
				/>
			})}
			<ButtonsGroup className="container"
				style={{width: 500}}
				buttons={initButtonsLogin(handleClick, isDisable)}
			/>
		</div>
	)
}