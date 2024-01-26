import thumbsUp from "../../icons/feedbacks/thumbsUp.svg"
import thumbsDown from "../../icons/feedbacks/thumbsDown.svg"
import { GlobalRowContainer } from "../components/Global/GlobalRowContainer"

export const meetingTitle = `Préparer un rendez-vous`
export const meetingSubtitle = `Description de la situation de l’usager`
export const meetingParagraph = (
	<>
		<p className="fr-text-mention--grey fr-mb-2w">
			Quelques bonnes pratiques pour décrire la situation d’un usager
		</p>
		<div className=" fr-mb-1w flex">
			<span
				className="fr-icon-success-fill fr-text-default--info fr-mr-2v"
				aria-hidden="true"
			></span>
			<p className="fr-text-default--info ">
				Utiliser des termes précis (eg. parler de « formulaire cerfa » au lieu de « demande papier
				»)
			</p>
		</div>
		<div className=" fr-mb-1w flex">
			<span
				className="fr-icon-success-fill fr-text-default--info fr-mr-2v"
				aria-hidden="true"
			></span>
			<p className="fr-text-default--info ">
				Formuler une question à la fin de la description pour orienter la recherche d’Albert.
			</p>
		</div>
		<div className=" fr-mb-1w flex">
			<span className="fr-icon-error-fill fr-text-default--info fr-mr-2v" aria-hidden="true"></span>
			<p className="fr-text-default--info ">
				Éviter d’indiquer des informations personnelles, notamment celles trouvées sur un compte
				administratif de l’usager.
			</p>
		</div>
		<div className=" fr-mb-1w flex">
			<span className="fr-icon-error-fill fr-text-default--info fr-mr-2v" aria-hidden="true"></span>
			<p className="fr-text-default--info ">
				Éviter d’utiliser seulement des mots clés pour décrire la situation de l’usager.
			</p>
		</div>
	</>
)

export const meetingExamplesTitle = `Voir des exemples`
export const meetingPromptExamples = [
	{
		img: thumbsUp,
		alt: "Pouce en l'air",
		title: "Exemple de bonne description",
		description: (
			<>
				L'usagère ne comprend pas son allocation RSA ait diminué.
				<br className="fr-my-1w" />
				Après étude de son compte, il semble que la CAF opère une retenue sur son allocation.
				<br className="fr-mb-1w" />
				La CAF peut-elle faire une saisie sur le RSA et sous quelles conditions ?
			</>
		),
	},
	{
		img: thumbsDown,
		alt: "Pouce vers le bas",
		title: "Exemple de mauvaise description",
		description: (
			<>
				[Monsieur Durant] ne comprend pas que son allocation RSA ait diminué.
				<br className="fr-my-1w" />
				Après avoir saisi ses [identifiants n°XXX mot de passe XXX], il semble que la CAF opère une
				retenue sur son allocation.
				<br className="fr-mb-1w" />
				[Pas de question de fin]
			</>
		),
	},
]

export const meetingInformations = `Informations contextuelles`
export const meetingGenerationPage = `Générer la fiche rendez-vous`
export const meetingAppointmentInformations = `Informations sur le rendez-vous`
export const meetingAppointmentTitle = "Fiche rendez-vous"

export const setTilesFromContacts = (webservices, setTiles) => {
	setTiles([])

	if (!webservices || !webservices.length) return

	webservices.map((webservice) => {
		const url = webservice.url
		const parsedUrl = new URL(url)
		let domain = parsedUrl.hostname

		domain = domain.replace(/^www\./, "")
		domain = domain.replace(/^entreprendre\./, "")

		const newTile = {
			linkProps: { to: webservice.url },
			title: (
				<>
					<p className="fr-badge fr-badge--sm fr-badge--purple-glycine fr-mb-1v">
						{webservice.type}
					</p>
					<p>{webservice.institution}</p>
				</>
			),
			desc: domain,
		}
		setTiles((prevTiles) => [...prevTiles, newTile])
	})
}

export const meetingDefaultQuestionsIntroduction = (
	<GlobalRowContainer>
		<h6 className="text-xl font-bold text-[##3A3A3A]">Tester Albert</h6>
		<p className="text-[##3A3A3A] fr-mt-3v fr-mb-1v">
			Ceci est votre première utilisation d’Albert et vous souhaitez comprendre simplement son
			fonctionnement ? Nous vous avons préparé deux scénarios de tests pour cela. Il suffit de
			cliquer sur l’une des options ci-dessous.
		</p>
	</GlobalRowContainer>
)

export const defaultInputFields = [
	{
		title: "Comprendre une saisie RSA par la CAF",
		question:
			"Une usagère ne comprend par le montant d’allocations sociales qu’elle touche ce mois-ci. En effet, le montant a été divisé par deux par rapport aux mois précédents et elle n’a plus que 150€. Elle cherche à comprendre pourquoi le montant a ainsi diminué.\n\nAprès avoir consulté le compte CAF de l’usagère avec son accord, il semble que la CAF opère une retenue sur le montant du RSA allouée à l’usagère suite à une déclaration erronée par le passé.\n\nLa CAF peut-elle faire une saisie sur le RSA et sous quelles conditions ? Comment débloquer la situation ?",
		themes: ["Allocation sociale", "RSA"],
		administrations: ["CAF"],
	},
	// {
	// 	title: "Renouveler une carte de mobilité inclusion sans compte en ligne",
	// 	question:
	// 		"L’usager a perdu sa Carte de Mobilité Inclusion (CMI) stationnement. Il aimerait en refaire une.\n\nLa démarche se fait en ligne sur https://www.carte-mobilite-inclusion.fr.\n\nL’usager n'a jamais eu de compte sur le site et ne peut donc pas s'y connecter ou récupérer des informations.\n\nComment renouveler une CMI suite à une perte sans compte sur le site carte-mobilite-inclusion.fr ?",
	// 	themes: ["Handicap", "Santé", "Allocation"],
	// 	administrations: ["MDPH"],
	// },
]

export const resultMeetingTitle = `Résultat`
export const meetingQRTitle = `Questions fréquentes`
