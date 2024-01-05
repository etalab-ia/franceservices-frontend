import Input from "@codegouvfr/react-dsfr/Input"
import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup"
import { useEffect, useState } from "react"
import { initButtonsReset } from "../constants/connexion"
import { resetPasswordMailUrl } from "../constants/api"
import { useFetch } from "../utils/hooks"
import { LoginContainer } from "../components/Auth/LoginContainer"

export function ResetPassword({ setAuthFailed, userAuth, setUserAuth }) {
	const [isDisable, setIsDisable] = useState(true)

	const handleChange = (e) => {
		e.preventDefault()

		setUserAuth({ email: e.target.value })
	}

	useEffect(() => {
		setIsDisable(!(userAuth.email.length && userAuth.email.includes("@")))
	}, [userAuth.email])

	const handleClick = async () => {
		const res = await useFetch(
			resetPasswordMailUrl,
			"POST",
			{
				data: JSON.stringify({ email: userAuth.email }),
				headers: { "Content-Type": "application/json" },
			},
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
