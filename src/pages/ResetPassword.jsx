import { signupFields } from "../constants/inputFields";
import Input from "@codegouvfr/react-dsfr/Input";
import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup";
import { useState } from "react";
import { initButtonsReset } from "../constants/buttonsConnexion";

export function ResetPassword(props) {

	const   { state, dispatch } = props;
	const	[isDisable, setIsDisable] = useState(true);

	const	handleChange = (e) => {
		e.preventDefault();

		if (e.target.name === "username")
			state.username = e.target.value;
		else if (e.target.name === "email")
			state.email = e.target.value;

		setIsDisable(!(state.username && state.email))
	}

	return (
		<div className="login-container">
			{signupFields.map((input, key) => {
				return input.nativeInputProps.type !== "password" ? 
					<Input className="w-[500px]"
						key={key}
						hintText={input.hintText}
						nativeInputProps={{...input.nativeInputProps, onChange: handleChange}}
					/>
					: null
			})}
			<ButtonsGroup style={{width: 500}}
				buttons={initButtonsReset(isDisable)}
			/>
		</div>
	)
}