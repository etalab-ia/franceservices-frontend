function getHeader(accessToken: string, refreshToken: string) {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    access_token: `Bearer ${accessToken}`,
    refresh_token: `Bearer ${refreshToken}`,
  }
}

export default getHeader
