export const signupFields = [
	{
		hintText: "Nom d'utilisateur",
		nativeInputProps: {
			placeholder: "Camille",
			name: "username"
		}
	},
	{
		hintText: "Courriel",
		nativeInputProps: {
			placeholder: "camille@mail.com",
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
			placeholder: "Camille ou camille@mail.com",
			name: "username"
		}
	},
	{
		hintText: "Mot de passe",
		nativeInputProps: {
			name: "password",
			type: "password",
		}
	}
]