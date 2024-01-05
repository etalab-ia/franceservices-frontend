import { ButtonsGroup } from "@codegouvfr/react-dsfr/ButtonsGroup"
import { useState } from "react"
import { signupFields } from "../constants/inputFields"
import { initButtonsSignup } from "../constants/connexion"
import { useFetch } from "../utils/hooks"
import { userUrl } from "../constants/api"
import { useDispatch } from "react-redux"
import { invalidEmail, invalidPassword } from "../constants/errorMessages"
import { LoginContainer } from "../components/Auth/LoginContainer"
import { LoginFields } from "../components/Auth/LoginFields"
import { ButtonInformation } from "../components/Global/ButtonInformation"

// TODO: use setUserInfos
export function Signup({ authFailed, setAuthFailed }) {
	const dispatch = useDispatch()
	const [password, setPassword] = useState("")
	const [confPassword, setConfPassword] = useState("")
	const [errorMesage, setErrorMessage] = useState("")

	const handleChange = (e) => {
		e.preventDefault()

		if (e.target.name === "username")
			dispatch({ type: "SET_USERNAME", nextUsername: e.target.value })
		else if (e.target.name === "password") setPassword(e.target.value)
		else if (e.target.name === "confirmationPassword") setConfPassword(e.target.value)
		else if (e.target.name === "email") dispatch({ type: "SET_EMAIL", nextEmail: e.target.value })
	}

	const handleValidatePassword = (auth) => {
		return (
			auth.username &&
			auth.username.length &&
			auth.email.length &&
			auth.email.includes("@") &&
			password.length &&
			confPassword === password
		)
	}

	const handleClick = async () => {
		const data = {
			username: auth.username,
			email: auth.email,
			password: password,
		}

		const res = await useFetch(
			userUrl,
			"POST",
			{
				data: JSON.stringify(data),
				headers: { "Content-Type": "application/json" },
			},
			dispatch
		)

		if (res.status && res.status !== 200) {
			const jsonData = await res.json()

			jsonData.detail.map((data) => {
				data.type === "value_error"
					? setErrorMessage(invalidEmail)
					: setErrorMessage(invalidPassword)
			})
			return setAuthFailed(true)
		}

		return (window.location.href = "/albert/login")
	}

	return (
		<LoginContainer>
			<LoginFields fields={signupFields} handleChange={handleChange} />
			{authFailed && <ButtonInformation>{errorMesage}</ButtonInformation>}
			<ButtonsGroup
				buttons={initButtonsSignup(handleValidatePassword, handleClick, "Créer un compte")}
			/>
		</LoginContainer>
	)
}
