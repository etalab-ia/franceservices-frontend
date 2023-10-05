export const signupFields = [
	{
		hintText: "Nom d'utilisateur",
		nativeInputProps: {
			placeholder: "BenoîtDupont",
			name: "username"
		}
	},
	{
		hintText: "Courriel",
		nativeInputProps: {
			placeholder: "exemple@email.fr",
			name: "email"
		}
	},
	{
		hintText: "Mot de passe",
		nativeInputProps: {
			name: "password",
			type: "password"
		}
	},
	{
		hintText: "Confirmer le mot de passe",
		nativeInputProps: {
			name: "confirmationPassword",
			type: "password"
		}
	},
]

export const loginFields = [
	{
		hintText: "Nom d'utilisateur",
		nativeInputProps: {
			placeholder: "BenoîtDupont ou benoitdupont@mail.com",
			name: "username"
		}
	},
	{
		hintText: "Mot de passe",
		nativeInputProps: {
			name: "password",
			type: "password"
		}
	}
]