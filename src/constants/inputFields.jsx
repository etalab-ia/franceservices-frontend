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
		linkProps: { to: 'https://aplus.beta.gouv.fr/' },
		imageUrl: meeting,
		title: <>
			<p className="fr-badge fr-badge--sm fr-badge--purple-glycine fr-mb-1v">
				Réseau
			</p>
			<p>Administration+</p>
		</>,
	},
	{
		className: "fr-tile fr-tile--no-icon fr-enlarge-link",
		desc: "Accéder",
		linkProps: { to: 'https://osmose.numerique.gouv.fr/' },
		imageUrl: meeting,
		title: <>
			<p className="fr-badge fr-badge--sm fr-badge--purple-glycine fr-mb-1v">
				Réseau
			</p>
			<p>Osmose</p>
		</>,
	},
	{
		className: "fr-tile fr-tile--no-icon fr-enlarge-link",
		desc: "Accéder",
		linkProps: { to: 'https://extranet.france-services.gouv.fr/' },
		imageUrl: meeting,
		title: <>
			<p className="fr-badge fr-badge--sm fr-badge--purple-glycine fr-mb-1v">
				Documentation
			</p>
			<p>Plateforme France Services</p>
		</>,
	},
	{
		className: "fr-tile fr-tile--no-icon fr-enlarge-link",
		desc: "Accéder",
		linkProps: { to: 'https://www.service-public.fr/' },
		imageUrl: meeting,
		title: <>
			<p className="fr-badge fr-badge--sm fr-badge--purple-glycine fr-mb-1v">
				Documentation
			</p>
			<p>Service-Public.fr</p>
		</>,
	},
]