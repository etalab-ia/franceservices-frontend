import thumbsUp from "../../icons/feedbacks/thumbsUp.svg";
import thumbsDown from "../../icons/feedbacks/thumbsDown.svg";
import { GlobalRowContainer } from "../components/Global/GlobalRowContainer";

export const	meetingTitle = `Préparer un rendez-vous`;
export const	meetingSubtitle = `Description de la situation de l’usager`;
export const	meetingParagraph = (<p className="fr-mt-1w fr-mb-1w text-justify">
		Précisez la situation de l'usager <strong>en ne précisant aucune donnée à caractère personnelle</strong> (nom, prénom de l'usager, numéro de sécurité sociale, identifiants de compte...).<br className="fr-mb-1w"/>
		Veillez à terminer votre description par une <strong>question</strong>.
	</p>);

export const	meetingPromptExamples = [
	{
		img: thumbsUp,
		alt: "Pouce en l'air",
		title: "Exemple de bonne description",
		description: (
			<>
			  L'usagère ne comprend pas son allocation RSA ait diminué.<br className="fr-my-1w"/>
			  Après étude de son compte, il semble que la CAF opère une retenue sur son allocation.<br className="fr-mb-1w"/>
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
			  [Monsieur Durant] ne comprend pas que son allocation RSA ait diminué.<br className="fr-my-1w"/>
			  Après avoir saisi ses [identifiants n°XXX mot de passe XXX], il semble que la CAF opère une retenue sur son allocation.<br className="fr-mb-1w"/>
			  [Pas de question de fin]
			</>
		  ),
	}
]
	

export const    meetingInformations = `Informations contextuelles`;
export const    meetingGenerationPage = `Générer la page guide`;
export const    meetingAppointmentInformations = `Informations sur le rendez-vous`;

export const    meetingContacts = [
	{
		linkProps: { href: "#" },
		title: <>
			<p className="fr-badge fr-badge--sm fr-badge--purple-glycine fr-mb-1v">Contact général</p>
			<p>Nom de l'organisme</p>
		</>,
		desc: <>
			<p>E-mail</p>
			<p>Numéro de téléphone</p>
			<p>Horaires</p>
		</>
	},
	{
		linkProps: { href: "#" },
		title: <>
			<p className="fr-badge fr-badge--sm fr-badge--purple-glycine fr-mb-1v">Contact A+</p>
			<p>Nom de l'organisme</p>
		</>,
		desc: <>
			<p>E-mail</p>
			<p>Numéro de téléphone</p>
			<p>Horaires</p>
		</>
	}
]

export const	meetingQR = [
	{
		title: "Une première question",
		desc: "Une description de la question"
	},
	{
		title: "Une deuxième question",
		desc: "Une description de la question"
	},
	{
		title: "Une troisième question",
		desc: "Une description de la question"
	},
	{
		title: "Une quatrième question",
		desc: "Une description de la question"
	},
]

export const	defaultInputFields = [
	{
		title: "Saisie RSA par la CAF",
		question: "Une usagère ne comprend par le montant d’allocations sociales qu’elle touche ce mois-ci. En effet, le montant a été divisé par deux par rapport aux mois précédents et elle n’a plus que 150€. Elle cherche à comprendre pourquoi le montant a ainsi diminué.\n\nAprès avoir consulté le compte CAF de l’usagère avec son accord, il semble que la CAF opère une retenue sur le montant du RSA allouée à l’usagère suite à une déclaration erronée par le passé.\n\nLa CAF peut-elle faire une saisie sur le RSA et sous quelles conditions ? Comment débloquer la situation ?",
		themes: ["Allocation sociale", "RSA"],
		administrations: ["CAF"]
	}, 
	{
		title: "Renouvellement Carte de Mobilité Inclusion sans compte en ligne",
		question: "L’usager a perdu sa Carte de Mobilité Inclusion (CMI) stationnement. Il aimerait en refaire une.\n\nLa démarche se fait en ligne sur https://www.carte-mobilite-inclusion.fr.\n\nL’usager n'a jamais eu de compte sur le site et ne peut donc pas s'y connecter ou récupérer des informations.\n\nComment renouveler une CMI suite à une perte sans compte sur le site carte-mobilite-inclusion.fr ?",
		themes: ["Handicap", "Santé", "Allocation"],
		administrations: ["MDPH"]
	},
];