import { GlobalDiv } from "../components/Global/GlobalDiv";
import { GlobalRowContainer } from "../components/Global/GlobalRowContainer";

export function Error() {
	return (
		<GlobalRowContainer extraClass='fr-grid-row--center fr-mx-10w fr-my-5w'>
			<GlobalDiv>
				<h1>Page non trouvée</h1>
				<p class="fr-text--sm fr-mb-3w text-justify">Erreur 404</p>
				<p class="fr-text--lead fr-mb-3w text-justify">La page que vous cherchez est introuvable. Excusez-nous pour la gène occasionnée.</p>
				<p class="fr-text--sm fr-mb-5w text-justify">
					Si vous avez tapé l'adresse web dans le navigateur, vérifiez qu'elle est correcte. La page n’est peut-être plus disponible.
					<br/>Dans ce cas, pour continuer votre visite vous pouvez consulter notre page d’accueil.
					<br/>Sinon contactez-nous pour que l’on puisse vous rediriger vers la bonne information.
				</p>
				<ul class="fr-btns-group fr-btns-group--inline-md">
					<li>
						<a class="fr-btn" href="/albert/home">Page d'accueil</a>
					</li>
					<li>
						<a class="fr-btn fr-btn--secondary" href="/albert/contact">
							Contactez-nous
						</a>
					</li>
				</ul>
			</GlobalDiv>
		</GlobalRowContainer>
	)
}