import { GlobalTitle } from '../components/Global/GlobalTitle'

const Error404 = () => {
  return (
    <main id="content">
      <div className="fr-container">
        <div className="fr-my-7w fr-mt-md-12w fr-mb-md-10w fr-grid-row fr-grid-row--gutters fr-grid-row--middle fr-grid-row--center">
          <div className="fr-py-0 fr-col-12 fr-col-md-6">
            <GlobalTitle>Page non trouvée</GlobalTitle>
            <p className="fr-text--sm fr-mb-3w">Erreur 404</p>
            <p className="fr-text--lead fr-mb-3w">
              La page que vous cherchez est introuvable. Excusez-nous pour la gène
              occasionnée.
            </p>
            <p className="fr-text--sm fr-mb-5w">
              Si vous avez tapé l'adresse web dans le navigateur, vérifiez qu'elle est
              correcte. La page n’est peut-être plus disponible.
              <br />
              Dans ce cas, pour continuer votre visite vous pouvez consulter notre page
              d’accueil, ou effectuer une recherche avec notre moteur de recherche en haut
              de page.
              <br />
              Sinon contactez-nous pour que l’on puisse vous rediriger vers la bonne
              information.
            </p>
            <ul className="fr-btns-group fr-btns-group--inline-md">
              <li>
                <a className="fr-btn" href="/">
                  Page d'accueil
                </a>
              </li>
              {/* 							<li>
								<a
									className="fr-btn fr-btn--secondary"
									href="[À MODIFIER - lien vers un formulaire de contact]"
								>
									Contactez-nous
								</a>
							</li> */}
            </ul>
          </div>
          <div className="fr-col-12 fr-col-md-3 fr-col-offset-md-1 fr-px-6w fr-px-md-0 fr-py-0" />
        </div>
      </div>
    </main>
  )
}

export default Error404
