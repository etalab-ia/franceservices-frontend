import Input from "@codegouvfr/react-dsfr/Input";
import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup";
import { useState } from "react";
import { initButtonsReset } from "../constants/buttonsConnexion";
import { resetPasswordUrl } from "../constants/api";
import { useFetch } from "../utils/hooks";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export function ResetPassword() {

	const	auth = useSelector((state) => state.auth);
	const	dispatch = useDispatch();
	const	[isDisable, setIsDisable] = useState(true);

	const	handleChange = (e) => {
		e.preventDefault();

		dispatch({ type: 'SET_EMAIL', nextEmail: e.target.value })
		setIsDisable(!(auth.email && auth.email.includes("@")))
	}

	const	handleClick = async() => {
		await useFetch(resetPasswordUrl, 'POST', {
			data: JSON.stringify({email: auth.email}), 
			headers: { 'Content-Type': 'application/json' }
		});
	}

	return (
		<div className="login-container">
			<Input
				className="w-[500px]"
				hintText="Email"
				nativeInputProps={{
					placeholder: "benoitdupont@mail.com",
					onChange: handleChange,
				}}
			/>
			<ButtonsGroup style={{width: 500}}
				buttons={initButtonsReset(isDisable, handleClick)}
			/>
		</div>
	)
}