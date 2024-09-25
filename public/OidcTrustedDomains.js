// Add bellow trusted domains, access tokens will automatically injected to be send to
// trusted domain can also be a path like https://www.myapi.com/users,
// then all subroute like https://www.myapi.com/useers/1 will be authorized to send access_token to.

// Domains used by OIDC server must be also declared here

const trustedDomains = {
  default: [
    'https://auth.staging.etalab.gouv.fr',
    'https://kdhttps.auth0.com',
    'https://franceservices.staging.etalab.gouv.fr',
    'localhost:4173',
  ],
  config_classic: [
    'https://auth.staging.etalab.gouv.fr',
    'https://franceservices.staging.etalab.gouv.fr',
    'localhost:4173',
  ],
  config_without_silent_login: ['https://auth.staging.etalab.gouv.fr'],
  config_without_refresh_token: ['https://auth.staging.etalab.gouv.fr'],
  config_without_refresh_token_silent_login: ['https://auth.staging.etalab.gouv.fr'],
  config_google: [
    'https://oauth2.googleapis.com',
    'https://openidconnect.googleapis.com',
  ],
  config_with_hash: ['https://auth.staging.etalab.gouv.fr'],
}

// Service worker will continue to give access token to the JavaScript client
// Ideal to hide refresh token from client JavaScript, but to retrieve access_token for some
// scenarios which require it. For example, to send it via websocket connection.
trustedDomains.config_show_access_token = {
  domains: ['https://auth.staging.etalab.gouv.fr'],
  showAccessToken: true,
  // convertAllRequestsToCorsExceptNavigate: false,
  // setAccessTokenToNavigateRequests: true,
}

// This example defines domains used by OIDC server separately from domains to which access tokens will be injected.
trustedDomains.config_separate_oidc_access_token_domains = {
  oidcDomains: ['https://auth.staging.etalab.gouv.fr'],
  accessTokenDomains: [`https://auth.staging.etalab.gouv.fr`],
}
