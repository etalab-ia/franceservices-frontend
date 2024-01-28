import { ButtonProps } from "@codegouvfr/react-dsfr/Button"

export const initButtonsLogin = (handleClick: any, isDisable: boolean) => {
	const buttonsLogin: [ButtonProps, ...ButtonProps[]] = [
		{
			children: "Button 1",
			onClick: handleClick,
			disabled: isDisable,
			priority: "primary",
		},
		{
			children: "Button 2",
			onClick: handleClick,
			priority: "secondary",
		},
	]

	return buttonsLogin
}

export const initButtonsSignup = (
	handleValidatePassword: (any?) => any,
	handleClick: () => void,
	children: React.ReactNode
) => {
	const buttonsSignup: [ButtonProps, ...ButtonProps[]] = [
		{
			disabled: !handleValidatePassword(),
			children: children,
			onClick: handleClick,
		},
		{
			children: "Retour",
			onClick: () => (window.location.href = "/albert/login"),
			priority: "tertiary",
		},
	]

	return buttonsSignup
}

export const initButtonsReset = (isDisable: boolean, handleClick: () => void) => {
	const buttonsReset: [ButtonProps, ...ButtonProps[]] = [
		{
			disabled: isDisable,
			children: "Soumettre",
			onClick: handleClick,
		},
		{
			children: "Retour",
			onClick: () => (window.location.href = "/albert/login"),
			priority: "tertiary",
		},
	]

	return buttonsReset
}

export const authFailedNotificationRole = `Notification d'échec d'authentification.`
