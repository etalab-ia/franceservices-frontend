import { GlobalTitle } from "../components/Global/GlobalTitle"
import { fr } from "@codegouvfr/react-dsfr"
import { Accordion } from "@codegouvfr/react-dsfr/Accordion"

export function FAQ() {
	return (
		<div className="fr-container fr-p-4w h-full">
			<GlobalTitle>Aide</GlobalTitle>
			<p className="fr-pb-2w">Des réponses aux questions fréquemment posées sur Albert</p>
			<div className="flex accordion-container accordion">
				<div className="flex flex-col accordion">
					<div className="h6-container">
						<h6 className="font-bold text-2xl fr-pb-2w">{faq.albertInfo.categoryName}</h6>
					</div>
					{faq.albertInfo.questions.map((question) => (
						<Accordion label={question.label}>{question.content}</Accordion>
					))}
				</div>
				<div className="flex flex-col accordion">
					<div className="h6-container">
						<h6 className="font-bold text-2xl fr-pb-2w">{faq.albertUsage.categoryName}</h6>
					</div>
					{faq.albertUsage.questions.map((question) => (
						<Accordion label={question.label}>{question.content}</Accordion>
					))}
				</div>
			</div>
		</div>
	)
}

const faq = {
	albertInfo: {
		categoryName: "Informations concernant le modèle Albert France services",
		questions: [
			{
				label: "Qu’est-ce qu’Albert ?",
				content:
					"Albert est un outil d’aide à la recherche d’information développé par la Direction Interministérielle du Numérique (DINUM). Il repose sur Llama2-chat, un grand modèle de langue ouvert et développé par Meta.",
			},
			{
				label: "A quel usage est destiné Albert ?",
				content:
					"Albert a été conçu pour aider les conseillers et conseillères France services à trouver des informations administratives pertinentes pour une situation ou question donnée. Pour le moment, seul.es les conseillères et conseillers participant à l’expérimentation y ont accès. Les autres structures ne peuvent pas utiliser l’outil en phase de test.",
			},
			{
				label: "Sur quelles ressources documentaires a été entraîné Albert ?",
				content:
					"Trois bases de connaissances ont été mobilisées pour entraîner (fine-tuning) Albert : service-public.fr ; code.travail.gouv.fr ; les supports de formation France services. Llama2-chat, le grand modèle de langue initial sur lequel repose Albert, a été pré-entraîné sur des sources d’information publiquement accessibles.",
			},
			{
				label: "Des mises à jour régulières sont-elles prévues dans la base de données ?",
				content:
					"Les bases de données sont très régulièrement mises à jour. Par exemple, les nouvelles fiches publiées sur le site service-public.fr sont intégrées en moins d'une semaine au modèle.",
			},
			{
				label: "Comment fonctionne Albert ?",
				content:
					"Albert analyse la situation ou question qu’on lui soumet puis identifie les informations probablement pertinentes qu’il « connaît » de par son entraînement. Il génère ensuite une synthèse écrite de ces sources d’information.",
			},
			{
				label: "Comment est évalué Albert ?",
				content:
					"Les performances d’Albert sont régulièrement évaluées : à chaque nouvelle version de l’outil, Albert doit passer un QCM, établi sur le périmètre des France services. Ce QCM permet de donner une note au modèle, qui permet de suivre l’évolution des performances des différentes versions d’Albert. De plus, des campagnes d’évaluation seront fréquemment menées avec les agents publics utilisant l’outil avant de comprendre précisément les forces et faiblesses d’Albert, et l’améliorer le modèle en conséquence.",
			},
		],
	},
	albertUsage: {
		categoryName: "Informations concernant l'utilisation d’Albert France services",
		questions: [
			{
				label: "Comment me créer un compte pour accéder à Albert ?",
				content:
					"Le tutoriel “Comment se créer un compte” partagé sur Osmose vous guide dans la création de votre compte.",
			},
			{
				label: "Comment utiliser Albert ?",
				content:
					"A partir de la page d’accueil, cliquer sur “Préparer une rendez-vous”. Décrire la situation de l’usager et suivre les bonnes pratiques indiquées. Inclure les thèmes et opérateurs concernés, puis cliquer sur “générer la page rendez-vous”. Le tutoriel “Comment utiliser la fonction 'Préparer un RDV'” sur Osmose guide pas à pas.",
			},
			{
				label: "Quelles sont les règles d’or d’utilisation d’Albert ?",
				content:
					"Les règles d’or sont disponibles dans la formation “Utiliser Albert dans son quotidien” sur le groupe Osmose. À éviter: utilisation de données personnelles, usage de mots clés seuls. À faire: préciser la demande, formuler une question claire, garder un esprit critique.",
			},
			{
				label: "Quelles informations sont remontées par Albert ?",
				content:
					"Albert fournit un résultat synthétisé de sources diverses, les sources utilisées, les fiches service-public.fr pertinentes, des liens pratiques et des questions fréquentes liées à la situation décrite.",
			},
			{
				label: "Quel niveau de confiance accorder à Albert ?",
				content:
					"Albert fonctionne sur un modèle probabiliste pouvant inclure des erreurs ou hallucinations. Il est important de garder un œil critique et vérifier les informations via les sources utilisées et les fiches service-public.fr.",
			},
			{
				label: "Comment vérifier les informations données par Albert ?",
				content:
					"Vérifier les informations en consultant les sources utilisées pour la réponse et les liens vers les fiches service-public.fr.",
			},
			{
				label: "Comment faire des retours ou poser des questions sur Albert ?",
				content:
					"Faire des retours via les boutons de qualité sous les fiches rendez-vous ou via le formulaire de contact. Ces retours sont cruciaux pour améliorer Albert.",
			},
			{
				label: "Comment personnaliser les informations sur une fiche rendez-vous ?",
				content:
					"Modifier la section 'Aller plus loin' en ajoutant ou supprimant des éléments. La personnalisation met à jour le résultat généré par Albert.",
			},
			{
				label: "Comment accéder à des fiches rendez-vous déjà générées ?",
				content:
					"Accéder via 'Consulter mon historique' sur la page d’accueil, puis cliquer sur une ligne pour être redirigé vers la fiche correspondante.",
			},
			{
				label: "Peut-on regénérer un résultat ?",
				content:
					"Si insatisfait, cliquer sur 'pouce vers le bas' sous le résultat pour demander un nouveau résultat. Modifier la section 'Aller plus loin' peut aussi entraîner la régénération d'un résultat.",
			},
			{
				label: "Que faire si un bug/incident est identifié sur Albert ?",
				content:
					"Signaler les bugs via le formulaire de contact. Les bugs critiques sont corrigés sous 24 heures.",
			},
		],
	},
}
