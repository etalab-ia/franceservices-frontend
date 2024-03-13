import { GlobalTitle } from '../Global/GlobalTitle'

type Error404Props = {
  title: string
  message: string
  errorNumber?: string
}

export function ShowError({ title, message, errorNumber }: Error404Props) {
  return (
    <div className="fr-my-7w fr-mt-md-12w fr-mb-md-10w fr-grid-row fr-grid-row--gutters fr-grid-row--middle fr-grid-row--center">
      <div className="fr-py-0 fr-col-12 fr-col-md-6">
        <GlobalTitle>{title}</GlobalTitle>
        <p className="fr-text--lead fr-mb-3w">Albert a eu un problème</p>
        <p className="fr-text--sm fr-mb-5w">{message}</p>
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
      <div className="fr-col-12 fr-col-md-3 fr-col-offset-md-1 fr-px-6w fr-px-md-0 fr-py-0"></div>
    </div>
  )
}

export default ShowError
