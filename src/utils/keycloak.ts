import { UserManager, WebStorageStateStore } from 'oidc-client-ts'

export const userManager = new UserManager({
  authority: import.meta.env.VITE_KEYCLOAK_AUTHORITY,
  client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  redirect_uri: `${window.location.origin}/home`,
  post_logout_redirect_uri: window.location.origin,
  userStore: new WebStorageStateStore({ store: window.sessionStorage }),
  monitorSession: true, // this allows cross tab login/logout detection,
  client_secret: import.meta.env.VITE_KEYCLOAK_CLIENT_SECRET,
  automaticSilentRenew: true,
})

export const onSigninCallback = () => {
  window.history.replaceState({}, document.title, window.location.pathname)
}
