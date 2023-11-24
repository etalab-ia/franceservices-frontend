import meeting from "@artwork/pictograms/buildings/city-hall.svg"
import question from "@artwork/pictograms/leisure/community.svg"
import history from "@artwork/pictograms/document/document.svg"

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

export const	toolsTiles = [
	{
		className: "fr-tile fr-tile--no-icon fr-enlarge-link",
		desc: "Accéder",
		linkProps: { to: "/meeting" },
		imageUrl: meeting,
		title: "Préparer un rendez-vous",
	},
	{
		className: "fr-tile fr-tile--no-icon fr-enlarge-link",
		desc: "Accéder",
		linkProps: { to: "/chat" },
		imageUrl: question,
		title: "Poser une question",
	}
]

export const	ressourcesTiles = [
	{
		className: "fr-tile fr-tile--no-icon fr-enlarge-link",
		desc: "Accéder",
		linkProps: { to: '/history' },
		imageUrl: history,
		title: "Historique",
	},
]