export const initButtonsLogin = (handleClick, isDisable) => {

	const buttonsLogin = [
		{
			children: 'Connexion',
			onClick: handleClick,
			disabled: isDisable,
			priority: 'primary'
		},
		{
			children: 'Créer un compte',
			onClick: () => (window.location.href = '/signup'),
			priority: 'tertiary'
		},
		{
			children: 'Mot de passe oublié',
			onClick: () => (window.location.href = '/reset-password'),
			priority: 'tertiary'
		}
	]

	return buttonsLogin;
}

export const initButtonsSignup = (handleValidatePassword) => {

	const buttonsSignup = [
		{
			disabled: !handleValidatePassword(),
			children: 'Créer un compte',
			onClick: () => (window.location.href = '/')
		},
		{
			children: 'Retour',
			onClick: () => (window.location.href = '/login'),
			priority: 'tertiary'
		}

	]

	return buttonsSignup;
}

export const initButtonsReset = (isDisable) => {

	const buttonsReset = [
		{
			disabled: isDisable,
			children: 'Soumettre',
			onClick: () => (window.location.href = '/') 
		},
		{
			children: 'Retour',
			onClick: () => (window.location.href = '/login'),
			priority: 'tertiary'
		}

	]

	return buttonsReset;
}