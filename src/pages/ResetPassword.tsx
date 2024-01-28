import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup"
import { initButtonsReset } from "../constants/connexion"
import { LoginContainer } from "../components/Auth/LoginContainer"
import { useApiUrls } from "../constants/api"
import { useFetch } from "../utils/hooks"
import Input from "@codegouvfr/react-dsfr/Input"

export function ResetPassword({ setAuthFailed, userAuth, setUserAuth }) {
	const handleChange = (e) => {
		e.preventDefault()

		setUserAuth({ email: e.target.value })
	}

	const isValidEmail = userAuth.email.length && userAuth.email.includes("@")
	const { resetPasswordMailUrl } = useApiUrls()
	const handleClick = async () => {
		const res = await useFetch(resetPasswordMailUrl, "POST", {
			data: JSON.stringify({ email: userAuth.email }),
			headers: { "Content-Type": "application/json" },
		})

		if (res.status && res.status !== 200) setAuthFailed(true)

		return (window.location.href = "/albert/login")
	}

	return (
		<LoginContainer>
// @ts-expect-error TS(2304) FIXME: Cannot find name 'hintText'.
// @ts-expect-error TS(2304): Cannot find name 'hintText'.
// @ts-expect-error TS(2322): Type '{ hintText: string; nativeInputProps: { plac... Remove this comment to see the full error message
// @ts-expect-error TS(2304): Cannot find name 'hintText'.
// @ts-expect-error TS(2322) FIXME: Type '{ hintText: string; nativeInputProps: { plac... Remove this comment to see the full error message
// @ts-expect-error TS(2322): Type '{ hintText: string; nativeInputProps: { plac... Remove this comment to see the full error message
			<Input
				hintText="Email"
				nativeInputProps={{
					placeholder: "camille@mail.com",
					onChange: handleChange,
				}}
			/>
// @ts-expect-error TS(2304) FIXME: Cannot find name 'disabled'.
// @ts-expect-error TS(2304): Cannot find name 'disabled'.
// @ts-expect-error TS(2322): Type '({ disabled: any; children: string; onClick:... Remove this comment to see the full error message
// @ts-expect-error TS(2304): Cannot find name 'disabled'.
// @ts-expect-error TS(2322) FIXME: Type '({ disabled: any; children: string; onClick:... Remove this comment to see the full error message
// @ts-expect-error TS(2322): Type '({ disabled: any; children: string; onClick:... Remove this comment to see the full error message
			<ButtonsGroup buttons={initButtonsReset(!isValidEmail, handleClick)} />
		</LoginContainer>
	)
}
