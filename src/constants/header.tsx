import { useAuth } from 'react-oidc-context'

export function quickAccessItemsFunc() {
  const auth = useAuth()
  const quickAccessItemsProps = [
    {
      iconId: 'fr-icon-user-line',
      linkProps: {
        style: { pointerEvents: 'none' },
      },
      text: auth.user?.profile?.preferred_username,
    },
    {
      iconId: 'fr-icon-logout-box-r-line',
      linkProps: {
        onClick: () => {
          auth.removeUser()
          auth.signoutRedirect()
        },
      },
      text: 'Se déconnecter',
    },
  ]

  return auth.isAuthenticated ? quickAccessItemsProps : []
}
