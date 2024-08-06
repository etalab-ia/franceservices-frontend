import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { handleSignout } from '@utils/manageConnexion'
import { signoutUrl } from '@api'

function Header({ username, setUserAuth, userAuth }) {
  return (
    <header role="banner" className="fr-header">
      <div className="fr-header__body">
        <div className="fr-container">
          <div className="fr-header__body-row">
            <div className="fr-header__brand fr-enlarge-link">
              <Logo />
              <TitleAndDescription />
            </div>
            {userAuth.isLogin && (
              <EasyAccess username={username} setUserAuth={setUserAuth} />
            )}
          </div>
        </div>
      </div>
      {userAuth.isLogin && <NavigationMenu />}
    </header>
  )
}

function Logo() {
  return (
    <div className="fr-header__brand-top">
      <div className="fr-header__logo">
        <p className="fr-logo">DINUM / ETALAB</p>
      </div>
    </div>
  )
}

function TitleAndDescription() {
  return (
    <div className="fr-header__service">
      <a href="/" title="Accueil - [Albert - France services] - DINUM / ETALAB">
        <p className="fr-header__service-title">ALBERT / France services</p>
      </a>
      <p className="fr-header__service-tagline">
        Aide à l’accompagnement des usagers France services
      </p>
    </div>
  )
}

function EasyAccess({ username, setUserAuth }) {
  return (
    <div className="fr-header__tools">
      <div className="fr-header__tools-links">
        <ul className="fr-btns-group">
          <li>
            <div className="fr-btn fr-icon-user-line hover:cursor-text">{username}</div>
          </li>
          <li>
            <button
              type="button"
              onClick={() => handleSignout(setUserAuth, signoutUrl)}
              className="fr-btn fr-icon-lock-line"
            >
              Se déconnecter
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

function NavigationMenu() {
  const dispatch = useDispatch()
  const location = useLocation()

  return (
    <div className="fr-header__menu fr-modal" id="modal-491" aria-labelledby="button-492">
      <div className="fr-container">
        <button
          type="button"
          className="fr-btn--close fr-btn"
          aria-controls="modal-491"
          title="Fermer"
        >
          Fermer
        </button>
        <div className="fr-header__menu-links" />
        <nav className="fr-nav" id="navigation-494" aria-label="Menu principal">
          <ul className="fr-nav__list">
            {menuItems.map(({ to, label }) => (
              <li className="fr-nav__item" key={to}>
                <Link
                  className={`fr-nav__link ${isActiveLink(to, location.pathname)}`}
                  to={to}
                  onClick={() => dispatch({ type: 'RESET_USER' })}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

const menuItems = [
  { to: '/meeting', label: 'Poser une nouvelle question' },
  { to: '/history', label: 'Mes échanges' },
  { to: '/outils', label: 'Vos outils numériques' },
  { to: '/FAQ', label: 'Aide' },
  { to: '/contact', label: 'Contact' },
]

function isActiveLink(link, pathname) {
  const scheme = localStorage.getItem('scheme')
  const activeClass = `border-b-2 ${scheme === 'dark' ? 'border-[#8585f6]' : 'border-[#000091]'}`
  return pathname === link ? activeClass : ''
}

export default Header
