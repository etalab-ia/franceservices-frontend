import { UserManager, WebStorageStateStore } from 'oidc-client-ts'

export const userManager = new UserManager({
  authority: 'http://auth.staging.etalab.gouv.fr/auth/realms/master',
  client_id: 'fastapi-albert-client',
  redirect_uri: `${window.location.origin}/home`,
  post_logout_redirect_uri: window.location.origin,
  userStore: new WebStorageStateStore({ store: window.sessionStorage }),
  monitorSession: true, // this allows cross tab login/logout detection,
  client_secret: '4VlaxhrEXcIxyqTQCTSdD6lhhIHkOm8s',
})

export const onSigninCallback = () => {
  window.history.replaceState({}, document.title, window.location.pathname)
}
