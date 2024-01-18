import { GlobalTitle } from "../components/Global/GlobalTitle"
import { fr } from "@codegouvfr/react-dsfr"
import { Accordion } from "@codegouvfr/react-dsfr/Accordion"

export function FAQ() {
	return (
		<div className="fr-container fr-p-4w h-full">
			<GlobalTitle>Aide</GlobalTitle>
			<p className="fr-pb-2w">Des réponses aux questions fréquemment posées sur Albert</p>
			<div className="flex w-full flex-grow">
				<div className="flex flex-col flex-grow">
					<h6 className="font-bold text-2xl fr-pb-2w">Categorie 1</h6>
					<div className={fr.cx("fr-accordions-group")}>
						<Accordion label="Name of the Accordion 1">Content of the Accordion 1</Accordion>
						<Accordion label="Name of the Accordion 2">Content of the Accordion 2</Accordion>
						<Accordion label="Name of the Accordion 3">Content of the Accordion 3</Accordion>
						<Accordion label="Name of the Accordion 4">Content of the Accordion 4</Accordion>
					</div>
				</div>
				<div className="flex flex-col flex-grow fr-pl-2w">
					<h6 className="font-bold text-2xl fr-pb-2w">Categorie 1</h6>
					<div className={fr.cx("fr-accordions-group")}>
						<Accordion label="Name of the Accordion 1">Content of the Accordion 1</Accordion>
						<Accordion label="Name of the Accordion 2">Content of the Accordion 2</Accordion>
						<Accordion label="Name of the Accordion 3">Content of the Accordion 3</Accordion>
						<Accordion label="Name of the Accordion 4">Content of the Accordion 4</Accordion>
					</div>
				</div>
			</div>
		</div>
	)
}
