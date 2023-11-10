export const signupFields = [
	{
		label: "Nom d'utilisateur",
		nativeInputProps: {
			placeholder: "Camille",
			name: "username"
		}
	},
	{
		label: "Courriel",
		nativeInputProps: {
			placeholder: "camille@mail.com",
			name: "email"
		}
	},
	{
		label: "Mot de passe",
		hintText: "Le mot de passe doit contenir entre 8 et 20 caractères.",
		nativeInputProps: {
			name: "password",
			type: "password"
		}
	},
	{
		label: "Confirmer le mot de passe",
		nativeInputProps: {
			name: "confirmationPassword",
			type: "password"
		}
	},
]

export const loginFields = [
	{
		label: "Nom d'utilisateur",
		nativeInputProps: {
			placeholder: "Camille ou camille@mail.com",
			name: "username"
		}
	},
	{
		label: "Mot de passe",
		nativeInputProps: {
			name: "password",
			type: "password",
		}
	}
]