import { Card } from "@codegouvfr/react-dsfr/Card";

export function MeetingQR() {

	return <>
			<h3 className="text-2xl font-bold fr-pt-3w fr-pb-3w">Questions fréquentes</h3>
			<div className="fr-mb-3v">
				<Card
					background
					border
					desc="Une description de la question"
					enlargeLink
					imageAlt="texte alternatif de l’image"
					linkProps={{
					href: '#'
					}}
					size="medium"
					title="Intitulé de la carte (sur lequel se trouve le lien)"
					titleAs="h6"
			    />
            </div>
            <div className="fr-mb-3v">
				<Card
					background
					border
					desc="Une description de la question"
					enlargeLink
					imageAlt="texte alternatif de l’image"
					linkProps={{
					href: '#'
					}}
					size="medium"
					title="Intitulé de la carte (sur lequel se trouve le lien)"
					titleAs="h6"
				/>
            </div>
        </>
}