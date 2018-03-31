import jwtDecode from 'jwt-decode'

import { AuthenticationError } from './errors'

export function authenticate({ state }) {
  if (!state.get('auth.authenticated')) {
    throw new AuthenticationError('You must log in to view this page')
  }
}

export function validateJwt({ state, storage, path }) {
  const jwtHeader = storage.get('jwtHeader')
  if (jwtHeader) {
    const claims = jwtDecode(jwtHeader)
    if (!claims.exp || claims.exp * 1000 > Date.now()) {
      state.set('auth.authenticated', true)
      state.set('auth.currentUser.username', claims.username)
      return path.authenticated()
    }
    storage.remove('jwtHeader')
    return path.unauthenticated()
  }
  return path.unauthenticated()
}
