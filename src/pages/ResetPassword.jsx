import Input from "@codegouvfr/react-dsfr/Input";
import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup";
import { useState } from "react";
import { initButtonsReset } from "../constants/buttonsConnexion";
import { resetPasswordUrl } from "../constants/api";
import { useFetch } from "../utils/hooks";

export function ResetPassword(props) {

	const   { state, dispatch } = props;
	const	[isDisable, setIsDisable] = useState(true);

	const	handleChange = (e) => {
		e.preventDefault();

		dispatch({ type: 'SET_EMAIL', nextEmail: e.target.value })
		setIsDisable(!(state.email && state.email.includes("@")))
	}

	const	handleClick = async() => {
		await useFetch(resetPasswordUrl, 'POST', {
			data: JSON.stringify({email: state.email}), 
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