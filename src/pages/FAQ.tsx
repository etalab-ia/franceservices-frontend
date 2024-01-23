import { GlobalTitle } from "../components/Global/GlobalTitle"
import { fr } from "@codegouvfr/react-dsfr"
import { Accordion } from "@codegouvfr/react-dsfr/Accordion"

export function FAQ() {
	return (
		<div className="fr-container fr-p-4w h-full">
			<GlobalTitle>Aide</GlobalTitle>
			<p className="fr-pb-2w">Des réponses aux questions fréquemment posées sur Albert</p>
			<div className="flex accordion-container w-full">
				<div className="flex flex-col flex-grow">
					<h6 className="font-bold text-2xl fr-pb-2w">{albertInfo.categoryName}</h6>
					{albertInfo.questions.map((question) => (
						<Accordion label={question.label}>{question.content}</Accordion>
					))}
				</div>
				<div className="flex flex-col flex-grow accordion">
					<h6 className="font-bold text-2xl fr-pb-2w">Categorie 1</h6>
					<Accordion label="Name of the Accordion 1">Content of the Accordion 1</Accordion>
					<Accordion label="Name of the Accordion 2">Content of the Accordion 2</Accordion>
					<Accordion label="Name of the Accordion 3">Content of the Accordion 3</Accordion>
					<Accordion label="Name of the Accordion 4">Content of the Accordion 4</Accordion>
				</div>
			</div>
		</div>
	)
}

const albertInfo = {
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
}
