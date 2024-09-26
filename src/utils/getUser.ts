import { User } from 'oidc-client-ts'

export function getUser() {
  const oidcStorage = localStorage.getItem(
    `oidc.user:${import.meta.env.VITE_KEYCLOAK_AUTHORITY}:${import.meta.env.VITE_KEYCLOAK_CLIENT_ID}`,
  )
  if (!oidcStorage) {
    return null
  }

  return User.fromStorageString(oidcStorage)
}
