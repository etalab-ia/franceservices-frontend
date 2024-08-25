import { Link, useLocation } from 'react-router-dom'

export default function Footer() {
  const location = useLocation()
  return (
    <footer className="fr-footer" role="contentinfo" id="footer-7361">
      <div className="fr-container">
        <div className="fr-footer__body">
          <div className="fr-footer__brand fr-enlarge-link">
            <Link to="/" title="Retour à l'accueil du site - Albert">
              <p className="fr-logo">DINUM / ETALAB</p>
            </Link>
          </div>
          <div className="fr-footer__content">
            <ul className="fr-footer__content-list">
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  target="_blank"
                  rel="noreferrer"
                  title="info.gouv.fr - nouvelle fenêtre"
                  href="https://info.gouv.fr"
                >
                  info.gouv.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  target="_blank"
                  rel="noreferrer"
                  title="service-public.fr - nouvelle fenêtre"
                  href="https://service-public.fr"
                >
                  service-public.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  target="_blank"
                  rel="noreferrer"
                  title="legifrance.gouv.fr - nouvelle fenêtre"
                  href="https://legifrance.gouv.fr"
                >
                  legifrance.gouv.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  target="_blank"
                  rel="noreferrer"
                  title="data.gouv.fr - nouvelle fenêtre"
                  href="https://data.gouv.fr"
                >
                  data.gouv.fr
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="fr-footer__bottom">
          <ul className="fr-footer__bottom-list">
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link" href="#">
                Accessibilité : partiellement conforme
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <button
                type="button"
                className="fr-footer__bottom-link fr-icon-theme-fill fr-btn--icon-left"
                aria-controls="fr-theme-modal"
                data-fr-opened="false"
              >
                Paramètres d'affichage
              </button>
            </li>
          </ul>
          <div className="fr-footer__bottom-copy">
            <p>
              Sauf mention explicite de propriété intellectuelle détenue par des tiers,
              les contenus de ce site sont proposés sous{' '}
              <a
                href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
                target="_blank"
                rel="noreferrer"
                title="Licence etalab - nouvelle fenêtre"
              >
                licence etalab-2.0
              </a>
            </p>
          </div>
        </div>
      </div>
      <ThemeModal />
    </footer>
  )
}

function ThemeModal() {
  return (
    <dialog
      id="fr-theme-modal"
      className="fr-modal"
      aria-labelledby="fr-theme-modal-title"
    >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-6 fr-col-lg-4">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button
                  className="fr-btn--close fr-btn"
                  aria-controls="fr-theme-modal"
                  id="button-5622"
                  title="Fermer"
                >
                  Fermer
                </button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-theme-modal-title" className="fr-modal__title">
                  Paramètres d’affichage
                </h1>
                <div id="fr-display" className="fr-display">
                  <fieldset className="fr-fieldset" id="display-fieldset">
                    <legend
                      className="fr-fieldset__legend--regular fr-fieldset__legend"
                      id="display-fieldset-legend"
                    >
                      Choisissez un thème pour personnaliser l’apparence du site.
                    </legend>
                    <div className="fr-fieldset__element">
                      <div className="fr-radio-group fr-radio-rich">
                        <input
                          value="light"
                          type="radio"
                          id="fr-radios-theme-light"
                          name="fr-radios-theme"
                        />
                        <label className="fr-label" htmlFor="fr-radios-theme-light">
                          Thème clair
                        </label>
                        <div className="fr-radio-rich__img">
                          <svg
                            aria-hidden="true"
                            className="fr-artwork"
                            viewBox="0 0 80 80"
                            width="80px"
                            height="80px"
                          >
                            <use
                              className="fr-artwork-decorative"
                              href="../../../artwork/pictograms/environment/sun.svg#artwork-decorative"
                            />
                            <use
                              className="fr-artwork-minor"
                              href="../../../artwork/pictograms/environment/sun.svg#artwork-minor"
                            />
                            <use
                              className="fr-artwork-major"
                              href="../../../artwork/pictograms/environment/sun.svg#artwork-major"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="fr-fieldset__element">
                      <div className="fr-radio-group fr-radio-rich">
                        <input
                          value="dark"
                          type="radio"
                          id="fr-radios-theme-dark"
                          name="fr-radios-theme"
                        />
                        <label className="fr-label" htmlFor="fr-radios-theme-dark">
                          Thème sombre
                        </label>
                        <div className="fr-radio-rich__img">
                          <svg
                            aria-hidden="true"
                            className="fr-artwork"
                            viewBox="0 0 80 80"
                            width="80px"
                            height="80px"
                          >
                            <use
                              className="fr-artwork-decorative"
                              href="../../../artwork/pictograms/environment/moon.svg#artwork-decorative"
                            />
                            <use
                              className="fr-artwork-minor"
                              href="../../../artwork/pictograms/environment/moon.svg#artwork-minor"
                            />
                            <use
                              className="fr-artwork-major"
                              href="../../../artwork/pictograms/environment/moon.svg#artwork-major"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="fr-fieldset__element">
                      <div className="fr-radio-group fr-radio-rich">
                        <input
                          value="system"
                          type="radio"
                          id="fr-radios-theme-system"
                          name="fr-radios-theme"
                        />
                        <label className="fr-label" htmlFor="fr-radios-theme-system">
                          Système
                          <span className="fr-hint-text">
                            Utilise les paramètres système
                          </span>
                        </label>
                        <div className="fr-radio-rich__img">
                          <svg
                            aria-hidden="true"
                            className="fr-artwork"
                            viewBox="0 0 80 80"
                            width="80px"
                            height="80px"
                          >
                            <use
                              className="fr-artwork-decorative"
                              href="../../../artwork/pictograms/system/system.svg#artwork-decorative"
                            />
                            <use
                              className="fr-artwork-minor"
                              href="../../../artwork/pictograms/system/system.svg#artwork-minor"
                            />
                            <use
                              className="fr-artwork-major"
                              href="../../../artwork/pictograms/system/system.svg#artwork-major"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  )
}
