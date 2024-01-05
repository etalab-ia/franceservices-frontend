import Input from "@codegouvfr/react-dsfr/Input"
import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup"
import { useState } from "react"
import { initButtonsReset } from "../constants/connexion"
import { resetPasswordMailUrl } from "../constants/api"
import { useFetch } from "../utils/hooks"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { LoginContainer } from "../components/Auth/LoginContainer"

// TODO: use setUserAuth
export function ResetPassword({ setAuthFailed }) {
	const dispatch = useDispatch()
	const [isDisable, setIsDisable] = useState(true)

	const handleChange = (e) => {
		e.preventDefault()

		dispatch({ type: "SET_EMAIL", nextEmail: e.target.value })
		setIsDisable(!(auth.email.length && auth.email.includes("@")))
	}

	const handleClick = async () => {
		const res = await useFetch(
			resetPasswordMailUrl,
			"POST",
			{
				data: JSON.stringify({ email: auth.email }),
				headers: { "Content-Type": "application/json" },
			},
			dispatch
		)

		if (res.status && res.status !== 200) setAuthFailed(true)

		return (window.location.href = "/albert/login")
	}

	return (
		<LoginContainer>
			<Input
				hintText="Email"
				nativeInputProps={{
					placeholder: "camille@mail.com",
					onChange: handleChange,
				}}
			/>
			<ButtonsGroup buttons={initButtonsReset(isDisable, handleClick)} />
		</LoginContainer>
	)
}
