import { contactEmailAdress } from '@constants/global'
import { GlobalTitle } from '../Global/GlobalTitle'

type ShowError = {
  message: string
  errorNumber?: string
}

function ShowError({ message, errorNumber }: ShowError) {
  return (
    <div className="fr-my-7w fr-mt-md-12w fr-mb-md-10w fr-grid-row fr-grid-row--gutters fr-grid-row--middle fr-grid-row--center">
      <div className="fr-py-0 fr-col-12 fr-col-md-6">
        <GlobalTitle>Albert a eu un problème</GlobalTitle>
        {errorNumber && <GlobalTitle>Erreur {errorNumber}</GlobalTitle>}
        <p className="fr-text--sm fr-mb-5w">{message}</p>
        <p className="fr-mb-1w">Contactez-nous </p>
        <a className="fr-mb-3w" href={`mailto:${contactEmailAdress}`}>
          {contactEmailAdress}
        </a>

        <ul className="fr-btns-group fr-btns-group--inline-md fr-mt-5w">
          <li>
            <a className="fr-btn" href="/">
              Page d'accueil
            </a>
          </li>
        </ul>
      </div>
      <div className="fr-col-12 fr-col-md-3 fr-col-offset-md-1 fr-px-6w fr-px-md-0 fr-py-0" />
    </div>
  )
}

export default ShowError
