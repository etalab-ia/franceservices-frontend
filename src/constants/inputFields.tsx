import servicepublic from '/logo/LogoServicePublicMinimised.png'

export const signupFields = [
  {
    label: "Nom d'utilisateur",
    nativeInputProps: {
      placeholder: 'Camille',
      name: 'username',
    },
  },
  {
    label: 'Courriel',
    nativeInputProps: {
      placeholder: 'camille@mail.com',
      name: 'email',
    },
  },
  {
    label: 'Maison France Services',
    nativeInputProps: {
      type: 'mfs',
    },
  },
  {
    label: 'Mot de passe',

    nativeInputProps: {
      name: 'passwordSignup',
      type: 'password',
    },
  },
  {
    label: 'Confirmer le mot de passe',
    nativeInputProps: {
      name: 'confirmationPassword',
      type: 'password',
    },
  },
]

export const loginFields = [
  {
    label: "Nom d'utilisateur",
    nativeInputProps: {
      placeholder: 'Camille ou camille@mail.com',
      name: 'username',
    },
  },
  {
    label: 'Mot de passe',
    nativeInputProps: {
      name: 'password',
      type: 'password',
    },
  },
]

export const generalistRessourcesTiles = [
  {
    className: 'fr-tile fr-tile--no-icon fr-enlarge-link',
    desc: 'Accéder',
    linkProps: { href: 'https://www.service-public.fr/' },
    imageUrl: '/logo/LogoServicePublicMinimised.png',
    title: (
      <>
        <p className="fr-badge fr-badge--sm fr-badge--purple-glycine fr-mb-1v">
          Documentation
        </p>
        <p>Service-Public.fr</p>
      </>
    ),
  },
]
export const MFSressourcesTiles = [
  {
    className: 'fr-tile fr-tile--no-icon fr-enlarge-link',
    desc: 'Accéder',
    linkProps: { href: 'https://aplus.beta.gouv.fr/' },
    imageUrl: '/logo/LogoA+.png',
    title: (
      <>
        <p className="fr-badge fr-badge--sm fr-badge--purple-glycine fr-mb-1v">Réseau</p>
        <p>Administration+</p>
      </>
    ),
  },
  {
    className: 'fr-tile fr-tile--no-icon fr-enlarge-link',
    desc: 'Accéder',
    linkProps: { href: 'https://osmose.numerique.gouv.fr/' },
    imageUrl: '/logo/LogoOsmose.png',
    title: (
      <>
        <p className="fr-badge fr-badge--sm fr-badge--purple-glycine fr-mb-1v">Réseau</p>
        <p>Osmose</p>
      </>
    ),
  },
  {
    className: 'fr-tile fr-tile--no-icon fr-enlarge-link',
    desc: 'Accéder',
    linkProps: { href: 'https://extranet.france-services.gouv.fr/' },
    imageUrl: '/logo/LogoFranceServices.png',
    title: (
      <>
        <p className="fr-badge fr-badge--sm fr-badge--purple-glycine fr-mb-1v">
          Documentation
        </p>
        <p>Plateforme France Services</p>
      </>
    ),
  },
  {
    className: 'fr-tile fr-tile--no-icon fr-enlarge-link',
    desc: 'Accéder',
    linkProps: { href: 'https://www.service-public.fr/' },
    imageUrl: servicepublic,
    title: (
      <>
        <p className="fr-badge fr-badge--sm fr-badge--purple-glycine fr-mb-1v">
          Documentation
        </p>
        <p>Service-Public.fr</p>
      </>
    ),
  },
]
