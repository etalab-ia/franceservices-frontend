import Input from "@codegouvfr/react-dsfr/Input";
import { ButtonsGroup } from "@codegouvfr/react-dsfr/ButtonsGroup";
import { initButtonsLogin } from "../constants/buttonsConnexion";
import { loginFields } from "../constants/inputFields";
import { useEffect, useState } from "react";
import { signinUrl } from "../constants/api";
import { useFetch } from "../utils/hooks";
import { AuthFailed } from "../components/Auth/AuthFailed";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { usenameOrPasswordError } from "../constants/errorMessages";

export function	Login() {

	const	auth = useSelector((state) => state.auth);
	const	dispatch = useDispatch();
	const	[isDisable, setIsDisable] = useState(true);
	const	[password, setPassword] = useState('');
	const	[id, setId] = useState('');

	useEffect(() => {
		checkId();
		checkIfCompletedFields();
	}, [password])

	const	checkId = () => {
		if (id.includes("@"))
			dispatch({ type: 'SET_USER', nextUsername: null, nextEmail: id })
		else 
			dispatch({ type: 'SET_USER', nextUsername: id, nextEmail: null})
	}

	const	checkIfCompletedFields = () => {
		if (password.length && ((auth.username && auth.username.length) || (auth.email && auth.email.length)))
			setIsDisable(false);
		else
			setIsDisable(true);
	}

	const	handleChange = (e) => {
		e.preventDefault();

		if (e.target.name === "username")
			setId(e.target.value);
		if (e.target.name === "password")
			setPassword(e.target.value);

		checkId();
		checkIfCompletedFields();
	}

	const	storeAuth = (token, username) => {
		localStorage.setItem('authToken', token);
		localStorage.setItem('username', username);
	}

	const handleClick = async () => {
		const data = {
		  username: auth.username,
		  email: auth.email,
		  password: password
		};
		
		dispatch({ type: 'RESET_AUTH_FAILED' });
	  
		try 
		{
			const	res = await useFetch(signinUrl, 'POST', {
				data: JSON.stringify(data),
				headers: { 'Content-Type': 'application/json' }
			});

			if (res.status && res.status !== 200)
				return dispatch({ type: 'AUTH_FAILED' });

			dispatch({ type: 'LOGIN', nextUserToken: res.token });
			storeAuth(res.token, auth.username);
		} 
		catch(error)
		{
			console.error('An error occurred: ', error);

			return error;
		}
	};

	return (
		<div className="login-container">
			{auth.authFailed && <AuthFailed>{usenameOrPasswordError}</AuthFailed>}
			{loginFields.map((field, key) => {
				return <Input className="w-[500px]"
					iconId={field.iconId}
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